'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
    resourcesToBackend((language, namespace) =>
      import(`@/locales/${language === 'es' ? 'spanish' : 'english'}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    ns: ['common', 'auth', 'dashboard', 'patients', 'appointments', 'clinicalRecords', 'inventory', 'profile'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
