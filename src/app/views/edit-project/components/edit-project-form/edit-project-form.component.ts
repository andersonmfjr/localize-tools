import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { LOCALES } from '../../../../shared/helpers/locales';
import { Locale } from '../../../../shared/models/locale.model';
import { Project } from '../../../../shared/models/project.model';
import * as path from 'path';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ProjectService } from '../../../../shared/services/project/project.service';

type LocaleControl = Array<{ id: number; controlInstance: string }>;

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styleUrls: ['./edit-project-form.component.scss'],
})
export class EditProjectFormComponent implements OnInit {
  isEditingProject = false;
  project: Project;

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
    this.project = this.projectService.selectedProject;

    this.form.patchValue(this.project);

    const messages = this.project.messages;
    this.messagesPath =
      messages.directory + this.separator + messages.prefix + '.json';
    this.form.patchValue({ defaultLocale: this.project.defaultLocale.id });

    this.project.locales.forEach((locale) => {
      this.addField(null, locale.id, locale.suffix);
    });
  }

  onSubmit() {
    this.isEditingProject = true;
    const formValue = this.form.value;
    const locales = [];

    Object.keys(formValue).forEach((key) => {
      if (key.includes('localeSuffix')) {
        const suffix = this.form.get(key).value;
        const localeIndex = key.split('-').pop();
        const localeId = this.form.get(`locale-${localeIndex}`)?.value;
        const localeName = this.locales.find(
          (l) => l.value === localeId
        )?.label;

        if (localeId) {
          const formattedLocale = {
            name: localeName,
            id: localeId,
            abbreviation: localeId,
            suffix,
          };

          locales.push(formattedLocale);
        }
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

    const project: Omit<Project, 'id'> = {
      name: formValue.name,
      description: formValue.description || '',
      defaultLocale,
      messages: formValue.messages,
      locales,
      useXlff: formValue.useXlff,
    };

    this.projectService.update(this.project.id, project);

    setTimeout(() => {
      this.messageService.success('Project edited successfully!');
      this.isEditingProject = false;
      this.router.navigateByUrl('/project');
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

  addField(e: MouseEvent, localeId: string, localeSuffix: string): void {
    if (e) {
      e.preventDefault();
    }

    this.addProjectLocaleField(localeId);
    this.addProjectLocaleSuffixField(localeSuffix);
  }

  addProjectLocaleField(localeId: string) {
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

    let formValue = '';

    if (id === 0) {
      formValue = 'en-US';
    }

    if (localeId) {
      formValue = localeId;
    }

    this.form.addControl(
      this.projectLocalesControls[index - 1].controlInstance,
      new UntypedFormControl(formValue, Validators.required)
    );
  }

  addProjectLocaleSuffixField(localeSuffix: string) {
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

    let formValue = '';

    if (id === 0) {
      formValue = 'en';
    }

    if (localeSuffix) {
      formValue = localeSuffix;
    }

    this.form.addControl(
      this.projectLocalesSuffixControls[index - 1].controlInstance,
      new UntypedFormControl(formValue, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    this.removeProjectLocaleField(i);
    this.removeProjectLocaleSuffixField(i);
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
