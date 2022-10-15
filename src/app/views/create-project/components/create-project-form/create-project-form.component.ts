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

  projectLocalesControls: LocaleControl = [];
  projectLocalesPathsControls: LocaleControl = [];

  activeUpload = 'defaultLocale';

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    defaultLocale: this.fb.group({
      id: ['en-US', Validators.required],
      path: ['', Validators.required],
    }),
    useXlff: [false, Validators.required],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private messageService: NzMessageService,
    private router: Router,
    private projectService: ProjectService
  ) {}

  get defaultLocalePath() {
    return this.form.get('defaultLocale.path');
  }

  ngOnInit(): void {
    this.addField();
  }

  setActiveUpload(item: string) {
    this.activeUpload = item;
  }

  getControlValue(controlName: string) {
    return this.form.get(controlName)?.value;
  }

  onSubmit() {
    this.isCreatingProject = true;
    const id = uuidv4();
    const formValue = this.form.value;
    const locales = [];

    Object.keys(formValue).forEach((key) => {
      if (key.includes('localePath')) {
        const localePath = this.form.get(key).value;
        const localeIndex = key.split('-').pop();
        const localeId = this.form.get(`locale-${localeIndex}`)?.value;
        const localeName = this.locales.find(
          (l) => l.value === localeId
        )?.label;

        if (localeId) {
          const formattedLocale = {
            name: localeName,
            id: localeId,
            path: localePath,
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
      (l) => l.value === formValue.defaultLocale.id
    );
    const defaultLocale: Locale = {
      name: locale.label,
      id: formValue.defaultLocale.id,
      path: formValue.defaultLocale.path,
    };

    const project: Project = {
      id,
      name: formValue.name,
      description: formValue.description || '',
      defaultLocale,
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
    if (this.activeUpload === 'defaultLocale') {
      this.form.patchValue({
        [this.activeUpload]: {
          path: file.path,
        },
      });
      return false;
    }

    this.form.patchValue({
      [this.activeUpload]: file.path,
    });
    return false;
  };

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }

    this.addProjectLocaleField();
    this.addProjectLocalePathField();
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

  addProjectLocalePathField() {
    const id =
      this.projectLocalesPathsControls.length > 0
        ? this.projectLocalesPathsControls[
            this.projectLocalesPathsControls.length - 1
          ].id + 1
        : 0;

    const control = {
      id,
      controlInstance: `localePath-${id}`,
    };
    const index = this.projectLocalesPathsControls.push(control);

    this.form.addControl(
      this.projectLocalesPathsControls[index - 1].controlInstance,
      new UntypedFormControl('', Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    this.removeProjectLocaleField(i);
    this.removeProjectLocalePathField(i);
  }

  removeProjectLocaleField(i: { id: number; controlInstance: string }) {
    if (this.projectLocalesControls.length > 1) {
      const index = this.projectLocalesControls.indexOf(i);
      this.projectLocalesControls.splice(index, 1);
      this.form.removeControl(i.controlInstance);
    }
  }

  removeProjectLocalePathField(i: { id: number; controlInstance: string }) {
    if (this.projectLocalesPathsControls.length > 1) {
      const index = this.projectLocalesPathsControls.indexOf(i);
      this.projectLocalesPathsControls.splice(index, 1);
      this.form.removeControl(i.controlInstance);
    }
  }

  renderProjectLocalePath(localeControl: string, pathControl: string): boolean {
    const localeControlValue = this.form.get(localeControl)?.value;
    const pathControlValue = this.form.get(pathControl)?.value;

    return localeControlValue && pathControlValue;
  }
}
