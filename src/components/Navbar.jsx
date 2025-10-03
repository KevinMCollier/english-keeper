import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import ScheduleButton from './ScheduleButton';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('navbar');

  // Optional: lock body scroll when the mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = original || '';
    return () => (document.body.style.overflow = original || '');
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="bg-orange sticky top-0 z-20 w-full font-body">
      {/* Inner bar */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 h-14 flex items-center overflow-x-hidden">
        {/* Brand */}
        <a
          href="#banner"
          className="shrink-0 font-brand text-off-white text-2xl sm:text-3xl tracking-wide hover:opacity-90 transition"
        >
          {t('brand')}
        </a>

        {/* Location (hide on very small screens) */}
        <span className="ml-3 text-xs text-off-white/80 tracking-wide hidden sm:inline">
          {t('location')}
        </span>

        {/* Divider */}
        <span className="hidden sm:inline-block h-4 w-px bg-off-white/25 mx-4 sm:mx-6" />

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6 text-off-white">
          <a href="#sessions" className="hover:underline underline-offset-4">
            {t('sessions')}
          </a>
          <a href="#about" className="hover:underline underline-offset-4">
            {t('about')}
          </a>
          <a href="#contact" className="hover:underline underline-offset-4">
            {t('contact')}
          </a>
        </nav>

        <div className="flex-1" />

        {/* Language toggle (desktop) */}
        <div className="hidden sm:block">
          <LanguageToggle />
        </div>

        {/* Desktop CTA */}
        <ScheduleButton
          variant="outline"
          className="ml-3 hidden md:inline-block"
        />

        {/* Hamburger */}
        <button
          className="md:hidden ml-3 text-off-white hover:opacity-90 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {/* Simple icon (keeps layout consistent) */}
          <span className="block text-2xl leading-none select-none">☰</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-orange text-off-white font-body border-t border-white/15"
        >
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 py-4 space-y-4">
            <a
              href="#sessions"
              onClick={closeMenu}
              className="block w-full text-lg hover:underline underline-offset-4"
            >
              {t('sessions')}
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="block w-full text-lg hover:underline underline-offset-4"
            >
              {t('about')}
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="block w-full text-lg hover:underline underline-offset-4"
            >
              {t('contact')}
            </a>

            {/* Mobile language toggle */}
            <div className="pt-1">
              <LanguageToggle />
            </div>

            {/* Mobile CTA (full-width button; closes menu first) */}
            <ScheduleButton
              variant="outline"
              className="block w-full"
              onBeforeOpen={closeMenu}
            />
          </div>
        </nav>
      )}
    </header>
  );
}
