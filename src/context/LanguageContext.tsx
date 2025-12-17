import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../data/translations/index';

const languageDirection: Record<Language, 'ltr' | 'rtl'> = {
  en: 'ltr',
  he: 'rtl',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: 'ltr' | 'rtl';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'royrai-language';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get from localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'he') {
        return stored;
      }
      // Try to detect from browser
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('he')) {
        return 'he';
      }
    }
    return 'en';
  });

  const direction = languageDirection[language];
  const isRTL = direction === 'rtl';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  // Update document direction and lang when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [language, direction]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
