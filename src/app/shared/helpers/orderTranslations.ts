import { Project } from '../models/project.model';
const fs = window.require('fs');
import * as path from 'path';

export function orderTranslations(project: Project) {
  const defaultLocaleRawData = fs.readFileSync(
    project.messages.directory + path.sep + project.messages.prefix + '.json'
  );
  const defaultLocaleJson = JSON.parse(defaultLocaleRawData);
  const defaultTranslations = defaultLocaleJson.translations;
  const defaultTranslationsKeys = Object.keys(defaultTranslations);

  project.locales.forEach((locale) => {
    const localePath =
      project.messages.directory +
      path.sep +
      project.messages.prefix +
      '.' +
      locale.suffix +
      '.json';

    const localeRawData = fs.readFileSync(localePath);
    const localeJson = JSON.parse(localeRawData);
    const localeTranslations = localeJson.translations;

    const newTranslations = {};

    defaultTranslationsKeys.forEach((key) => {
      if (localeTranslations[key]) {
        newTranslations[key] = localeTranslations[key];
      }
    });

    localeJson.translations = newTranslations;

    // TODO: Get number 2 by project config
    const parsedData = JSON.stringify(localeJson, null, 2);

    // TODO: Get \n (end of file) by project config
    fs.writeFileSync(localePath, parsedData + '\n');
  });
}
