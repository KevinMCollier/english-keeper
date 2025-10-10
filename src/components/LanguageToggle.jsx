import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const { lng } = useParams();
  const navigate = useNavigate();
  const currentLang = i18n.language;

  const change = (newLang) => {
    if (newLang === currentLang) return;

    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);

    // Replace just the language prefix in the current path
    const path = window.location.pathname.replace(`/${lng}`, `/${newLang}`);
    navigate(path + window.location.search + window.location.hash);
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
        const active = currentLang.startsWith(code); // handles 'en-US' etc
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
