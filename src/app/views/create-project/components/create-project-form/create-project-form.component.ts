import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '../../../../shared/models/project.model';
import { Locale } from '../../../../shared/models/locale.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { ProjectService } from '../../../../shared/services/project/project.service';
import { LOCALES } from '../../../../shared/helpers/locales';

type LocaleControl = Array<{ id: number; controlInstance: string }>;

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.scss'],
})
export class CreateProjectFormComponent implements OnInit {
  isCreatingProject = false;

  locales = LOCALES;

  messagesPath = '';
  separator = path.sep;

  projectLocalesControls: LocaleControl = [];
  projectLocalesSuffixControls: LocaleControl = [];

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    defaultLocale: ['en-US', Validators.required],
    messages: this.fb.group({
      directory: ['', Validators.required],
      prefix: ['', Validators.required],
    }),
    useXlff: [false, Validators.required],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private messageService: NzMessageService,
    private router: Router,
    private projectService: ProjectService
  ) {}

  get messagesDirectoryControl() {
    return this.form.get('messages.directory');
  }

  get messagesPrefixControl() {
    return this.form.get('messages.prefix');
  }

  ngOnInit(): void {
    this.addField();
  }

  onSubmit() {
    this.isCreatingProject = true;
    const id = uuidv4();
    const formValue = this.form.value;
    const locales = [];

    Object.keys(formValue).forEach((key) => {
      if (key.includes('localeSuffix')) {
        const suffix = this.form.get(key).value;
        const localeIndex = key.split('-').pop();
        const localeId = this.form.get(`locale-${localeIndex}`).value;
        const localeName = this.locales.find(
          (l) => l.value === localeId
        )?.label;

        const formattedLocale = {
          name: localeName,
          id: localeId,
          abbreviation: localeId,
          suffix,
        };

        locales.push(formattedLocale);
      }
    });

    if (locales.length === 0) {
      this.messageService.error('You must add at least one locale');
      return;
    }

    const locale = this.locales.find(
      (l) => l.value === formValue.defaultLocale
    );
    const defaultLocale: Locale = {
      name: locale.label,
      id: formValue.defaultLocale,
      abbreviation: formValue.defaultLocale,
    };

    const project: Project = {
      id,
      name: formValue.name,
      description: formValue.description || '',
      defaultLocale,
      messages: formValue.messages,
      locales,
      useXlff: formValue.useXlff,
    };

    this.projectService.add(project);

    setTimeout(() => {
      this.messageService.success('Project created successfully!');
      this.isCreatingProject = false;
      this.router.navigateByUrl('/home');
    }, 1000);
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean => {
    const messagesPrefix = path.parse(file.path).name;
    const messagesDirectory = path.dirname(file.path);

    this.form.patchValue({
      messages: {
        directory: messagesDirectory,
        prefix: messagesPrefix,
      },
    });

    this.messagesPath = file.path;

    return false;
  };

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }

    this.addProjectLocaleField();
    this.addProjectLocaleSuffixField();
  }

  addProjectLocaleField() {
    const id =
      this.projectLocalesControls.length > 0
        ? this.projectLocalesControls[this.projectLocalesControls.length - 1]
            .id + 1
        : 0;

    const control = {
      id,
      controlInstance: `locale-${id}`,
    };
    const index = this.projectLocalesControls.push(control);

    this.form.addControl(
      this.projectLocalesControls[index - 1].controlInstance,
      new UntypedFormControl(id === 0 ? 'en-US' : '', Validators.required)
    );
  }

  addProjectLocaleSuffixField() {
    const id =
      this.projectLocalesSuffixControls.length > 0
        ? this.projectLocalesSuffixControls[
            this.projectLocalesSuffixControls.length - 1
          ].id + 1
        : 0;

    const control = {
      id,
      controlInstance: `localeSuffix-${id}`,
    };
    const index = this.projectLocalesSuffixControls.push(control);

    this.form.addControl(
      this.projectLocalesSuffixControls[index - 1].controlInstance,
      new UntypedFormControl(id === 0 ? 'en' : '', Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    this.removeProjectLocaleField(i);
  }

  removeProjectLocaleField(i: { id: number; controlInstance: string }) {
    if (this.projectLocalesControls.length > 1) {
      const index = this.projectLocalesControls.indexOf(i);
      this.projectLocalesControls.splice(index, 1);
      this.form.removeControl(i.controlInstance);
    }
  }

  removeProjectLocaleSuffixField(i: { id: number; controlInstance: string }) {
    if (this.projectLocalesSuffixControls.length > 1) {
      const index = this.projectLocalesSuffixControls.indexOf(i);
      this.projectLocalesSuffixControls.splice(index, 1);
      this.form.removeControl(i.controlInstance);
    }
  }

  renderProjectLocalePath(
    localeControl: string,
    suffixControl: string
  ): boolean {
    const localeControlValue = this.form.get(localeControl)?.value;
    const suffixControlValue = this.form.get(suffixControl)?.value;

    return (
      localeControlValue &&
      suffixControlValue &&
      this.messagesDirectoryControl.value &&
      this.messagesPrefixControl.value
    );
  }

  formatLocalePath(suffixControl: string) {
    const suffixControlValue = this.form.get(suffixControl)?.value;
    const messagesDirectory = this.messagesDirectoryControl.value;
    const messagesPrefix = this.messagesPrefixControl.value;
    const localeFile = `${messagesPrefix}.${suffixControlValue}.json`;
    return `Your file should be ${messagesDirectory}${this.separator}${localeFile}`;
  }
}
