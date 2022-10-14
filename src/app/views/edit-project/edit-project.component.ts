import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Project } from '../../shared/models/project.model';
import { ProjectService } from '../../shared/services/project/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
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

  deleteProject() {
    this.projectService.deleteById(this.project.id);
    this.projectService.selectedProject = null;

    this.messageService.success('Project deleted successfully!');

    this.router.navigateByUrl('/home');
  }
}
