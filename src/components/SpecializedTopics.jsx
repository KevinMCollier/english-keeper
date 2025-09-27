import { Trans, useTranslation } from 'react-i18next';

export default function SpecializedTopics() {
  const { t } = useTranslation('specialized');
  const topics = t('items', { returnObjects: true }) || [];

  return (
    <section id="specialized" className="bg-creme py-16 font-body">
      <div className="container mx-auto px-5">
        {/* Heading + sub */}
        <div className="mb-10">
          <h2 className="font-display font-extrabold text-midnight-navy text-3xl sm:text-5xl">
            {t('heading')}
          </h2>
          {t('sub') && (
            <p className="mt-2 text-graphite text-base sm:text-lg">
              {t('sub')}
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, idx) => (
            <div key={topic.key ?? idx} className="rounded-2xl bg-white p-6 shadow-sm">
              {/* Icon / badge */}
              {topic.emoji && (
                <div className="text-3xl mb-3" aria-hidden>
                  {topic.emoji}
                </div>
              )}
              <h3 className="font-display font-extrabold text-midnight-navy text-xl sm:text-2xl">
                {topic.title}
              </h3>
              <p className="mt-2 text-graphite leading-relaxed">
                <Trans
                  i18nKey={`specialized.items.${idx}.desc`}
                  ns="specialized"
                  // Allows <0>highlight</0> placeholders in JSON
                  components={{ 0: <strong className="font-semibold" /> }}
                  defaults={topic.desc}
                />
              </p>
            </div>
          ))}
        </div>

        {/* Optional footer note */}
        {t('note') && (
          <p className="mt-6 text-sm text-graphite/80">
            {t('note')}
          </p>
        )}
      </div>
    </section>
  );
}
