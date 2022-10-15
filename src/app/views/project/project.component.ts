import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { orderTranslations } from '../../shared/helpers/orderTranslations';
import { removeUnusedTranslations } from '../../shared/helpers/removeUnusedTranslations';
import { Project } from '../../shared/models/project.model';
import { ProjectService } from '../../shared/services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project: Project;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.project = this.projectService.selectedProject;
    if (!this.project) {
      this.router.navigateByUrl('/home');
    }
  }

  removeUnusedTranslations() {
    removeUnusedTranslations(this.project);
    this.messageService.success('Unused translations removed succesfully!');
  }

  orderTranslations() {
    orderTranslations(this.project);
    this.messageService.success('Translations ordered succesfully!');
  }
}
