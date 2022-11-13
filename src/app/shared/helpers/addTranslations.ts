import { Project } from '../models/project.model';
import detectIndent from 'detect-indent';
import { orderTranslations } from './orderTranslations';
const fs = window.require('fs');

export function addTranslations(
  project: Project,
  translations: Record<string, string>,
  localeId: string,
  shouldOrder = false
) {
  try {
    const locale = project.locales.find(l => l.id === localeId);

    if (locale) {
      const localeRawData = fs.readFileSync(locale.path, 'utf8');
      const localeJson = JSON.parse(localeRawData);
      const localeTranslations = {
        ...localeJson.translations,
        ...translations,
      };

      localeJson.translations = localeTranslations;

      const indent = detectIndent(localeRawData).indent || '  ';
      const parsedData = JSON.stringify(localeJson, null, indent);
      const endOfFileMatches = localeRawData.match(/\r?\n$/)?.[0];
      const endOfFile = endOfFileMatches ? endOfFileMatches : '';

      fs.writeFileSync(locale.path, parsedData + endOfFile);

      if (shouldOrder) {
        orderTranslations(project, localeId);
      }
    }
  } catch (error) {
    throw error;
  }
}
