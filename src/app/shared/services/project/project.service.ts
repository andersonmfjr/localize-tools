import { Injectable } from '@angular/core';
import { Project } from '../../models/project.model';
import { CONSTANTS } from '../helpers/constants';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private localStorage: LocalStorageService) {}

  getAll(): Project[] {
    return this.localStorage.get(CONSTANTS.projects) || [];
  }

  getById(id: string): Project {
    const projects = this.getAll();
    const project = projects.find((p) => p.id === id);
    return project;
  }

  deleteAll(): boolean {
    return this.localStorage.remove(CONSTANTS.projects);
  }

  deleteById(id: string): boolean {
    const projects = this.getAll();
    const newProjects = projects.filter((p) => p.id !== id);
    return this.localStorage.set(CONSTANTS.projects, newProjects);
  }

  set(project: Project): Project {
    const projects = this.getAll();
    projects.push(project);
    this.localStorage.set(CONSTANTS.projects, projects);
    return project;
  }

  update(id: string, payload: Project): Project | boolean {
    const project = this.getById(id);

    if (project) {
      const newProject = { id, ...project, ...payload };
      const projects = this.getAll();
      const newProjects = projects.map((p) => {
        if (p.id === id) {
          return newProject;
        }

        return p;
      });
      this.localStorage.set(CONSTANTS.projects, newProjects);
      return newProject;
    }

    return false;
  }
}
