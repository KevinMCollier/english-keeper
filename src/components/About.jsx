import { useTranslation } from 'react-i18next';
import Timeline from './Timeline';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <section id="about" className="bg-white text-blue">
      <div className="container mx-auto flex px-5 pt-20 pb-10 md:flex-row flex-col items-start gap-10">
        {/* Avatar */}
        <div className="md:w-2/5 w-full flex flex-col items-center md:items-start">
          <img
            className="rounded-full w-56 h-56 object-cover shadow-md"
            src="/kevin-profile.jpg"
            alt={t('avatarAlt')}
            loading="lazy"
          />
        </div>

        {/* Prose */}
        <div className="md:w-3/5 w-full">
          <h2 className="font-mont font-bold text-2xl sm:text-3xl mb-4">{t('heading')}</h2>
          <p className="text-lg sm:text-xl leading-relaxed text-slate-800 mb-4">{t('credibility')}</p>
          <p className="text-lg sm:text-xl leading-relaxed text-slate-800 mb-4">{t('story')}</p>
          <p className="text-base sm:text-lg font-semibold text-slate-900">{t('mission')}</p>
        </div>
      </div>

      {/* Timeline injected here */}
      <div className="container mx-auto px-5 pb-20">
        <Timeline />
      </div>
    </section>
  );
}
