import { Locale } from '../models/locale.model';
import { Project } from '../models/project.model';
const fs = window.require('fs');

export type IdentifyMissingData = {
  locale: Locale;
  missingKeys: string[] | number[];
  missingTranslations: { key: string | number; translations: string[] }[];
};

export function identifyMissingTranslations(
  project: Project
): IdentifyMissingData[] {
  try {
    const defaultLocaleRawData = fs.readFileSync(
      project.defaultLocale.path,
      'utf8'
    );
    const defaultLocaleJson = JSON.parse(defaultLocaleRawData);
    const defaultTranslations = defaultLocaleJson.translations;

    const missingData: IdentifyMissingData[] = [];

    project.locales.forEach(locale => {
      try {
        const localeRawData = fs.readFileSync(locale.path, 'utf8');
        const localeJson = JSON.parse(localeRawData);
        const localeTranslations = localeJson.translations;

        const missingKeys = compareObjects(
          defaultTranslations,
          localeTranslations
        );

        const missingTranslations = [];

        missingKeys.forEach((missingKey: string | number) => {
          missingTranslations.push({
            key: missingKey,
            translation: defaultTranslations[missingKey],
          });
        });

        missingData.push({
          locale,
          missingKeys,
          missingTranslations,
        });
      } catch (error) {
        throw error;
      }
    });

    return missingData;
  } catch (error) {
    throw error;
  }
}

function compareObjects(
  obj1: Record<string | number, any>,
  obj2: Record<string | number, any>
): string[] | number[] {
  const missingKeys = [];

  for (const prop in obj1) {
    if (obj2[prop]) {
      if (typeof obj1[prop] === 'object' && typeof obj2[prop] === 'object') {
        compareObjects(obj1[prop], obj2[prop]);
      }
    } else {
      if (typeof obj1[prop] === 'object') {
        compareObjects(obj1[prop], {});
      }
      missingKeys.push(prop);
    }
  }

  return missingKeys;
}
