/**
 * i18n configuration and setup
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: false,
  detect: () => {
    const locales = RNLocalize.getLocales();
    const languageTag = locales[0]?.languageTag || 'en';
    const languageCode = languageTag.split('-')[0];
    return languageCode in resources ? languageCode : 'en';
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

