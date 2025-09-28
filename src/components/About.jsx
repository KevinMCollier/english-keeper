import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <section id="about" className="bg-white text-blue">
      <div className="container mx-auto flex px-5 pt-20 pb-20 md:flex-row flex-col items-center">
        {/* Photo + Highlights */}
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full mb-12 md:mb-0 flex flex-col items-center">
          <img
            className="rounded-full w-64 h-64 object-cover"
            src="/kevin-profile.jpg"
            alt="Kevin Collier profile"
            loading="lazy"
          />
          <ul className="list-disc w-64 mt-4 space-y-1 text-sm italic text-midnight-navy/80 text-left">
            <li>{t('highlights.experience')}</li>
            <li>{t('highlights.mba')}</li>
            <li>{t('highlights.focus')}</li>
          </ul>
        </div>

        {/* Narrative Copy */}
        <div className="lg:flex-grow md:w-1/2 flex flex-col sm:items-start">
          <h1 className="font-mont font-bold text-3xl sm:text-4xl mb-6">{t('heading')}</h1>
          <p className="max-w-[55ch] text-xl leading-relaxed mb-6 break-words">{t('credibility')}</p>
          <p className="max-w-[55ch] text-xl leading-relaxed mb-6 break-words [text-wrap:balance]">
            {t('story')}
          </p>
          <p className="text-lg font-semibold break-words">{t('mission')}</p>
        </div>
      </div>
    </section>
  );
}
