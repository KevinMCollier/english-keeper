import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function WhyMe() {
  const { t } = useTranslation('whyme');
  const points = t('points', { returnObjects: true }) || [];

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.06 * i, duration: 0.4, ease: 'easeOut' },
    }),
  };

  return (
    <section id="why-me" className="border-t border-white/10 bg-creme text-midnight-navy font-body">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 py-16 sm:py-20">

        {/* Section title */}
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-10">
          {t('title')}
        </h2>

        {/* Vertical list of differentiators */}
        <div className="space-y-10">
          {points.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="space-y-2"
            >
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-caramel">
                {p.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-graphite max-w-3xl">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
