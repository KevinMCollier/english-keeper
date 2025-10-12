import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Briefcase, Sprout, Coffee, BarChart3, X } from 'lucide-react';

const COLOR_BY_KEY = {
  business_comm: 'bg-[#E9B66A] text-midnight-navy',
  career_dev: 'bg-[#B8D9C0] text-midnight-navy',
  business_spec: 'bg-[#7C9AB0] text-white',
  everyday: 'bg-[#BED9F7] text-midnight-navy',
};

const ICON_BY_KEY = {
  business_comm: <Briefcase className="w-6 h-6" />,
  career_dev: <Sprout className="w-6 h-6" />,
  business_spec: <BarChart3 className="w-6 h-6" />,
  everyday: <Coffee className="w-6 h-6" />,
};

// Desktop order by stable keys
const ORDER = ['business_comm', 'career_dev', 'business_spec', 'everyday'];

export default function Modules({ modules }) {
  const { t } = useTranslation('sessions');
  const prefersReduced = useReducedMotion();

  // Normalize and order by key (fallback slug from title)
  const normalized = useMemo(() => {
    if (!Array.isArray(modules)) return [];
    const withKeys = modules.map((g) => ({
      ...g,
      key: g.key || String(g.title || '').toLowerCase().replace(/\s+/g, '_'),
    }));
    const byKey = Object.fromEntries(withKeys.map((g) => [g.key, g]));
    const ordered = ORDER.map((k) => byKey[k]).filter(Boolean);
    const leftovers = withKeys.filter((g) => !ORDER.includes(g.key));
    return [...ordered, ...leftovers];
  }, [modules]);

  // Mobile: filter pills
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTopics = useMemo(
    () => (normalized?.[activeIdx]?.items ?? []),
    [normalized, activeIdx]
  );

  // Desktop modal
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
          {t('modules.altTitle', { defaultValue: 'Popular Session Topics' })}
        </h3>
        <p className="mt-2 text-graphite">
          {t('modules.subheader', {
            defaultValue:
              'Choose topics that matter to you. Click a card to explore examples. Don’t see what you need? Reach out — chances are we can do it.',
          })}
        </p>
      </div>

      {/* Empty */}
      {!normalized.length ? (
        <div className="rounded-lg bg-white p-5 ring-1 ring-black/5 text-graphite">
          {t('modules.empty', { defaultValue: 'Topics will appear here soon.' })}
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
                    {m.title}
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-lg bg-white p-5 ring-1 ring-black/5">
              <h4 className="font-semibold text-lg mb-3">{normalized?.[activeIdx]?.title}</h4>
              <ul className="flex flex-wrap gap-2">
                {activeTopics.map((tpc) => (
                  <li key={tpc} className="rounded-full px-3 py-1 text-sm ring-1 ring-black/10 bg-white">
                    {tpc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop: cards with hover lift + underline */}
          <div className="hidden md:grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {normalized.map((m, i) => {
              const cardColor = COLOR_BY_KEY[m.key] ?? 'bg-white text-midnight-navy';
              return (
                <motion.button
                  key={m.key}
                  type="button"
                  onClick={() => setOpenIdx(i)}
                  className="group h-64 w-full rounded-lg ring-1 ring-black/5 shadow-sm relative text-left
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel/70
                             transition-transform duration-200 will-change-transform
                             hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                  layoutId={`module-card-${i}`}
                  transition={{ layout: { duration: 0.18, ease: 'easeInOut' } }}
                >
                  <div className={`absolute inset-0 ${cardColor} rounded-lg p-6 flex flex-col justify-center`}>
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true">{ICON_BY_KEY[m.key]}</span>
                      <span className="relative font-semibold text-lg">
                        {m.title}
                        <span
                          className="pointer-events-none absolute left-0 -bottom-1 h-0.5 w-full
                                     origin-left scale-x-0 bg-current opacity-60
                                     transition-transform duration-300 ease-out
                                     group-hover:scale-x-100"
                          aria-hidden="true"
                        />
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
                {/* Backdrop (still closes) */}
                <motion.div
                  key="backdrop"
                  className="fixed inset-0 z-40 bg-black/40"
                  onClick={close}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                />
                {/* Wrapper also closes on click */}
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
                  {/* Card: stop bubbling so inside clicks don't close */}
                  <motion.div
                    layoutId={`module-card-${openIdx}`}
                    transition={{ layout: { duration: 0.18, ease: 'easeInOut' } }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-3xl rounded-lg bg-white ring-1 ring-black/10 shadow-xl relative
                               min-h-[60vh] md:min-h-[60vh] max-h-[86vh] overflow-hidden flex flex-col"
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                    animate={
                      prefersReduced
                        ? { opacity: 1 }
                        : { opacity: 1, scale: 1, transition: { duration: 0.25 } }
                    }
                    exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                  >
                    {/* Colored header */}
                    <div
                      className={`rounded-t-lg px-6 py-4 ${
                        COLOR_BY_KEY[normalized[openIdx].key] ?? 'bg-gray-100 text-midnight-navy'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span aria-hidden="true">{ICON_BY_KEY[normalized[openIdx].key]}</span>
                          <h4 id={`module-modal-title-${openIdx}`} className="font-semibold text-xl">
                            {normalized[openIdx].title}
                          </h4>
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

                    {/* Body: ALWAYS two columns */}
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
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

Modules.defaultProps = { modules: [] };
