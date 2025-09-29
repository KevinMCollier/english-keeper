import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Timeline from './Timeline';

export default function About() {
  const { t } = useTranslation('about');

  const paragraphs = t('blurb', { returnObjects: true });
  const blurbArray = Array.isArray(paragraphs)
    ? paragraphs
    : String(paragraphs).split('\n\n');

  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="bg-white text-blue">
      <div className="container mx-auto max-w-6xl px-5 pt-20 pb-10 md:pl-20 grid md:grid-cols-12 grid-cols-1 gap-10 items-start justify-center">

        {/* Avatar */}
        <div className="md:col-span-3 col-span-12 flex md:justify-end justify-center pr-6">
          <img
            className="rounded-full w-44 h-44 md:w-52 md:h-52 object-cover shadow-md"
            src="/kevin-profile.jpg"
            alt={t('avatarAlt')}
            loading="lazy"
          />
        </div>

        {/* Prose */}
        <div className="md:col-span-7 col-span-12 ml-6">
          <div className="max-w-2xl">
            <h2 className="font-mont font-bold text-2xl sm:text-3xl text-slate-900 mb-4">
              {t('heading')}
            </h2>

            {/* Collapsible on mobile, fully open on md+ */}
            <div
              className={[
                'relative',
                'md:max-h-none md:overflow-visible',
                expanded ? 'max-h-none' : 'max-h-48 overflow-hidden',
              ].join(' ')}
            >
              {!expanded && (
                <div className="pointer-events-none md:hidden absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-white/0" />
              )}

              {blurbArray.map((p, idx) => (
                <p
                  key={idx}
                  className="text-[15px] sm:text-base leading-relaxed text-slate-700 mb-4"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Toggle only on mobile */}
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="md:hidden inline-block mt-1 text-blue-700 font-medium underline underline-offset-4"
              aria-expanded={expanded}
            >
              {expanded ? t('readLess') : t('readMore')}
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-5 pb-20">
        <Timeline />
      </div>
    </section>
  );
}
