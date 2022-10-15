import { Project } from '../models/project.model';

type VerifyProjectFilesResponse = {
  hasErrors: boolean;
  errorsMessages: string[];
};

export function verifyProjectFiles(
  project: Project
): VerifyProjectFilesResponse {
  try {
    const fs = window.require('fs');
    const errors = [];

    const locales = [
      {
        name: project.defaultLocale.name,
        path: project.defaultLocale.path,
      },
      ...project.locales,
    ];

    locales.forEach((locale) => {
      const exists = fs?.existsSync(locale.path);

      if (!exists) {
        errors.push(`${locale.name}: ${locale.path} not exists`);
      }
    });

    return {
      hasErrors: !!errors.length,
      errorsMessages: errors,
    };
  } catch (error) {
    throw error;
  }
}
