import { useTranslation, Trans } from 'react-i18next';
import CalendlyButton from './CalendlyButton';

export default function Scheduling() {
  const { t } = useTranslation('scheduling');

  const table = t('table', { returnObjects: true }) || {};
  const buttons = t('buttons', { returnObjects: true }) || {};
  const single = t('single', { returnObjects: true }) || {};
  const singleItems = single.items || [];
  const packages = t('packages', { returnObjects: true }) || {};

  const mobileBtn =
    'inline-flex self-start w-auto min-w-[13rem] justify-center whitespace-nowrap text-sm py-2';

  const labelFor = (key) => {
    if (key === 'freeconsult15')
      return buttons.bookFreeConsult15 || 'Book Free Consultation';
    if (key === 'standard60')
      return buttons.bookStandard || 'Book Standard Session';
    if (key === 'compact30')
      return buttons.bookCompact || 'Book Compact Session';
    return buttons.book || 'Book';
  };

  return (
    <section id="schedule" className="bg-white py-16 sm:py-20 font-body">
      <div className="mx-auto w-full max-w-3xl px-5">
        <div className="mb-5">
          <h2 className="text-midnight-navy font-display font-extrabold text-3xl sm:text-4xl leading-tight">
            {t('heading')}
          </h2>
          {t('intro') && (
            <p className="mt-2 text-sm sm:text-base text-graphite leading-relaxed">
              {t('intro')}
            </p>
          )}
        </div>

        {/* —— MOBILE: cards —— */}
        <div className="md:hidden space-y-4">
          {/* Single sessions */}
          {single.heading && (
            <h3 className="font-display text-midnight-navy text-2xl font-extrabold">
              {single.heading}
            </h3>
          )}
          {singleItems.map((i) => (
            <div
              key={i.key}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="font-display text-midnight-navy text-lg font-semibold break-words">
                {i.title}
              </div>

              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div>
                  <dt className="text-graphite/60">
                    {table.time || 'Time'}
                  </dt>
                  <dd className="text-graphite">
                    {i.duration?.trim() || '—'}
                  </dd>
                </div>
                <div className="text-right">
                  <dt className="text-graphite/60">
                    {table.price || 'Price'}
                  </dt>
                  <dd className="text-midnight-navy font-medium">
                    {i.price?.trim() || '—'}
                  </dd>
                </div>
              </dl>

              {i.url?.trim() && (
                <div className="mt-3">
                  <CalendlyButton
                    url={i.url}
                    label={labelFor(i.key)}
                    color="caramel"
                    className={mobileBtn}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Packages / members scheduling */}
          {(packages.text || packages.standardUrl || packages.compactUrl) && (
            <div className="mt-4 rounded-xl bg-white p-4 shadow-sm border border-gray-200">
              {packages.heading && (
                <h3 className="font-display text-midnight-navy text-lg font-semibold mb-1">
                  <Trans
                    i18nKey="packages.heading"
                    ns="scheduling"
                    components={[<br key="br" />]}
                  />
                </h3>
              )}
              {packages.text && (
                <p className="text-sm text-graphite mb-2">
                  <Trans
                    i18nKey="packages.text"
                    ns="scheduling"
                    components={[<br key="br" />]}
                  />
                </p>
              )}
              <div className="flex flex-col gap-2">
                {packages.standardUrl && (
                  <CalendlyButton
                    url={packages.standardUrl}
                    label={
                      packages.standardLabel ||
                      'Schedule Standard Session (Package / Member)'
                    }
                    color="lemon"
                    className={mobileBtn}
                  />
                )}
                {packages.compactUrl && (
                  <CalendlyButton
                    url={packages.compactUrl}
                    label={
                      packages.compactLabel ||
                      'Schedule Compact Session (Package / Member)'
                    }
                    color="lemon"
                    className={mobileBtn}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* —— DESKTOP: table + package/member CTA —— */}
        <div className="hidden md:block bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
          {single.heading && (
            <h3 className="mb-2 font-display text-midnight-navy text-2xl font-extrabold">
              {single.heading}
            </h3>
          )}
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[55%]" />
            <col className="w-[110px]" />
              <col className="w-[120px]" />
              <col className="w-[170px]" />
            </colgroup>
            <thead>
              <tr className="text-xs uppercase tracking-wide text-graphite/60">
                <th className="text-left pb-2">
                  {table.session || 'Session'}
                </th>
                <th className="text-left pb-2">{table.time || 'Time'}</th>
                <th className="text-left pb-2">{table.price || 'Price'}</th>
                <th className="text-left pb-2">{table.book || 'Book'}</th>
              </tr>
            </thead>
            <tbody>
              {singleItems.map((i) => (
                <tr
                  key={i.key}
                  className="border-t first:border-t-0 border-gray-200/70 align-middle"
                >
                  <td className="py-4">
                    <span className="font-display text-midnight-navy text-base sm:text-lg font-semibold">
                      {i.title}
                    </span>
                  </td>
                  <td className="py-4 text-sm sm:text-base text-graphite">
                    {i.duration?.trim() || '—'}
                  </td>
                  <td className="py-4 text-sm sm:text-base font-medium text-midnight-navy">
                    {i.price?.trim() || '—'}
                  </td>
                  <td className="py-4">
                    {i.url?.trim() && (
                      <CalendlyButton
                        url={i.url}
                        label={labelFor(i.key)}
                        color="caramel"
                        className="w-full justify-center whitespace-nowrap"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Desktop: Packages / member CTA card */}
        {(packages.text || packages.standardUrl || packages.compactUrl) && (
          <div className="hidden md:block mt-6 rounded-xl bg-white p-5 shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
              <div className="sm:flex-[3]">
                {packages.heading && (
                  <h3 className="font-display text-midnight-navy text-xl font-semibold mb-1">
                    <Trans
                      i18nKey="packages.heading"
                      ns="scheduling"
                      components={[<br key="br" />]}
                    />
                  </h3>
                )}
                {packages.text && (
                  <p className="text-sm sm:text-base text-graphite">
                    <Trans
                      i18nKey="packages.text"
                      ns="scheduling"
                      components={[<br key="br" />]}
                    />
                  </p>
                )}
              </div>
              <div className="sm:flex-[2] flex gap-2 flex-wrap justify-end">
                {packages.standardUrl && (
                  <CalendlyButton
                    url={packages.standardUrl}
                    label={
                      packages.standardLabel ||
                      'Schedule Standard Session (Package / Member)'
                    }
                    color="caramel"
                    className="w-full sm:w-72 justify-center text-sm leading-snug text-center px-3"
                  />
                )}
                {packages.compactUrl && (
                  <CalendlyButton
                    url={packages.compactUrl}
                    label={
                      packages.compactLabel ||
                      'Schedule Compact Session (Package / Member)'
                    }
                    color="caramel"
                    className="w-full sm:w-72 justify-center text-sm leading-snug text-center px-3"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
