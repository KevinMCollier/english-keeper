// src/components/IntroAlt.jsx
import { Trans, useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function IntroAlt() {
  const { t } = useTranslation('intro');
  const personas = t('personas', { returnObjects: true }) || [];
  const benefits = t('benefits', { returnObjects: true }) || [];

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i, duration: 0.45, ease: 'easeOut' },
    }),
  };
  const viewport = { once: false, amount: 0.3 };

  return (
    <section
      id="intro"
      className="border-t border-white/10 bg-creme text-midnight-navy font-body"
    >
      {/* Give the section generous side padding on mobile */}
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 py-16 space-y-16 sm:space-y-20">

        {/* Block 1: Lead + Personas (text left / image right) */}
        <div className="grid gap-8 md:gap-10 md:[grid-template-columns:3fr_2fr] md:items-center">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-6">
              {t('lead')}
            </h2>

            <ul className="space-y-3">
              {personas.map((_, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  custom={i}
                >
                  <span
                    aria-hidden
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-copper-rust"
                  />
                  <p className="text-base sm:text-lg leading-relaxed break-words">
                    <Trans
                      i18nKey={`personas.${i}`}
                      ns="intro"
                      components={{ strong: <strong className="font-semibold" /> }}
                    />
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Image card — centered on mobile, clipped & shadowed */}
          <div className="h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200/70 ring-1 ring-black/5 shadow-sm flex items-center justify-center text-graphite/70 mx-auto w-full max-w-2xl md:max-w-none">
            <img
              src="/convo.jpg"
              alt={t('imageAlt')}
              className="block h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        {/* Block 2: Benefits (image left / text right) */}
        <div className="grid gap-8 md:gap-10 md:[grid-template-columns:2fr_3fr] md:items-center">
          {/* Image card */}
          <div className="order-2 md:order-1 h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200/70 ring-1 ring-black/5 shadow-sm flex items-center justify-center text-graphite/70 mx-auto w-full max-w-2xl md:max-w-none">
            <img
              src="/office.jpg"
              alt={t('imageAlt')}
              className="block h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          <div className="order-1 md:order-2 max-w-2xl mx-auto md:mx-0">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-6">
              {t('headingSecondary')}
            </h3>

            <ul className="space-y-3">
              {benefits.map((_, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  custom={i + personas.length}
                >
                  <span
                    aria-hidden
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-copper-rust"
                  />
                  <p className="text-base sm:text-lg leading-relaxed break-words">
                    <Trans
                      i18nKey={`benefits.${i}`}
                      ns="intro"
                      components={{ strong: <strong className="font-semibold" /> }}
                    />
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
