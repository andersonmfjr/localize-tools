import { Project } from '../models/project.model';
const fs = window.require('fs');

export function removeUnusedTranslations(project: Project) {
  const defaultLocaleRawData = fs.readFileSync(project.defaultLocale.path);
  const defaultLocaleJson = JSON.parse(defaultLocaleRawData);
  const defaultTranslations = defaultLocaleJson.translations;
  const defaultTranslationsKeys = Object.keys(defaultTranslations);

  project.locales.forEach((locale) => {
    const localeRawData = fs.readFileSync(locale.path);
    const localeJson = JSON.parse(localeRawData);
    const localeTranslations = localeJson.translations;
    const localeTranslationsKeys = Object.keys(localeTranslations);

    const unusedIds = localeTranslationsKeys.filter(
      (key) => !defaultTranslationsKeys.includes(key)
    );

    const newTranslations = {};
    for (const [key, value] of Object.entries(localeTranslations)) {
      if (!unusedIds.includes(key)) {
        newTranslations[key] = value;
      }
    }

    localeJson.translations = newTranslations;

    // TODO: Get number 2 by project config
    const parsedData = JSON.stringify(localeJson, null, 2);

    // TODO: Get \n (end of file) by project config
    fs.writeFileSync(locale.path, parsedData + '\n');
  });
}
