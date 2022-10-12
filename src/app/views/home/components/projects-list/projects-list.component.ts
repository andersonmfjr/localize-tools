import { Component, OnInit } from '@angular/core';
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

  constructor(private projectsService: ProjectService) {}

  get isEmpty() {
    return !this.projects.length;
  }

  ngOnInit(): void {
    this.projects = this.projectsService.getAll();
  }

  onSearchChange() {
    this.projects = this.projectsService.getAll(this.searchTerm);
  }
}
