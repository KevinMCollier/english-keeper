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
    <section id="intro" className="border-t border-white/10 bg-creme text-midnight-navy">
      <div className="container mx-auto px-5 py-16 space-y-20">
        {/* Block 1: Lead + Personas (text left, image right) */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-mont font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-6">
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
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-copper-rust" />
                  <p className="text-base sm:text-lg leading-relaxed">
                    <Trans i18nKey={`personas.${i}`} ns="intro" components={{ strong: <strong className="font-bold" /> }} />
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Placeholder image */}
          <div className="h-64 md:h-80 bg-gray-200 rounded-xl flex items-center justify-center text-graphite/70">
            [ Image here ]
          </div>
        </div>

        {/* Block 2: Benefits (text right, image left) */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Placeholder image */}
          <div className="order-2 md:order-1 h-64 md:h-80 bg-gray-200 rounded-xl flex items-center justify-center text-graphite/70">
            [ Image here ]
          </div>

          <div className="order-1 md:order-2">
            <h3 className="font-mont font-bold text-3xl sm:text-4xl tracking-tight mb-6">
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
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-copper-rust" />
                  <p className="text-base sm:text-lg leading-relaxed">
                    <Trans i18nKey={`benefits.${i}`} ns="intro" components={{ strong: <strong className="font-bold" /> }} />
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
