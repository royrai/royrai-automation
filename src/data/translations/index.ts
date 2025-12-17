// Translations index - exports all language files
import { en } from './en';
import { he } from './he';

export const translations = {
  en,
  he,
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  he: 'עברית',
};

export type Language = 'en' | 'he';
export type TranslationType = typeof en;
