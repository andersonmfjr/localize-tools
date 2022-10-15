import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { verifyProjectFiles } from '../../../../shared/helpers/verifyProjectFiles';
import { Project } from '../../../../shared/models/project.model';
import { ProjectService } from '../../../../shared/services/project/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Output() deleted = new EventEmitter<void>();

  projectFiles = { hasErrors: false, errorsMessages: [] };

  constructor(private projectService: ProjectService, private router: Router) {}

  get projectLocales(): string {
    if (this.project.locales.length === 1) {
      return this.project.locales[0].name;
    }

    let locales = '';

    this.project.locales.forEach((locale, index) => {
      locales =
        locales +
        locale.name +
        `${index === this.project.locales.length - 1 ? '' : ', '}`;
    });

    return locales;
  }

  ngOnInit(): void {
    this.projectFiles = verifyProjectFiles(this.project);
  }

  deleteProject() {
    this.deleted.emit();
  }

  onActionClick(e: Event, type: string) {
    if (e && type !== 'delete') {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    switch (type) {
      case 'edit':
        this.projectService.selectedProject = this.project;
        this.router.navigateByUrl('/edit-project');
        break;
      case 'home':
      case 'card':
        this.projectService.selectedProject = this.project;
        this.router.navigateByUrl('/project');
        break;
    }
  }
}
