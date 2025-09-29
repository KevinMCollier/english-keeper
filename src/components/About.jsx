// src/components/About.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Timeline from './Timeline';

export default function About() {
  const { t } = useTranslation('about');

  // Main blurb paragraphs
  const paragraphs = t('blurb', { returnObjects: true });
  const blurbArray = Array.isArray(paragraphs)
    ? paragraphs
    : String(paragraphs).split('\n\n');

  // Subtext under avatar (small grey lines)
  const metaRaw = t('avatarMeta', { returnObjects: true });
  const metaLines = Array.isArray(metaRaw)
    ? metaRaw
    : String(metaRaw ?? '').split('\n').filter(Boolean);

  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="bg-white text-blue">
      {/* Top: prose (left) + avatar (right) */}
      <div
        className="
          container mx-auto max-w-6xl
          px-6 sm:px-8
          pt-16 md:pt-20
          grid grid-cols-1 md:grid-cols-12
          gap-8 md:gap-10
          items-start
          overflow-x-hidden
        "
      >
        {/* Prose (now first/left) */}
        <div className="md:col-span-7 col-span-12 md:order-1 md:pr-6">
          <div className="max-w-2xl">
            <h2 className="text-midnight-navy font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mb-4">
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
                  className="
                    text-[15px] sm:text-base leading-relaxed text-slate-700 mb-4
                    break-words hyphens-auto
                  "
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

        {/* Avatar + subtle meta (now second/right) */}
        <div className="md:col-span-3 col-span-12 md:order-2 flex md:justify-start justify-center md:pl-6">
          <div className="flex flex-col items-center md:items-start">
            <img
              className="
                w-72 h-auto
                md:w-80
                rounded-xl
                object-cover
                shadow-md
              "
              src="/kevin-standing-profile.JPG"
              alt={t('avatarAlt')}
              loading="lazy"
            />

            {metaLines.length > 0 && (
              <div
                className="
                  mt-2 pl-1 sm:pl-2 text-[12px] text-gray-500 leading-tight
                  w-48 sm:w-56 md:w-64
                  text-left break-words hyphens-auto
                "
              >
                {metaLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-6 sm:px-8 pb-20 overflow-x-hidden">
        <Timeline />
      </div>
    </section>
  );
}
