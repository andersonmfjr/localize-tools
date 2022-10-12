import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../../shared/models/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Output() deleted = new EventEmitter<void>();

  constructor() {}

  get projectLocales(): string {
    if (this.project.locales.length === 1) {
      return (
        this.project.locales[0].name + ' - ' + this.project.locales[0].suffix
      );
    }

    let locales = '';

    this.project.locales.forEach((locale, index) => {
      locales =
        locales +
        locale.name +
        ' - ' +
        locale.suffix +
        `${index === this.project.locales.length - 1 ? '' : ', '}`;
    });

    return locales;
  }

  ngOnInit(): void {}

  deleteProject() {
    this.deleted.emit();
  }
}
