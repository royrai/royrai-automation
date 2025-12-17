import { useLanguage } from '../context/LanguageContext';
import { translations, TranslationType } from '../data/translations/index';

export function useTranslation(): TranslationType {
  const { language } = useLanguage();
  return translations[language];
}
