import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function SessionFlow({ stages }) {
  const [active, setActive] = useState(0);

  // refs for each step and the horizontal scroll rail
  const stepRefs = useRef([]);
  const railRef = useRef(null);
  const didMountRef = useRef(false);

  const goPrev = useCallback(() => setActive((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setActive((i) => Math.min(stages.length - 1, i + 1)),
    [stages.length]
  );

  // Keyboard navigation: ← →
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  // Keep active step centered by scrolling only the horizontal rail (not the page)
  useEffect(() => {
    const rail = railRef.current;
    const el = stepRefs.current[active];
    if (!rail || !el) return;

    // Skip on first render to prevent initial page jump
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const railRect = rail.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const current = rail.scrollLeft;
    const elCenter = elRect.left - railRect.left + current + elRect.width / 2;
    const targetLeft = Math.max(0, elCenter - rail.clientWidth / 2);

    rail.scrollTo({ left: targetLeft, behavior: 'smooth' });
  }, [active]);

  const fadeUp = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  };

  return (
    <div className="p-0">
      {/* Stepper: horizontal scroll on mobile; auto-scrolls within rail */}
      <div
        ref={railRef}
        className="-mx-2 mb-4 overflow-x-auto overflow-y-hidden py-1"
      >
        <ol
          className="px-2 flex items-center gap-4 whitespace-nowrap text-sm sm:text-lg"
          aria-label="Lesson flow steps"
        >
          {stages.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.key || s.title} className="flex items-center">
                <button
                  ref={(el) => (stepRefs.current[i] = el)}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex items-center focus:outline-none"
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span
                    className={[
                      'shrink-0 inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-1 ring-black/10 mr-2 text-xs sm:text-sm font-semibold transition',
                      isActive ? 'bg-caramel text-white' : 'bg-white text-gray-700',
                    ].join(' ')}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={[
                      'font-semibold transition underline-offset-4',
                      isActive
                        ? 'underline text-caramel'
                        : 'text-gray-700 group-hover:text-gray-900',
                    ].join(' ')}
                  >
                    {s.title}
                  </span>
                </button>
                {i < stages.length - 1 && (
                  <span aria-hidden className="ml-3 sm:ml-4 text-gray-400">→</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Row: [left arrow] [card] [right arrow] */}
      <div className="flex items-stretch">
        <div className="flex items-center justify-start w-9 md:w-11">
          {stages.length > 0 && active > 0 ? (
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous step"
              className="rounded-full bg-white ring-1 ring-black/10 shadow hover:bg-gray-50 p-2"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12.5 4.5L7 10l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <div className="w-9 md:w-11 h-9 md:h-11" />
          )}
        </div>

        <div className="w-full md:w-auto">
          {stages.length > 0 && (
            <motion.div
              key={stages[active].key || stages[active].title}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-white p-5 sm:p-7 pb-8 sm:pb-10 ring-1 ring-black/5 w-full md:w-auto md:max-w-[52rem] min-h-[300px] sm:min-h-[360px]"
            >
              <h3 className="font-display font-bold text-2xl sm:text-[2rem] mb-2 sm:mb-3 text-caramel">
                {stages[active].title}
              </h3>
              <div className="space-y-3 text-[15.5px] sm:text-[17px] leading-7">
                {(stages[active].body || []).map((line, i) => (
                  <p key={i} className="text-graphite">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-end w-9 md:w-11">
          {stages.length > 0 && active < stages.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              aria-label="Next step"
              className="rounded-full bg-white ring-1 ring-black/10 shadow hover:bg-gray-50 p-2"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M7.5 4.5L13 10l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <div className="w-9 md:w-11 h-9 md:h-11" />
          )}
        </div>
      </div>
    </div>
  );
}

SessionFlow.propTypes = {
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string.isRequired,
      body: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

SessionFlow.defaultProps = {
  stages: [],
};

export default SessionFlow;
