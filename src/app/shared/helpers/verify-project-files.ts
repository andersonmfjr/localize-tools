import { Project } from '../models/project.model';
import * as path from 'path';

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
      path: `${project.messages.directory}${path.sep}${project.messages.prefix}.json`,
    },
  ];

  project.locales?.forEach((locale) => {
    locales.push({
      name: locale.name,
      path: `${project.messages.directory}${path.sep}${project.messages.prefix}.${locale.suffix}.json`,
    });
  });

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
