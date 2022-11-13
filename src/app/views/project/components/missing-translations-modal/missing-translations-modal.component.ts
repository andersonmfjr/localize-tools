import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzTabChangeEvent, NzTabPosition } from 'ng-zorro-antd/tabs';
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

  constructor() {}

  get currentLocale() {
    return this.missingTranslations[this.selectedIndex].locale;
  }

  onSelectChange(tabChange: NzTabChangeEvent) {
    console.log(tabChange);
    this.selectedIndex = tabChange.index;
  }

  copyValues() {
    console.log('here');
  }

  addValuesAtEnd() {}

  addValuesAndOrder() {}
}
