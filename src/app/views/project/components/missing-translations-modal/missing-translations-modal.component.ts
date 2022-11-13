import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTabChangeEvent, NzTabPosition } from 'ng-zorro-antd/tabs';
import { addTranslations } from '../../../../shared/helpers/addTranslations';
import { IdentifyMissingData } from '../../../../shared/helpers/identifyMissingTranslations';
import { Project } from '../../../../shared/models/project.model';

@Component({
  selector: 'app-missing-translations-modal',
  templateUrl: './missing-translations-modal.component.html',
  styleUrls: ['./missing-translations-modal.component.scss'],
})
export class MissingTranslationsModalComponent {
  @Input() missingTranslations: IdentifyMissingData[];
  @Input() isVisible = false;
  @Input() project: Project;

  @Output() closed = new EventEmitter<void>();

  nzTabPosition: NzTabPosition = 'top';
  selectedIndex = 0;

  constructor(private messageService: NzMessageService) {}

  get currentLocale() {
    return this.missingTranslations[this.selectedIndex].locale;
  }

  onSelectChange(tabChange: NzTabChangeEvent) {
    this.selectedIndex = tabChange.index;
  }

  copyValues() {
    console.log('here');
  }

  addValues(shouldOrder = false) {
    const translations = {};

    this.missingTranslations[this.selectedIndex].missingTranslations.forEach(
      missingTranslation => {
        translations[missingTranslation.key] = missingTranslation.translation;
      }
    );

    addTranslations(
      this.project,
      translations,
      this.currentLocale.id,
      shouldOrder
    );

    this.messageService.success('Values added successfully!');
  }
}
