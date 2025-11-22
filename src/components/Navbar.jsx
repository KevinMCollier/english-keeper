// src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import useLangLink from '../hooks/useLangLink';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation('navbar');
  const navigate = useNavigate();
  const langLink = useLangLink();

  // lock/unlock page scroll when mobile menu opens
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : (original || '');
    return () => (document.body.style.overflow = original || '');
  }, [open]);

  const closeMenu = () => setOpen(false);

  // Mobile chip switches to the OTHER language
  const currentIsEn = i18n.language?.startsWith('en');
  const nextLang = currentIsEn ? 'ja' : 'en';
  const nextLabel = currentIsEn ? '日本語' : 'EN';

  const switchLanguage = () => {
    i18n.changeLanguage(nextLang);
    try { localStorage.setItem('lang', nextLang); } catch { /* empty */ }
    const { pathname, search, hash } = window.location;
    const parts = pathname.split('/').filter(Boolean); // e.g. ["en","privacy"]
    let nextPath;
    if (parts.length && ['en','ja'].includes(parts[0])) {
      parts[0] = nextLang;
      nextPath = '/' + parts.join('/');
    } else {
      nextPath = `/${nextLang}${pathname}`;
    }
    navigate(nextPath + search + hash);
  };

  return (
    <header className="bg-orange sticky top-0 z-20 w-full font-body">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 h-14 flex items-center">
        {/* Brand (logo + title) */}
        <div className="shrink-0 flex items-center gap-2 whitespace-nowrap">
          <a
            href={langLink('#banner')}
            className="inline-flex items-center gap-2 text-off-white hover:opacity-90 transition"
          >
            <img
              src="/bold_face_white.png"
              alt="Logo"
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0"
            />
            <span className="font-brand leading-tight tracking-wide text-lg sm:text-xl">
              {t('brand')}
            </span>
          </a>

        <span className="hidden sm:inline text-off-white/80 text-xs sm:text-sm leading-tight">
            &nbsp;| {t('serviceTag')}
          </span>
        </div>

        <span className="hidden sm:inline-block h-4 w-px bg-off-white/25 mx-4 sm:mx-6" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-off-white">
          <a href={langLink('#sessions')} className="hover:underline underline-offset-4">
            {t('sessions')}
          </a>
          <a href={langLink('#about')} className="hover:underline underline-offset-4">
            {t('about')}
          </a>
          <a href={langLink('#contact')} className="hover:underline underline-offset-4">
            {t('contact')}
          </a>
        </nav>

        <div className="flex-1" />

        {/* Right controls */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Mobile: compact language chip (shows the OTHER language) */}
          <button
            onClick={switchLanguage}
            aria-label={currentIsEn ? 'Switch to Japanese' : 'Switch to English'}
            className="px-3 py-1 rounded-full text-xs font-semibold border border-off-white/60 text-off-white hover:bg-off-white/15 transition md:hidden"
          >
            {nextLabel}
          </button>

          {/* Desktop: full two-tab LanguageToggle */}
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          {/* Desktop CTA with fixed width so layout doesn't jump between EN/JA */}
          <a
            href={langLink('#schedule')}
            className="
              hidden md:inline-flex items-center justify-center
              rounded-full text-sm font-semibold transition
              px-4 py-1.5 text-off-white border-2 border-off-white/70
              hover:bg-off-white hover:text-black
              md:w-44
            "
          >
            {t('contact:cta.call')}
          </a>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden text-off-white hover:opacity-90 transition"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="block text-2xl leading-none select-none">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-orange text-off-white font-body border-t border-white/15"
        >
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 py-4 space-y-4">
            <a
              href={langLink('#sessions')}
              onClick={closeMenu}
              className="block w-full text-lg hover:underline underline-offset-4"
            >
              {t('sessions')}
            </a>
            <a
              href={langLink('#about')}
              onClick={closeMenu}
              className="block w-full text-lg hover:underline underline-offset-4"
            >
              {t('about')}
            </a>
            <a
              href={langLink('#contact')}
              onClick={closeMenu}
              className="block w-full text-lg hover:underline underline-offset-4"
            >
              {t('contact')}
            </a>
            <a
              href={langLink('#pricing')}
              onClick={closeMenu}
              className="block w-full text-lg underline underline-offset-4"
            >
              {t('contact:cta.call')}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
