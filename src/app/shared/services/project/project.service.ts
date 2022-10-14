import { Injectable } from '@angular/core';
import { Project } from '../../models/project.model';
import { CONSTANTS } from '../helpers/constants';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private localStorage: LocalStorageService) {}

  get selectedProject(): Project {
    const id = this.localStorage.get(CONSTANTS.selectedProjectId);
    return this.getById(id);
  }

  set selectedProject(project: Project) {
    if (project) {
      this.localStorage.set(CONSTANTS.selectedProjectId, project.id);
      return;
    }

    this.localStorage.remove(CONSTANTS.selectedProjectId);
  }

  getAll(search?: string): Project[] {
    const projects: Project[] = this.localStorage.get(CONSTANTS.projects) || [];
    if (!search) {
      return projects;
    }

    return projects.filter((p) => {
      const searchLowerCase = search.toLocaleLowerCase();
      const name = p.name.toLocaleLowerCase().includes(searchLowerCase);
      const description = p.description
        ?.toLocaleLowerCase()
        .includes(searchLowerCase);
      const defaultLocaleName = p.defaultLocale.name
        .toLocaleLowerCase()
        .includes(searchLowerCase);
      const defaultLocaleAbbr = p.defaultLocale.abbreviation
        .toLocaleLowerCase()
        .includes(searchLowerCase);
      const defaultLocaleId = p.defaultLocale.id
        .toLocaleLowerCase()
        .includes(searchLowerCase);

      let locales = false;
      p.locales?.forEach((l) => {
        if (locales) {
          locales = true;
          return;
        }

        const localeName = l.name.toLocaleLowerCase().includes(searchLowerCase);
        const localeAbbr = l.abbreviation
          .toLocaleLowerCase()
          .includes(searchLowerCase);
        const localeId = l.abbreviation
          .toLocaleLowerCase()
          .includes(searchLowerCase);

        locales = localeAbbr || localeName || localeId;
      });

      return (
        name ||
        description ||
        defaultLocaleName ||
        defaultLocaleId ||
        defaultLocaleAbbr ||
        locales
      );
    });
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

  add(project: Project): Project {
    const projects = this.getAll();
    projects.push(project);
    this.localStorage.set(CONSTANTS.projects, projects);
    return project;
  }

  update(id: string, payload: Omit<Project, 'id'>): Project | boolean {
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
