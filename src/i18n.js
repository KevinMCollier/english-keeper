// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Prefer URL segment if present
const pathLng = (typeof window !== 'undefined'
  ? window.location.pathname.split('/')[1]
  : null);
const stored = (typeof window !== 'undefined'
  ? localStorage.getItem('lang')
  : null);

const allowed = ['en', 'ja'];
const initialLng = allowed.includes(pathLng) ? pathLng : (stored || 'ja');

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: initialLng,
    fallbackLng: 'ja',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['navbar', 'footer', 'contact'],
    defaultNS: 'navbar',
    interpolation: { escapeValue: false },
  });

export default i18n;
