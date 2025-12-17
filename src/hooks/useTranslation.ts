import { useLanguage } from '../context/LanguageContext';
import { translations, Translations } from '../data/translations';

export function useTranslation(): Translations {
  const { language } = useLanguage();
  return translations[language];
}
