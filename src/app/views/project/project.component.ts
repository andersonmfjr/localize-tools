import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { orderTranslations } from '../../shared/helpers/orderTranslations';
import { removeUnusedTranslations } from '../../shared/helpers/removeUnusedTranslations';
import { verifyProjectFiles } from '../../shared/helpers/verifyProjectFiles';
import { Project } from '../../shared/models/project.model';
import { ProjectService } from '../../shared/services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project: Project;
  projectFiles = { hasErrors: false, errorsMessages: [] };

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private messageService: NzMessageService
  ) {}

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
    this.project = this.projectService.selectedProject;
    if (!this.project) {
      this.router.navigateByUrl('/home');
      return;
    }

    this.projectFiles = verifyProjectFiles(this.project);
  }

  removeUnusedTranslations() {
    try {
      removeUnusedTranslations(this.project);
      this.messageService.success('Unused translations removed succesfully!');
    } catch {
      this.messageService.error(
        'An error has occurred when removing. Please verify your translate files!'
      );
    }
  }

  orderTranslations() {
    try {
      orderTranslations(this.project);
      this.messageService.success('Translations ordered succesfully!');
    } catch {
      this.messageService.error(
        'An error has occurred when ordering. Please verify your translate files!'
      );
    }
  }
}
