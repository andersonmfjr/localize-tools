import { Project } from '../models/project.model';
import detectIndent from 'detect-indent';
const fs = window.require('fs');

export function orderTranslations(project: Project) {
  const defaultLocaleRawData = fs.readFileSync(
    project.defaultLocale.path,
    'utf8'
  );
  const defaultLocaleJson = JSON.parse(defaultLocaleRawData);
  const defaultTranslations = defaultLocaleJson.translations;
  const defaultTranslationsKeys = Object.keys(defaultTranslations);

  project.locales.forEach((locale) => {
    const localeRawData = fs.readFileSync(locale.path, 'utf8');
    const localeJson = JSON.parse(localeRawData);
    const localeTranslations = localeJson.translations;

    const newTranslations = {};

    defaultTranslationsKeys.forEach((key) => {
      if (localeTranslations[key]) {
        newTranslations[key] = localeTranslations[key];
      }
    });

    localeJson.translations = newTranslations;

    const indent = detectIndent(localeRawData).indent || '  ';
    const parsedData = JSON.stringify(localeJson, null, indent);

    // TODO: Get \n (end of file) by project config
    fs.writeFileSync(locale.path, parsedData + '\n');
  });
}
