import { Locale } from './locale.model';

export class Project {
  id: string;
  name: string;
  description?: string;
  defaultLocale: Locale;
  messages: {
    directory: string;
    prefix: string;
  };
  locales: Locale[];
  useXlff: boolean;
  isDefault: boolean;
}
