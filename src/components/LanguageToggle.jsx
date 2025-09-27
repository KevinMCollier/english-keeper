import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // Restore saved language on mount (if present)
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved && saved !== lang) i18n.changeLanguage(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const change = (lng) => {
    if (lng === lang) return;
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <div
      className="
        inline-flex items-center rounded-full border border-off-white/60
        p-0.5 bg-transparent overflow-hidden
      "
      role="tablist"
      aria-label="Language"
    >
      {[
        { code: 'en', label: 'En' },
        { code: 'ja', label: '日本語' },
      ].map(({ code, label }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            role="tab"
            aria-selected={active}
            aria-pressed={active}
            disabled={active}
            onClick={() => change(code)}
            className={`
              px-3 py-1.5 text-sm rounded-full transition font-semibold
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-off-white/80
              focus-visible:ring-offset-2 focus-visible:ring-offset-orange
              ${active
                ? 'bg-off-white text-midnight-navy cursor-default shadow-sm'
                : 'text-off-white hover:bg-off-white/10 active:bg-off-white/15'}
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
