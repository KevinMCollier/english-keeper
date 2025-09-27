// src/components/Navbar.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import ScheduleButton from './ScheduleButton';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('navbar');

  return (
    <header className="bg-orange sticky top-0 z-20 font-body">
      <div className="container mx-auto px-5 h-14 flex items-center">
        {/* Brand */}
        <a
          href="#banner"
          className="font-brand text-off-white text-2xl sm:text-3xl tracking-wide hover:opacity-90 transition"
        >
          {t('brand')}
        </a>

        {/* Location */}
        <span className="ml-4 text-xs text-off-white/80 tracking-wide hidden sm:inline">
          {t('location')}
        </span>

        {/* Divider */}
        <span className="hidden sm:inline-block h-4 w-px bg-off-white/25 mx-6" />

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6 text-off-white">
          <a href="#Services" className="hover:underline underline-offset-4">
            {t('services', { defaultValue: t('coachCall', { defaultValue: 'Feedback Loop' }) })}
          </a>
          <a href="#about" className="hover:underline underline-offset-4">
            {t('about')}
          </a>
          <a href="#contact" className="hover:underline underline-offset-4">
            {t('contact')}
          </a>
        </nav>

        <div className="flex-1" />

        {/* Language toggle */}
        <div className="hidden sm:block">
          <LanguageToggle />
        </div>

        {/* Desktop CTA (shared button, outline variant) */}
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
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden bg-midnight-navy px-5 pb-6 space-y-4 text-off-white text-lg font-body">
          <a
            href="#FeedbackLoop"
            onClick={() => setOpen(false)}
            className="block w-full hover:underline underline-offset-4"
          >
            {t('feedbackLoop', { defaultValue: 'Feedback Loop' })}
          </a>
          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="block w-full hover:underline underline-offset-4"
          >
            {t('about')}
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-block border-2 border-copper-rust py-2 px-4 rounded-full hover:bg-copper-rust transition"
          >
            {t('contact')}
          </a>

          {/* Mobile language toggle */}
          <div className="pt-2">
            <LanguageToggle />
          </div>

          {/* Mobile CTA (shared button, closes menu before opening Calendly) */}
          <ScheduleButton
            variant="outline"
            className="block w-full"
            onBeforeOpen={() => setOpen(false)}
          />
        </nav>
      )}
    </header>
  );
}
