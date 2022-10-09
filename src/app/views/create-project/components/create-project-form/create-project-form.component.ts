import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import * as path from 'path';

type LocaleControl = Array<{ id: number; controlInstance: string }>;

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.scss'],
})
export class CreateProjectFormComponent implements OnInit {
  locales = [
    {
      label: 'English (United States)',
      value: 'en-US',
    },
    {
      label: 'Portuguese (Brazil)',
      value: 'pt-BR',
    },
    {
      label: 'Spanish (Spain)',
      value: 'es-ES',
    },
  ];

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

  constructor(private fb: UntypedFormBuilder) {}

  get messagesDirectoryControl() {
    return this.form.get('messages.directory');
  }

  get messagesPrefixControl() {
    return this.form.get('messages.prefix');
  }

  ngOnInit(): void {
    this.addField();
  }

  onSubmit() {}

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
      controlInstance: `locale${id}`,
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
      controlInstance: `localeSuffix${id}`,
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
