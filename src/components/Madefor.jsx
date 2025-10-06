import { Trans, useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function MadeFor() {
  const { t } = useTranslation('madefor');

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.06 * i, duration: 0.4, ease: 'easeOut' },
    }),
  };
  const viewport = { once: false, amount: 0.3 };

  const PATHS = {
    meeting: '/meeting.jpg',
    everyday: '/everyday.jpg',
    student: '/student.jpg',
    study: '/study.jpg',
    friends: '/friends.jpg',
  };

  const useStudentImage = true;

  const grid = [
    { src: PATHS.meeting, pos: '50% 50%' },    // top left
    { src: PATHS.everyday, pos: '50% 65%' },   // top right (lower crop)
    { src: useStudentImage ? PATHS.student : PATHS.study, pos: '50% 50%' }, // bottom left
    { src: PATHS.friends, pos: '50% 65%' },    // bottom right (lower crop)
  ];

  const groups = [
    { key: 'pros', title: t('pros.title'), bullets: t('pros.bullets', { returnObjects: true }) || [] },
    { key: 'students', title: t('students.title'), bullets: t('students.bullets', { returnObjects: true }) || [] },
    { key: 'casual', title: t('casual.title'), bullets: t('casual.bullets', { returnObjects: true }) || [] }
  ];

  return (
    <section id="made-for" className="border-t border-white/10 bg-white text-midnight-navy font-body">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 py-16 sm:py-20">
        {/* Middle ground: left 5fr, right 4fr */}
        <div className="grid gap-10 md:gap-12 md:grid-cols-[5fr_4fr] md:items-start">
          {/* Left: slightly smaller images */}
          <div className="self-center">
            <div className="grid grid-cols-2 gap-3">
              {grid.map((item, i) => (
                <ImageTile
                  key={i}
                  src={item.src}
                  objectPosition={item.pos}
                  index={i}
                  fadeUp={fadeUp}
                  viewport={viewport}
                />
              ))}
            </div>
          </div>

          {/* Right: more breathing room */}
          <div className="space-y-6">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight"
            >
              {t('title')}
            </motion.h2>

            {groups.map((g, i) => (
              <motion.div
                key={g.key}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageTile({ src, objectPosition = '50% 50%', index = 0, fadeUp, viewport }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      custom={index}
      // smaller aspect ratio than before for middle ground
      className="aspect-[4/3] overflow-hidden bg-gray-200/70 ring-1 ring-black/5 shadow-sm"
    >
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        width={1000}
        height={750}
        style={{ objectPosition }}
        className={`h-full w-full object-cover transition-all duration-500 ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.02 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </motion.div>
  );
}

ImageTile.propTypes = {
  src: PropTypes.string.isRequired,
  objectPosition: PropTypes.string,
  index: PropTypes.number,
  fadeUp: PropTypes.object,
  viewport: PropTypes.object,
};
