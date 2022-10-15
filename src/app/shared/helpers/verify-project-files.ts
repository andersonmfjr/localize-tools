import { Project } from '../models/project.model';

type VerifyProjectFilesResponse = {
  hasErrors: boolean;
  errorsMessages: string[];
};

export function verifyProjectFiles(
  project: Project
): VerifyProjectFilesResponse {
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
      errors.push(`Locale ${locale.name} file not exists`);
    }
  });

  return {
    hasErrors: !!errors.length,
    errorsMessages: errors,
  };
}
