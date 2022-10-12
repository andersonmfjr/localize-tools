import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Project } from '../../../../shared/models/project.model';
import { ProjectService } from '../../../../shared/services/project/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  searchTerm = '';

  constructor(
    private projectsService: ProjectService,
    private messageService: NzMessageService
  ) {}

  get isEmpty() {
    return !this.projects.length;
  }

  ngOnInit(): void {
    this.searchProjects();
  }

  searchProjects() {
    this.projects = this.projectsService.getAll(this.searchTerm);
  }

  deleteProject(id: string) {
    this.projectsService.deleteById(id);
    this.searchProjects();
    this.messageService.success('Project deleted successfully!');
  }
}
