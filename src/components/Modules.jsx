import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Briefcase,
  Sprout,
  Users,
  GraduationCap,
  Coffee,
  X
} from 'lucide-react';

/** Track colors/icons (keys must match i18n) */
const COLOR_BY_KEY = {
  business_comm: 'bg-[#E9B66A] text-midnight-navy',  // caramel
  career_adv:    'bg-[#B8D9C0] text-midnight-navy',  // soft green
  leadership:    'bg-[#E8D9F1] text-midnight-navy',  // lavender
  mba:           'bg-[#7C9AB0] text-white',          // steel blue
  everyday:      'bg-[#BED9F7] text-midnight-navy'   // light blue
};

const ICON_BY_KEY = {
  business_comm: <Briefcase className="w-6 h-6" />,
  career_adv:    <Sprout className="w-6 h-6" />,
  leadership:    <Users className="w-6 h-6" />,
  mba:           <GraduationCap className="w-6 h-6" />,
  everyday:      <Coffee className="w-6 h-6" />
};

// Order: 3 on first row, 2 on second
const ORDER = ['business_comm', 'career_adv', 'leadership', 'mba', 'everyday'];

export default function Modules({ modules }) {
  const { t } = useTranslation('sessions');
  const prefersReduced = useReducedMotion();

  // ✅ Helper: strip <0/> from titles where <Trans> is not used
  const cleanTitle = (title) => title?.replace(/<0\s*\/>/g, '') ?? '';

  // Normalize & order
  const normalized = useMemo(() => {
    if (!Array.isArray(modules)) return [];
    const withKeys = modules.map((g) => ({
      ...g,
      key: g.key || String(g.title || '').toLowerCase().replace(/\s+/g, '_')
    }));
    const byKey = Object.fromEntries(withKeys.map((g) => [g.key, g]));
    const ordered = ORDER.map((k) => byKey[k]).filter(Boolean);
    const leftovers = withKeys.filter((g) => !ORDER.includes(g.key));
    return [...ordered, ...leftovers];
  }, [modules]);

  // Mobile: pill selection
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTopics = useMemo(
    () => (normalized?.[activeIdx]?.items ?? []),
    [normalized, activeIdx]
  );

  // Desktop: modal state
  const [openIdx, setOpenIdx] = useState(null);
  const isOpen = openIdx !== null;
  const close = () => setOpenIdx(null);

  // esc + scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <section aria-labelledby="modules-title" className="px-0 sm:px-0 py-6 sm:py-8">
      {/* Title + subheader */}
      <div className="mb-6">
        <h3 id="modules-title" className="font-display font-bold text-2xl">
          {t('modules.altTitle', { defaultValue: 'Learning Tracks' })}
        </h3>
        <p className="mt-2 text-graphite">
          {t('modules.subheader', {
            defaultValue:
              'Explore structured learning tracks or create your own path. Every course is tailored to your goals, your time, and your pace.'
          })}
        </p>
      </div>

      {/* Empty state */}
      {!normalized.length ? (
        <div className="rounded-lg bg-white p-5 ring-1 ring-black/5 text-graphite">
          {t('modules.empty', { defaultValue: 'Tracks will appear here soon.' })}
        </div>
      ) : (
        <>
          {/* Mobile: pills + list */}
          <div className="md:hidden space-y-5">
            <div className="flex gap-2 overflow-x-auto overflow-y-visible no-scrollbar -mx-4 px-4 py-2">
              {normalized.map((m, i) => (
                <button
                  key={m.key}
                  onClick={() => setActiveIdx(i)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-sm ring-1 ring-black/10 transition
                    ${i === activeIdx ? 'bg-caramel text-white' : 'bg-white text-midnight-navy hover:bg-gray-50'}`}
                  aria-pressed={i === activeIdx}
                >
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true">{ICON_BY_KEY[m.key] ?? <span className="w-6 h-6">•</span>}</span>
                    {/* ✅ Use <Trans> here for mobile pills */}
                    <Trans components={[<br key="br" />]}>{m.title}</Trans>
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-lg bg-white p-5 ring-1 ring-black/5">
              <h4 className="font-semibold text-lg mb-1">
                {cleanTitle(normalized?.[activeIdx]?.title)}
              </h4>
              {normalized?.[activeIdx]?.tagline ? (
                <p className="text-sm text-graphite mb-3">{normalized[activeIdx].tagline}</p>
              ) : null}
              <ul className="flex flex-wrap gap-2">
                {activeTopics.map((tpc) => (
                  <li key={tpc} className="rounded-full px-3 py-1 text-sm ring-1 ring-black/10 bg-white">
                    {tpc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop: small square cards */}
          <div className="hidden md:flex flex-wrap gap-4">
            {normalized.map((m, i) => {
              const cardColor = COLOR_BY_KEY[m.key] ?? 'bg-white text-midnight-navy';
              return (
                <motion.button
                  key={m.key}
                  type="button"
                  onClick={() => setOpenIdx(i)}
                  className="group w-60 h-60 lg:w-64 lg:h-64 rounded-lg ring-1 ring-black/5 shadow-sm relative text-left
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel/70
                            transition-transform duration-200 will-change-transform
                            hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                  layoutId={`module-card-${i}`}
                  transition={{ layout: { duration: 0.18, ease: 'easeInOut' } }}
                >
                  <div className={`absolute inset-0 ${cardColor} rounded-lg p-6 flex flex-col justify-center`}>
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true">{ICON_BY_KEY[m.key]}</span>
                      {/* ✅ Use <Trans> for desktop cards only */}
                      <span className="relative font-semibold text-lg leading-snug">
                        <Trans components={[<br key="br" />]}>{m.title}</Trans>
                        <span
                          className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full
                                     origin-left scale-x-0 bg-current opacity-60
                                     transition-transform duration-300 ease-out
                                     group-hover:scale-x-100"
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    <div className="absolute left-6 bottom-5 text-xs opacity-0 group-hover:opacity-90 transition-opacity">
                      <span className="underline decoration-dotted">
                            {t('modules.cta.viewModules', { defaultValue: 'View modules →' })}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Modal */}
          <AnimatePresence>
            {isOpen && openIdx !== null && (
              <>
                <motion.div
                  key="backdrop"
                  className="fixed inset-0 z-40 bg-black/40"
                  onClick={close}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                />
                <motion.div
                  key="modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`module-modal-title-${openIdx}`}
                  className="fixed inset-0 z-50 grid place-items-center p-4"
                  onClick={close}
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    layoutId={`module-card-${openIdx}`}
                    transition={{ layout: { duration: 0.18, ease: 'easeInOut' } }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-3xl rounded-lg bg-white ring-1 ring-black/10 shadow-xl relative
                               min-h-[60vh] max-h-[86vh] overflow-hidden flex flex-col"
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                    animate={
                      prefersReduced
                        ? { opacity: 1 }
                        : { opacity: 1, scale: 1, transition: { duration: 0.25 } }
                    }
                    exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                  >
                    <div
                      className={`rounded-t-lg px-6 py-4 ${
                        COLOR_BY_KEY[normalized[openIdx].key] ?? 'bg-gray-100 text-midnight-navy'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3">
                            <span aria-hidden="true">{ICON_BY_KEY[normalized[openIdx].key]}</span>
                            {/* ❌ plain title (no <Trans> here) */}
                            <h4 id={`module-modal-title-${openIdx}`} className="font-semibold text-xl truncate">
                              {cleanTitle(normalized[openIdx].title)}
                            </h4>
                          </div>
                          {normalized[openIdx].tagline ? (
                            <p className="mt-1 text-sm opacity-90">
                              {normalized[openIdx].tagline}
                            </p>
                          ) : null}
                        </div>
                        <button
                          onClick={close}
                          aria-label="Close"
                          className="rounded-md p-1.5 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel/70"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="px-6 py-5 overflow-auto">
                      <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-4 text-[15px] md:text-base leading-6">
                        {(normalized[openIdx].items ?? []).map((it) => (
                          <li key={it} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}

Modules.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  )
};

Modules.defaultProps = { modules: [] };
