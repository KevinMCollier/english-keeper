import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const switchLang = (newLang) => {
    if (newLang === currentLang) return;

    const { pathname, search, hash } = window.location;
    const parts = pathname.split('/').filter(Boolean); // e.g. ["en","privacy"]

    let nextPath;
    if (parts.length && ['en','ja'].includes(parts[0])) {
      parts[0] = newLang; // replace existing prefix
      nextPath = '/' + parts.join('/');
    } else {
      // no prefix yet → add one
      nextPath = `/${newLang}${pathname}`;
    }

    i18n.changeLanguage(newLang);
    try {
      localStorage.setItem('lang', newLang);
    // eslint-disable-next-line no-empty
    } catch {}

    navigate(nextPath + search + hash, { replace: true });
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
        const active = currentLang && currentLang.startsWith(code);
        return (
          <button
            key={code}
            role="tab"
            aria-selected={active}
            aria-pressed={active}
            disabled={active}
            onClick={() => switchLang(code)}
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
