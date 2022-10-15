import { Locale } from './locale.model';

export class Project {
  id: string;
  name: string;
  description?: string;
  defaultLocale: Locale;
  locales: Locale[];
  useXlff: boolean;
}
