import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

export default function Banner() {
  const { t } = useTranslation('banner');
  const [openSignup, setOpenSignup] = useState(false);

  const btn = (...c) =>
    `inline-flex items-center justify-center text-base font-semibold px-6 py-2 rounded-full transition ${c.join(' ')}`;

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Split-friendly: prefer subTop/subBottom, but fall back to old 'sub'
  const subTop = t('subTop', { defaultValue: '' });
  const subBottom = t('subBottom', { defaultValue: '' });
  const hasSplit =
    subTop && subTop !== 'subTop' && subBottom && subBottom !== 'subBottom';

  return (
    <section id="banner" className="bg-creme h-screen pt-28 md:pt-0 font-body">
      <div className="container mx-auto flex px-10 lg:py-10 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start text-center md:text-left mb-10 md:mb-0">

          {/* H1 (keep for SEO) */}
          <h1
            className="font-display font-extrabold text-caramel text-5xl sm:text-7xl
                       tracking-tight leading-snug mb-4"
          >
            <Trans
              t={t}
              i18nKey="headline"
              components={[<br key="linebreak" />]}
            />
          </h1>

          {/* Sub — split version first line (bold for emphasis/SEO) */}
          {hasSplit ? (
            <>
              <p
                className="mt-3 max-w-3xl text-lg sm:text-xl font-extrabold text-midnight-navy
                           tracking-normal leading-relaxed"
              >
                {subTop}
              </p>
              <p
                className="mt-3 max-w-3xl text-lg sm:text-xl font-medium text-midnight-navy/90
                           tracking-normal leading-relaxed"
              >
                {subBottom}
              </p>
            </>
          ) : (
            // Fallback to old single 'sub' key (keeps your current site working)
            <p
              className="mt-3 max-w-3xl text-lg sm:text-xl font-extrabold text-midnight-navy
                         tracking-normal leading-relaxed"
            >
              {t('sub')}
            </p>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('pricing')}
              className={btn('bg-orange text-off-white', 'hover:bg-copper-rust/90')}
            >
              {t('cta.services')}
            </button>
          </div>
        </div>
      </div>

      {/* signup modal */}
      {openSignup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpenSignup(false)}
        >
          <div
            className="bg-off-white w-full max-w-md rounded-xl p-8 space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* modal content */}
          </div>
        </div>
      )}
    </section>
  );
}
