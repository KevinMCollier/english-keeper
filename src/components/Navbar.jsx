import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import useLangLink from '../hooks/useLangLink';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('navbar');
  const langLink = useLangLink();

  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = original || '';
    return () => (document.body.style.overflow = original || '');
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="bg-orange sticky top-0 z-20 w-full font-body">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 h-14 flex items-center overflow-x-hidden">
        <div className="shrink-0 flex items-center gap-2 whitespace-nowrap">
          <a
            href={langLink('#banner')}  // 👈 now language-aware
            className="inline-flex items-center gap-2 font-brand text-off-white text-2xl sm:text-3xl leading-tight tracking-wide hover:opacity-90 transition"
          >
            <img
              src="/bold_face_white.png"
              alt="Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain shrink-0"
            />
            {t('brand')}
          </a>

          <span className="hidden sm:inline text-off-white/80 text-xs sm:text-sm leading-tight">
            | {t('serviceTag')}
          </span>
        </div>

        <span className="hidden sm:inline-block h-4 w-px bg-off-white/25 mx-4 sm:mx-6" />

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

        <div className="hidden sm:block">
          <LanguageToggle />
        </div>

        <a
          href={langLink('#pricing')} // 👈 updated
          className="ml-3 hidden md:inline-block inline-flex items-center justify-center rounded-full text-sm font-semibold transition px-4 py-1.5 text-off-white border-2 border-off-white/70 hover:bg-off-white hover:text-black"
        >
          {t('contact:cta.call')}
        </a>

        <button
          className="md:hidden ml-3 text-off-white hover:opacity-90 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="block text-2xl leading-none select-none">☰</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className="md:hidden bg-orange text-off-white font-body border-t border-white/15">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 py-4 space-y-4">
            <a href={langLink('#sessions')} onClick={closeMenu} className="block w-full text-lg hover:underline underline-offset-4">
              {t('sessions')}
            </a>
            <a href={langLink('#about')} onClick={closeMenu} className="block w-full text-lg hover:underline underline-offset-4">
              {t('about')}
            </a>
            <a href={langLink('#contact')} onClick={closeMenu} className="block w-full text-lg hover:underline underline-offset-4">
              {t('contact')}
            </a>
            <div className="pt-1">
              <LanguageToggle />
            </div>
            <a href={langLink('#pricing')} onClick={closeMenu} className="block w-full text-lg underline underline-offset-4">
              {t('contact:cta.call')}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
