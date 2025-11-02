// src/components/MadeForGrid.jsx
import { Trans, useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Current JPGs
import meeting_jpg from '../assets/meeting.jpg';
import everyday_jpg from '../assets/everyday.jpg';
import student_jpg from '../assets/student.jpg';
import friends_jpg from '../assets/friends.jpg';

export default function MadeForGrid() {
  const { t } = useTranslation('madefor');

  const IMAGES = [meeting_jpg, everyday_jpg, student_jpg, friends_jpg];

  // Light container animation only
  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  };

  // Detect proximity; only then hint the first image
  const gridRef = useRef(null);
  const nearView = useInView(gridRef, { once: true, margin: '200px', amount: 0.01 });

  // Preload ONLY the first tile WHEN near viewport (prevents stealing bandwidth on page load)
  useEffect(() => {
    if (!nearView) return;
    const href = IMAGES[0];
    const l = document.createElement('link');
    l.rel = 'preload';
    l.as = 'image';
    l.href = href;
    document.head.appendChild(l);
    return () => document.head.removeChild(l);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearView]);

  const SOURCES = {
    meeting: { jpg: meeting_jpg },
    everyday: { jpg: everyday_jpg },
    student: { jpg: student_jpg },
    friends: { jpg: friends_jpg },
  };

  const grid = [
    { key: 'meeting', pos: '50% 50%' },
    { key: 'everyday', pos: '50% 65%' },
    { key: 'student', pos: '50% 50%' },
    { key: 'friends', pos: '50% 65%' },
  ];

  const groups = [
    { key: 'pros', title: t('pros.title'), bullets: t('pros.bullets', { returnObjects: true }) || [] },
    { key: 'students', title: t('students.title'), bullets: t('students.bullets', { returnObjects: true }) || [] },
    { key: 'casual', title: t('casual.title'), bullets: t('casual.bullets', { returnObjects: true }) || [] },
  ];

  return (
    <section id="made-for" className="border-t border-white/10 bg-white text-midnight-navy font-body">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 py-16 sm:py-20">
        <div className="grid gap-10 md:gap-12 md:grid-cols-[5fr_4fr] md:items-start">
          {/* Left: image grid */}
          <motion.div
            ref={gridRef}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="self-center"
          >
            <div className="grid grid-cols-2 gap-3">
              {grid.map((item, i) => (
                <ImageTile
                  key={i}
                  sources={SOURCES[item.key]}
                  objectPosition={item.pos}
                  // First tile: eager once near view; others lazy
                  eager={nearView && i === 0}
                  // Delay decode/paint a bit per tile to avoid a single big spike
                  delayMs={i * 60}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-6"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
              {t('title')}
            </h2>

            {groups.map((g) => (
              <div key={g.key}>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-caramel mb-2">
                  {g.title}
                </h3>
                <ul className="ml-4 list-disc space-y-1.5 text-graphite">
                  {g.bullets.map((_, j) => (
                    <li key={j}>
                      <Trans i18nKey={`${g.key}.bullets.${j}`} ns="madefor" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ImageTile({ sources, objectPosition = '50% 50%', eager = false, delayMs = 0 }) {
  const [loaded, setLoaded] = useState(false);

  // Slight decode defer to stagger work (no layout shift due to fixed aspect)
  const [shouldLoad, setShouldLoad] = useState(eager);
  useEffect(() => {
    if (eager && !shouldLoad) setShouldLoad(true);
    if (!eager && !shouldLoad) {
      const id = setTimeout(() => setShouldLoad(true), delayMs);
      return () => clearTimeout(id);
    }
  }, [eager, delayMs, shouldLoad]);

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden ring-1 ring-black/5 shadow-sm"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '300px 225px' }}
    >
      {shouldLoad && (
        <img
          src={sources.jpg}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          width={1200}
          height={900}
          // conservative sizes; adjust if your grid grows larger
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          style={{ objectPosition }}
          className={`h-full w-full object-cover transform-gpu transition-opacity duration-250 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}

ImageTile.propTypes = {
  sources: PropTypes.shape({
    jpg: PropTypes.string.isRequired,
    webp: PropTypes.string,
    avif: PropTypes.string,
  }).isRequired,
  objectPosition: PropTypes.string,
  eager: PropTypes.bool,
  delayMs: PropTypes.number,
};
