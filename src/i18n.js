import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ja',
    supportedLngs: ['en', 'ja'],
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    ns: ['navbar', 'footer', 'contact'],
    defaultNS: 'navbar',
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    cleanCode: true,
  });

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') document.documentElement.lang = lng || 'ja';
});

export default i18n;
