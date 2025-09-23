import { Trans, useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation('services');
  const { t: tc } = useTranslation('contact');

  const btn = (...c) =>
    `inline-block text-center text-base font-semibold px-6 py-2 rounded-lg transition ${c.join(' ')}`;

  const items = t('items', { returnObjects: true }) || [];

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="services" className="bg-creme py-20">
      <div className="container mx-auto px-5">
        <h2 className="font-mont font-black text-copper-rust text-3xl sm:text-5xl mb-10">
          {t('heading')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items.map((i) => (
            <div key={i.key} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-mont font-extrabold text-midnight-navy text-2xl sm:text-3xl">
                {i.title}
              </h3>
              <p className="mt-1 text-xl text-midnight-navy">{i.price}</p>
              <p className="mt-2 text-graphite text-base sm:text-lg leading-relaxed">
                <Trans
                  i18nKey={`services.items.${i.key}.desc`}
                  components={{ strong: <strong className="font-bold" /> }}
                />
              </p>
              {i.note && <p className="mt-2 text-sm text-graphite/80">{i.note}</p>}
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3">
          <p className="text-graphite text-base sm:text-lg">{t('ctaLine')} 👉</p>
          <a
            href={tc('lineUrl')}
            className={btn('bg-copper-rust text-off-white', 'hover:bg-copper-rust/90')}
          >
            {tc('cta.line')}
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className={btn('border border-midnight-navy text-midnight-navy hover:bg-white')}
          >
            {tc('cta.contact')}
          </button>
        </div>

        <p className="mt-6 text-sm text-graphite/80">
          {t('policy')}
        </p>

        <p className="mt-2 text-sm text-graphite/80">
          {t('corpHint')}
        </p>
      </div>
    </section>
  );
}
