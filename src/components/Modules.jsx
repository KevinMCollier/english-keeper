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

/** ---------- Color & Icon maps ---------- */
const TOP_BY_KEY = {
  business_comm: 'bg-[#E9B66A]', // caramel
  career_adv:    'bg-[#B8D9C0]', // soft green
  leadership:    'bg-[#E8D9F1]', // lavender
  mba:           'bg-[#F0A074]', // terracota
  everyday:      'bg-[#BED9F7]'  // light blue
};

const TEXT_BY_KEY = {
  business_comm: 'text-midnight-navy',
  career_adv:    'text-midnight-navy',
  leadership:    'text-midnight-navy',
  mba:           'text-midnight-navy',
  everyday:      'text-midnight-navy'
};

const BOTTOM_LIGHT_BY_KEY = {
  business_comm: 'bg-[#F4D8AB]',
  career_adv:    'bg-[#D7EBDD]',
  leadership:    'bg-[#F4ECF9]',
  mba:           'bg-[#FBE2CD]',
  everyday:      'bg-[#D9EAFF]'
};

// Use white in the bottom section by default (set to false to use light tints)
const USE_WHITE_BOTTOM = false;

const ICON_COMPONENTS = {
  business_comm: Briefcase,
  career_adv:    Sprout,
  leadership:    Users,
  mba:           GraduationCap,
  everyday:      Coffee
};

const ORDER = ['business_comm', 'career_adv', 'leadership', 'mba', 'everyday'];

function TrackIcon({ k, className = '' }) {
  const Cmp = ICON_COMPONENTS[k];
  if (!Cmp) return <span className={`w-6 h-6 ${className}`}>•</span>;
  return <Cmp className={className} />;
}

export default function Modules({ modules }) {
  const { t } = useTranslation('sessions');
  const prefersReduced = useReducedMotion();

  const cleanTitle = (title) => title?.replace(/<0\s*\/>/g, '') ?? '';

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

  // Mobile pills
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTopics = useMemo(
    () => (normalized?.[activeIdx]?.items ?? []),
    [normalized, activeIdx]
  );

  // Desktop modal (JSX-safe: no type args)
  const [openIdx, setOpenIdx] = useState(null);
  const isOpen = openIdx !== null;
  const close = () => setOpenIdx(null);

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
          {/* -------- Mobile: pills + list -------- */}
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
                    <span aria-hidden="true">
                      <TrackIcon k={m.key} className="w-5 h-5" />
                    </span>
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

          {/* -------- Desktop: 5 rectangular two-tone cards in one row -------- */}
          <div className="hidden md:grid grid-cols-5 gap-4">
            {normalized.map((m, i) => {
              const top = TOP_BY_KEY[m.key] ?? 'bg-gray-200';
              const txt = TEXT_BY_KEY[m.key] ?? 'text-midnight-navy';
              const bottom = USE_WHITE_BOTTOM
                ? 'bg-white'
                : (BOTTOM_LIGHT_BY_KEY[m.key] ?? 'bg-gray-50');

              return (
                <motion.button
                  key={m.key}
                  type="button"
                  onClick={() => setOpenIdx(i)}
                  className="group w-full rounded-xl overflow-hidden ring-1 ring-black/5 shadow-sm text-left
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel/70
                            transition-transform duration-200 will-change-transform
                            hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                  layoutId={`module-card-${i}`}
                  transition={{ layout: { duration: 0.18, ease: 'easeInOut' } }}
                >
                  {/* CARD HEIGHT: rectangles, not squares */}
                  <div className="h-48 lg:h-80 flex flex-col">
                    {/* Top banner (1/3) */}
                    <div className={`flex-1 ${top} ${txt} grid place-items-center`}>
                      {/* HUGE icon */}
                      <TrackIcon
                        k={m.key}
                        className="w-[72px] h-[72px] lg:w-[72px] lg:h-[72px] opacity-95"
                      />
                    </div>
                    {/* Bottom content (2/3) */}
                    <div className={`flex-[2] ${bottom} ${txt} px-5 py-4 relative`}>
                      <div className="font-semibold text-base lg:text-lg leading-snug relative inline-block">
                        <Trans components={[<br key="br" />]}>{m.title}</Trans>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full
                                    origin-left scale-x-0 bg-current/70
                                    transition-transform duration-300 ease-out
                                    group-hover:scale-x-100"
                        />
                      </div>
                      {/* Subtle hover CTA */}
                      <div className="absolute left-5 bottom-3 text-xs opacity-0 group-hover:opacity-90 transition-opacity">
                        <span className="underline decoration-dotted">
                          {t('modules.cta.viewModules', { defaultValue: 'View module →' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* -------- Modal -------- */}
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
                        `${TOP_BY_KEY[normalized[openIdx].key] ?? 'bg-gray-100'} ${TEXT_BY_KEY[normalized[openIdx].key] ?? 'text-midnight-navy'}`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3">
                            <span aria-hidden="true">
                              <TrackIcon k={normalized[openIdx].key} className="w-6 h-6" />
                            </span>
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

TrackIcon.propTypes = {
  k: PropTypes.string.isRequired,
  className: PropTypes.string
};


Modules.defaultProps = { modules: [] };
