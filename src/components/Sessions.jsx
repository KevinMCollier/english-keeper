import { Trans, useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ServiceButton from './ServiceButton';

export default function Sessions() {
  const { t } = useTranslation(['pricing', 'sessions']);

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.06 * i, duration: 0.4, ease: 'easeOut' },
    }),
  };
  const viewport = { once: false, amount: 0.3 };

  // 1:1 blocks & groups bullets from overview namespace
  const rawBlocks = t('oneToOne.blocks', { ns: 'sessions', returnObjects: true });
  const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
  // Desired visual order in the 2-col grid
  const order = [0, 2, 1, 3].filter(i => blocks[i]);

  const rawGroupBullets = t('groups.bullets', { ns: 'sessions', returnObjects: true });
  const groupBullets = Array.isArray(rawGroupBullets) ? rawGroupBullets : [];

  // Pull Calendly URLs from sessions.json items
  const items = t('items', { ns: 'pricing', returnObjects: true });
  const byKey = Array.isArray(items)
    ? Object.fromEntries(items.map((i) => [i.key, i.url]))
    : {};

  const urlOnline   = byKey['online50']  || '';
  const urlInPerson = byKey['inperson']  || '';
  const urlGroup    = byKey['group80']   || '';

  return (
    <section id="sessions" className="border-t border-white/10 bg-white text-midnight-navy font-body">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 py-16 sm:py-20 space-y-12">

        {/* Header (left-aligned) */}
        <div className="max-w-3xl">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
            {t('title', { ns: 'sessions' })}
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-graphite">
            <Trans i18nKey="intro" ns="sessions" />
          </p>
        </div>

        {/* Private Sessions Card */}
        <div className="rounded-2xl bg-white/70 ring-1 ring-black/5 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="font-display font-bold text-xl sm:text-2xl">
              {t('oneToOne.title', { ns: 'sessions' })}
            </h3>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm ring-1 ring-black/10 bg-white">
              {t('oneToOne.badge', { ns: 'sessions' })}
            </span>
          </div>

          {/* Two-column grid for the four sections */}
          <div className="grid md:grid-cols-2 grid-flow-row-dense gap-8">
            {order.map((i, idx) => {
              const steps = t(`oneToOne.blocks.${i}.steps`, { ns: 'sessions', returnObjects: true });
              const stepList = Array.isArray(steps) ? steps : [];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  custom={idx}
                  className="space-y-2"
                >
                  <p className="font-semibold">
                    <Trans i18nKey={`oneToOne.blocks.${i}.heading`} ns="sessions" />
                  </p>
                  <p className="text-graphite">
                    <Trans i18nKey={`oneToOne.blocks.${i}.body`} ns="sessions" />
                  </p>
                  {stepList.length ? (
                    <ul className="mt-2 ml-4 list-disc space-y-1 text-graphite">
                      {stepList.map((__, j) => (
                        <li key={j}>
                          <Trans i18nKey={`oneToOne.blocks.${i}.steps.${j}`} ns="sessions" />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.div>
              );
            })}
          </div>

          {/* CTAs in bottom-right of card */}
          <div className="flex justify-end gap-3 pt-2">
            {urlInPerson ? (
              <ServiceButton
                url={urlInPerson}
                label={t('buttons.bookInPerson', { ns: 'pricing', defaultValue: 'Book 1:1 In-Person' })}
                color="caramel"
                className="whitespace-nowrap text-sm py-2"
              />
            ) : null}
            {urlOnline ? (
              <ServiceButton
                url={urlOnline}
                label={t('buttons.bookOnline', { ns: 'pricing', defaultValue: 'Book 1:1 Online' })}
                color="caramel"
                className="whitespace-nowrap text-sm py-2"
              />
            ) : null}
          </div>
        </div>

        {/* Group Sessions Card */}
        <div className="rounded-2xl bg-white/50 ring-1 ring-black/5 p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="font-display font-bold text-xl sm:text-2xl">
              {t('groups.title', { ns: 'sessions' })}
            </h3>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm ring-1 ring-black/10 bg-white">
              {t('groups.badge', { ns: 'sessions' })}
            </span>
          </div>

          <p className="text-graphite leading-relaxed">
            <Trans i18nKey="groups.blurb" ns="sessions" />
          </p>

          <ul className="grid sm:grid-cols-2 gap-2">
            {groupBullets.map((_, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i + 10}
                className="flex items-start gap-2"
              >
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-copper-rust" />
                <p className="text-graphite">
                  <Trans i18nKey={`groups.bullets.${i}`} ns="sessions" />
                </p>
              </motion.li>
            ))}
          </ul>

          {/* CTA in bottom-right of card */}
          <div className="flex justify-end pt-2">
            {urlGroup ? (
              <ServiceButton
                url={urlGroup}
                label={t('buttons.bookGroup', { ns: 'pricing', defaultValue: 'Book Group' })}
                color="caramel"
                className="whitespace-nowrap text-sm py-2"
              />
            ) : null}
          </div>
        </div>

        {/* Footnote */}
        <p className="text-sm text-graphite/80">
          <Trans i18nKey="footnote" ns="sessions" />
        </p>
      </div>
    </section>
  );
}
