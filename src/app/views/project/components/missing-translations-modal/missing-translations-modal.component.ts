import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTabChangeEvent, NzTabPosition } from 'ng-zorro-antd/tabs';
import { addTranslations } from '../../../../shared/helpers/addTranslations';
import { IdentifyMissingData } from '../../../../shared/helpers/identifyMissingTranslations';
import { Project } from '../../../../shared/models/project.model';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-missing-translations-modal',
  templateUrl: './missing-translations-modal.component.html',
  styleUrls: ['./missing-translations-modal.component.scss'],
})
export class MissingTranslationsModalComponent {
  @Input() missingTranslations: IdentifyMissingData[];
  @Input() project: Project;

  @Output() closed = new EventEmitter<void>();

  nzTabPosition: NzTabPosition = 'top';
  selectedIndex = 0;

  constructor(
    private messageService: NzMessageService,
    private clipboard: Clipboard
  ) {}

  get currentLocale() {
    return this.missingTranslations[this.selectedIndex].locale;
  }

  onSelectChange(tabChange: NzTabChangeEvent) {
    this.selectedIndex = tabChange.index;
  }

  copyValues() {
    const translations = this.getTranslations();
    const translationsToString = JSON.stringify(translations, null, '  ')
      .replace('{', '')
      .replace('}', '')
      .concat(',');
    this.clipboard.copy(translationsToString);

    this.messageService.success('Values copied successfully!');
  }

  addValues(shouldOrder = false) {
    const translations = this.getTranslations();

    addTranslations(
      this.project,
      translations,
      this.currentLocale.id,
      shouldOrder
    );

    this.messageService.success('Values added successfully!');
  }

  getTranslations() {
    const translations = {};

    this.missingTranslations[this.selectedIndex].missingTranslations.forEach(
      missingTranslation => {
        translations[missingTranslation.key] = missingTranslation.translation;
      }
    );

    return translations;
  }

  getHtmlTranslation(translation: string) {
    return `"${translation}"`;
  }
}
