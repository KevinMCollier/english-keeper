import { useTranslation, Trans } from 'react-i18next';
import CalendlyButton from './CalendlyButton';
import LinkButton from './LinkButton';
import PoliciesAccordion from './Policies';

export default function Pricing() {
  const { t } = useTranslation('pricing');

  const items = (t('items', { returnObjects: true }) || []).filter(
    (i) => i.key !== 'corporate'
  );

  // NEW: packages table data
  const packages = t('packages', { returnObjects: true }) || {};
  const packItems = packages.items || [];

  const table = t('table', { returnObjects: true }) || {};
  // const notes = t('notes', { returnObjects: true }) || {};
  const corporate = t('corporate', { returnObjects: true }) || {};

  // NEW: pull promo + location strings from i18n
  const promo = t('promo', { returnObjects: true }) || {};
  const location = t('location', { returnObjects: true }) || {};

  // NEW: policies & notes block
  const policies = t('policies', { returnObjects: true }) || {};

  // Consistent mobile button width without full-width stretch
  const mobileBtn =
    'inline-flex self-start w-auto min-w-[13rem] justify-center whitespace-nowrap text-sm py-2';

  return (
    <section id="pricing" className="bg-white py-16 sm:py-20 font-body">
      <div className="mx-auto w-full max-w-3xl px-5">

        {/* Heading + Promo (compact ticket) */}
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <h2 className="text-midnight-navy font-display font-extrabold text-3xl sm:text-4xl leading-tight">
            {t('heading')}
          </h2>

          <aside
            className="
              w-[280px] sm:w-[320px]
              rounded-2xl border border-orange/30 bg-orange text-white shadow-sm
              px-4 py-3
            "
            aria-label={promo.ariaLabel || '20% off first private lesson'}
          >
            <p className="font-display font-normal leading-snug text-base sm:text-xl">
              {promo.headlineTop || '20% OFF first 1:1 lesson'}
              <br />
              <span className="font-normal">
                {promo.headlineBottom || '(online or in-person)'}
              </span>
            </p>
            <p className="mt-1 text-[14px] leading-4 opacity-95">
              {promo.finePrint || 'One time use only. Not valid for group lessons.'}
            </p>
          </aside>
        </div>

        {/* —— MOBILE CARDS (<= md) —— */}
        <div className="md:hidden space-y-3">
          {items.map((i) => (
            <div
              key={i.key}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="font-display text-midnight-navy text-lg font-semibold break-words">
                {i.title}
              </div>

              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div>
                  <dt className="text-graphite/60">{table.time || 'Time'}</dt>
                  <dd className="text-graphite">{i.duration?.trim() || '—'}</dd>
                </div>
                <div className="text-right">
                  <dt className="text-graphite/60">{table.price || 'Price'}</dt>
                  <dd className="text-midnight-navy font-medium">
                    {i.price?.trim() || '—'}
                  </dd>
                </div>
              </dl>

              {i.key === 'group80' ? (
                <div className="mt-3">
                  <CalendlyButton
                    url="#"
                    label={t('buttons.comingSoon', 'Coming soon')}
                    disabled
                    disabledClassName="bg-[#E2B985] hover:bg-[#E2B985] text-white"
                    className={mobileBtn}
                  />
                </div>
              ) : (
                i.url?.trim() && (
                  <div className="mt-3">
                    <CalendlyButton
                      url={i.url}
                      label={
                        i.key === 'freetrial'
                          ? t('buttons.bookFreeTrial', 'Book Free Trial')
                          : i.key === 'online50'
                          ? t('buttons.bookOnline', 'Book 1:1 Online')
                          : i.key === 'inperson'
                          ? t('buttons.bookInPerson', 'Book 1:1 In-Person')
                          : t('buttons.book', 'Book')
                      }
                      color={i.key === 'freetrial' ? 'lemon' : 'caramel'}
                      className={mobileBtn}
                    />
                  </div>
                )
              )}
            </div>
          ))}

          {/* NEW — Packages as mobile cards */}
          {packages.heading && (
            <h3 className="mt-6 mb-2 font-display text-midnight-navy text-2xl font-extrabold">
              {packages.heading}
            </h3>
          )}
          {packItems.map((p) => (
            <div
              key={p.key}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="font-display text-midnight-navy text-lg font-semibold break-words">
                {p.title}
              </div>

              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div>
                  <dt className="text-graphite/60">{table.time || 'Time'}</dt>
                  <dd className="text-graphite">{p.duration?.trim() || '—'}</dd>
                </div>
                <div className="text-right">
                  <dt className="text-graphite/60">{table.price || 'Price'}</dt>
                  <dd className="text-midnight-navy font-medium">
                    {p.price?.trim() || '—'}
                  </dd>
                </div>
              </dl>

              {p.url?.trim() && (
                <div className="mt-3">
                  <LinkButton
                    href={p.url}
                    label={p.buttonLabel || t('buttons.buy', 'Buy')}
                    color="caramel"
                    className={mobileBtn}
                  />
                </div>
              )}
            </div>
          ))}

          {packages.ctaPurchased?.text && (
            <div className="mt-4 rounded-xl bg-white p-4 shadow-sm border border-gray-200">
              <p className="text-sm text-midnight-navy font-semibold">
                {packages.ctaPurchased.text}
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {packages.ctaPurchased.onlineUrl && (
                  <CalendlyButton
                    url={packages.ctaPurchased.onlineUrl}
                    label={packages.ctaPurchased.onlineLabel || 'Online (Package Holders)'}
                    color="lemon"
                    className={mobileBtn}
                  />
                )}
                {packages.ctaPurchased.inpersonUrl && (
                  <CalendlyButton
                    url={packages.ctaPurchased.inpersonUrl}
                    label={packages.ctaPurchased.inpersonLabel || 'In-Person (Package Holders)'}
                    color="lemon"
                    className={mobileBtn}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* —— DESKTOP TABLE (md+) —— */}
        <div className="hidden md:block bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[55%] sm:w-[58%]" />
              <col className="w-[110px]" />
              <col className="w-[150px]" />
              <col className="w-[170px]" />
            </colgroup>
            <thead>
              <tr className="text-xs uppercase tracking-wide text-graphite/60">
                <th className="text-left pb-2">{table.session || 'Session'}</th>
                <th className="text-left pb-2">{table.time || 'Time'}</th>
                <th className="text-left pb-2">{table.price || 'Price'}</th>
                <th className="text-left pb-2">{table.book || 'Book'}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
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
                    {i.key === 'group80' ? (
                      <CalendlyButton
                        url="#"
                        label={t('buttons.comingSoon', 'Coming soon')}
                        disabled
                        disabledClassName="bg-[#E2B985] hover:bg-[#E2B985] text-white"
                        className="w-full justify-center whitespace-nowrap"
                      />
                    ) : (
                      i.url?.trim() && (
                        <CalendlyButton
                          url={i.url}
                          label={
                            i.key === 'freetrial'
                              ? t('buttons.bookFreeTrial', 'Book Free Trial')
                              : i.key === 'online50'
                              ? t('buttons.bookOnline', 'Book 1:1 Online')
                              : i.key === 'inperson'
                              ? t('buttons.bookInPerson', 'Book 1:1 In-Person')
                              : t('buttons.book', 'Book')
                          }
                          color={i.key === 'freetrial' ? 'lemon' : 'caramel'}
                          className="w-full justify-center whitespace-nowrap"
                        />
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* —— PACKAGES TABLE (md+) —— */}
        <div className="hidden md:block mt-6 bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
          {packages.heading && (
            <h3 className="mb-2 font-display text-midnight-navy text-2xl font-extrabold">
              {packages.heading}
            </h3>
          )}
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[55%] sm:w-[58%]" />
              <col className="w-[110px]" />
              <col className="w-[150px]" />
              <col className="w-[170px]" />
            </colgroup>
            <thead>
              <tr className="text-xs uppercase tracking-wide text-graphite/60">
                <th className="text-left pb-2">{table.session || 'Session'}</th>
                <th className="text-left pb-2">{table.time || 'Time'}</th>
                <th className="text-left pb-2">{table.price || 'Price'}</th>
                <th className="text-left pb-2">{packages.buy || 'Buy'}</th>
              </tr>
            </thead>
            <tbody>
              {packItems.map((p) => (
                <tr
                  key={p.key}
                  className="border-t first:border-t-0 border-gray-200/70 align-middle"
                >
                  <td className="py-4">
                    <span className="font-display text-midnight-navy text-base sm:text-lg font-semibold">
                      {p.title}
                    </span>
                  </td>
                  <td className="py-4 text-sm sm:text-base text-graphite">
                    {p.duration?.trim() || '—'}
                  </td>
                  {/* UPDATED PRICE CELL */}
                  <td className="py-4 text-sm sm:text-base font-medium text-midnight-navy align-middle">
                    <div className="flex flex-col leading-tight">
                      <span>{p.price?.trim() || '—'}</span>
                      {p.unitPrice && (
                        <span className="text-xs text-graphite/70 mt-0.5">
                          {p.unitPrice}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    {p.url?.trim() && (
                      <LinkButton
                        href={p.url}
                        label={p.buttonLabel || t('buttons.buy', 'Buy')}
                        color="lemon"
                        className="w-full justify-center whitespace-nowrap"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {packages.ctaPurchased?.text && (
            <div className="mt-4 rounded-xl bg-white p-4 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-midnight-navy font-semibold">
                  {packages.ctaPurchased.text}
                </p>
                <div className="flex gap-2">
                  {packages.ctaPurchased.onlineUrl && (
                    <CalendlyButton
                      url={packages.ctaPurchased.onlineUrl}
                      label={packages.ctaPurchased.onlineLabel || 'Book 1:1 Online'}
                      color="caramel"
                      className="whitespace-nowrap"
                    />
                  )}
                  {packages.ctaPurchased.inpersonUrl && (
                    <CalendlyButton
                      url={packages.ctaPurchased.inpersonUrl}
                      label={packages.ctaPurchased.inpersonLabel || 'Book 1:1 In-Person'}
                      color="caramel"
                      className="whitespace-nowrap"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* —— POLICIES & NOTES (Accordion) —— */}
        {(policies.heading || (policies.sections && policies.sections.length)) && (
          <PoliciesAccordion policies={policies} />
        )}


        {/* —— Location Info —— */}
        <div className="mt-6 rounded-xl bg-white text-midnight-navy shadow-sm border border-gray-200">
          <div className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center">
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-midnight-navy/10"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-midnight-navy"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s7-5.33 7-12A7 7 0 0 0 5 10c0 6.67 7 12 7 12Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div className="flex-1">
              <div className="font-semibold text-base sm:text-lg">
                {location.title || 'Location Info'}
              </div>
              <p className="mt-0.5 text-sm sm:text-base leading-relaxed text-graphite">
                <Trans
                  i18nKey="location.body"
                  ns="pricing"
                  components={{ strong: <strong className="font-semibold" /> }}
                />
              </p>
            </div>
          </div>
        </div>

        {/* —— Corporate callout —— */}
        {(corporate.title || corporate.body) && (
          <div className="mt-6 rounded-xl bg-white text-midnight-navy shadow-sm border border-gray-200">
            <div className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3 flex-1">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-midnight-navy/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-midnight-navy"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 7h18v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7Z" />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </span>
                <div>
                  <div className="font-semibold text-base sm:text-lg">
                    {corporate.title}
                  </div>
                  {corporate.body && (
                    <p className="mt-0.5 text-sm sm:text-base leading-relaxed">
                      {corporate.body}
                    </p>
                  )}
                </div>
              </div>
              {corporate.linkUrl && corporate.linkLabel && (
                <div className="sm:ml-auto">
                  <a
                    href={corporate.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-sea-mist text-white font-semibold hover:opacity-90 transition"
                  >
                    {corporate.linkLabel}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
