import { Project } from '../models/project.model';
import detectIndent from 'detect-indent';
import { Locale } from '../models/locale.model';
const fs = window.require('fs');

export function orderTranslations(project: Project, localeId: string = null) {
  try {
    const defaultLocaleRawData = fs.readFileSync(
      project.defaultLocale.path,
      'utf8'
    );
    const defaultLocaleJson = JSON.parse(defaultLocaleRawData);
    const defaultTranslations = defaultLocaleJson.translations;
    const defaultTranslationsKeys = Object.keys(defaultTranslations);

    project.locales.forEach(locale => {
      try {
        if (!localeId || locale?.id === localeId) {
          orderLocale(defaultTranslationsKeys, locale);
        }
      } catch (error) {
        throw error;
      }
    });
  } catch (error) {
    throw error;
  }
}

function orderLocale(defaultTranslationsKeys: string[], locale: Locale) {
  try {
    const localeRawData = fs.readFileSync(locale.path, 'utf8');
    const localeJson = JSON.parse(localeRawData);
    const localeTranslations = localeJson.translations;

    const newTranslations = {};

    defaultTranslationsKeys.forEach(key => {
      if (localeTranslations[key]) {
        newTranslations[key] = localeTranslations[key];
      }
    });

    localeJson.translations = newTranslations;

    const indent = detectIndent(localeRawData).indent || '  ';
    const parsedData = JSON.stringify(localeJson, null, indent);
    const endOfFileMatches = localeRawData.match(/\r?\n$/)?.[0];
    const endOfFile = endOfFileMatches ? endOfFileMatches : '';

    fs.writeFileSync(locale.path, parsedData + endOfFile);
  } catch (error) {
    throw error;
  }
}
