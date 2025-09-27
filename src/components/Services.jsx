import { Trans, useTranslation } from 'react-i18next';
import ScheduleButton from './ScheduleButton';

export default function Services() {
  const { t } = useTranslation('services');
  const { t: tc } = useTranslation('contact');

  const btn = (...c) =>
    `inline-block text-center text-base font-semibold px-6 py-2 rounded-lg transition ${c.join(' ')}`;

  const items = t('items', { returnObjects: true }) || [];
  const packages = t('packages', { returnObjects: true }) || [];            // NEW
  const packagesHeading = t('packagesHeading', { defaultValue: '' });       // NEW
  const packagesSub = t('packagesSub', { defaultValue: '' });               // NEW
  const studentBadge = t('studentBadge', { defaultValue: '' });             // NEW

  return (
    <section id="services" className="bg-creme py-20 font-body">
      <div className="container mx-auto px-5">

        <h2 className="font-display font-extrabold text-copper-rust text-3xl sm:text-5xl mb-4">
          {t('heading')}
        </h2>

        {/* Student discount pill (optional) */}
        {studentBadge && (
          <div className="mb-8">
            <span className="inline-block rounded-full bg-midnight-navy text-off-white text-sm px-3 py-1">
              {studentBadge}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items.map((i, idx) => (
            <div key={i.key} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-display font-extrabold text-midnight-navy text-2xl sm:text-3xl">
                {i.title}
              </h3>
              {i.price && <p className="mt-1 text-xl text-midnight-navy">{i.price}</p>}
              <p className="mt-2 text-graphite text-base sm:text-lg leading-relaxed">
                <Trans
                  i18nKey={`services.items.${idx}.desc`}
                  ns="services"
                  components={{ strong: <strong className="font-semibold" /> }}
                  defaults={i.desc}
                />
              </p>
            </div>
          ))}
        </div>

        {/* Packages (optional) */}
        {packages.length > 0 && (
          <div className="mt-14">
            {packagesHeading && (
              <h3 className="font-display font-extrabold text-midnight-navy text-2xl sm:text-3xl">
                {packagesHeading}
              </h3>
            )}
            {packagesSub && (
              <p className="mt-1 text-graphite">{packagesSub}</p>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {packages.map((p) => (
                <div key={p.key} className="rounded-2xl bg-white p-6 shadow-sm">
                  <h4 className="font-display font-extrabold text-midnight-navy text-xl sm:text-2xl">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-xl text-midnight-navy">{p.price}</p>
                  {p.note && <p className="mt-2 text-sm text-graphite/80">{p.note}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Row */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <p className="text-graphite text-base sm:text-lg">{t('ctaLine')} 👉</p>
          <ScheduleButton variant="solid" />
          <a
            href={tc('lineUrl')}
            className={btn('bg-copper-rust text-off-white', 'hover:bg-copper-rust/90')}
          >
            {tc('cta.line')}
          </a>
        </div>

        <p className="mt-6 text-sm text-graphite/80">{t('policy')}</p>
        <p className="mt-2 text-sm text-graphite/80">{t('corpHint')}</p>

        <p className="mt-2 text-sm text-graphite/80">
          <a
            href="https://kevin-collier.me"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-copper-rust"
          >
            Visit Collier Consulting for broader HR, management, and career support.
          </a>
        </p>


      </div>
    </section>
  );
}
