import { useTranslation, Trans } from 'react-i18next';
import LinkButton from './LinkButton';
import PoliciesAccordion from './Policies';

export default function Pricing() {
  const { t, i18n } = useTranslation('pricing');

  const items = (t('items', { returnObjects: true }) || []).filter(
    (i) => i.key !== 'corporate'
  );

  const packages = t('packages', { returnObjects: true }) || {};
  const packItems = packages.items || [];
  const membershipDetails = packages.membershipDetails || {};

  const table = t('table', { returnObjects: true }) || {};
  const corporate = t('corporate', { returnObjects: true }) || {};

  const promo = t('promo', { returnObjects: true }) || {};
  const location = t('location', { returnObjects: true }) || {};

  const policies = t('policies', { returnObjects: true }) || {};

  const mobileBtn =
    'inline-flex self-start w-auto min-w-[13rem] justify-center whitespace-nowrap text-sm py-2';

  const locale = (i18n.resolvedLanguage || i18n.language || 'en').toLowerCase();
  const promoSrc = locale.startsWith('ja') ? '/Promo_ja.jpg' : '/Promo_en.jpg';
  const promoAlt =
    promo.imageAlt || promo.ariaLabel || '20% off first private lesson';

  return (
    <section id="pricing" className="bg-white py-16 sm:py-20 font-body">
      <div className="mx-auto w-full max-w-3xl px-5">
        {/* Heading + promo */}
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <h2 className="text-midnight-navy font-display font-extrabold text-3xl sm:text-4xl leading-tight">
            {t('heading')}
          </h2>

          <aside
            className="w-[280px] sm:w-[320px]"
            aria-label={promo.ariaLabel || '20% off first private lesson'}
          >
            <img
              src={promoSrc}
              alt={promoAlt}
              className="block w-full"
              loading="lazy"
              width={640}
              height={360}
            />
          </aside>
        </div>

        {/* —— MOBILE VIEW —— */}
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
                  <dt className="text-graphite/60">{table.time}</dt>
                  <dd className="text-graphite">{i.duration?.trim() || '—'}</dd>
                </div>
                <div className="text-right">
                  <dt className="text-graphite/60">{table.price}</dt>
                  <dd className="text-midnight-navy font-medium">
                    {i.price?.trim() || '—'}
                  </dd>
                </div>
              </dl>
            </div>
          ))}

          {/* MOBILE: packages */}
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
                  <dt className="text-graphite/60">{table.time}</dt>
                  <dd className="text-graphite">{p.duration?.trim()}</dd>
                </div>
                <div className="text-right">
                  <dt className="text-graphite/60">{table.price}</dt>
                  <dd className="text-midnight-navy font-medium">
                    {p.price?.trim()}
                  </dd>
                </div>
              </dl>

              {p.unitPrice && (
                <p className="mt-1 text-xs text-graphite/70">{p.unitPrice}</p>
              )}

              {p.url && (
                <div className="mt-3">
                  <LinkButton
                    href={p.url}
                    label={p.buttonLabel || t('buttons.buy')}
                    color="caramel"
                    className={mobileBtn}
                  />
                </div>
              )}
            </div>
          ))}

          {/* MOBILE: Monthly Member details card */}
          {membershipDetails.heading && (
            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm border border-caramel/30">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center justify-center rounded-full bg-caramel/10 px-3 py-1 text-xs font-semibold text-caramel">
                  {membershipDetails.bubble}
                </span>
                <h4 className="font-display text-midnight-navy text-lg font-semibold">
                  {membershipDetails.heading}
                </h4>
              </div>

              {membershipDetails.tagline && (
                <p className="text-sm text-graphite mb-2">
                  {membershipDetails.tagline}
                </p>
              )}

              {membershipDetails.items?.length > 0 && (
                <ul className="mt-1 list-disc pl-5 text-sm text-graphite space-y-1">
                  {membershipDetails.items.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              )}

              {/* ⭐ MOBILE: Subscription Management Pill */}
              {membershipDetails.portalUrl && membershipDetails.portalLabel && (
                <div className="mt-3">
                  <a
                    href={membershipDetails.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-caramel bg-caramel/5 px-3 py-1 text-xs font-semibold text-caramel hover:bg-caramel hover:text-white transition"
                  >
                    <span>{membershipDetails.portalLabel}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
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
          )}
        </div>

        {/* —— DESKTOP VIEW —— */}
        <div className="hidden md:block bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[58%]" />
              <col className="w-[120px]" />
              <col className="w-[150px]" />
            </colgroup>
            <thead>
              <tr className="text-xs uppercase tracking-wide text-graphite/60">
                <th className="text-left pb-2">{table.session}</th>
                <th className="text-left pb-2">{table.time}</th>
                <th className="text-left pb-2">{table.price}</th>
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
                    {i.duration}
                  </td>
                  <td className="py-4 text-sm sm:text-base text-midnight-navy font-medium">
                    {i.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DESKTOP: Packages */}
        <div className="hidden md:block mt-6 bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
          {packages.heading && (
            <h3 className="mb-2 font-display text-midnight-navy text-2xl font-extrabold">
              {packages.heading}
            </h3>
          )}

          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[58%]" />
              <col className="w-[120px]" />
              <col className="w-[150px]" />
              <col className="w-[170px]" />
            </colgroup>

            <thead>
              <tr className="text-xs uppercase tracking-wide text-graphite/60">
                <th className="text-left pb-2">{table.session}</th>
                <th className="text-left pb-2">{table.time}</th>
                <th className="text-left pb-2">{table.price}</th>
                <th className="text-left pb-2">{packages.buy}</th>
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
                    {p.duration}
                  </td>

                  <td className="py-4 text-sm sm:text-base text-midnight-navy font-medium">
                    <div className="flex flex-col leading-tight">
                      <span>{p.price}</span>
                      {p.unitPrice && (
                        <span className="text-xs text-graphite/70 mt-0.5">
                          {p.unitPrice}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4">
                    {p.url && (
                      <LinkButton
                        href={p.url}
                        label={p.buttonLabel || t('buttons.buy')}
                        color="lemon"
                        className="w-full justify-center whitespace-nowrap"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* DESKTOP Monthly Member details */}
          {membershipDetails.heading && (
            <div className="mt-4 rounded-xl bg-white p-4 shadow-sm border border-caramel/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center justify-center rounded-full bg-caramel/10 px-3 py-1 text-xs font-semibold text-caramel">
                      {membershipDetails.bubble}
                    </span>
                    <h4 className="font-display text-midnight-navy text-lg font-semibold">
                      {membershipDetails.heading}
                    </h4>
                  </div>

                  {membershipDetails.tagline && (
                    <p className="text-sm text-graphite">
                      {membershipDetails.tagline}
                    </p>
                  )}
                </div>
              </div>

              {membershipDetails.items?.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-sm text-graphite space-y-1">
                  {membershipDetails.items.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              )}

              {/* ⭐ DESKTOP: Subscription Management Pill */}
              {membershipDetails.portalUrl && membershipDetails.portalLabel && (
                <div className="mt-3">
                  <a
                    href={membershipDetails.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-caramel bg-caramel/5 px-3 py-1 text-xs font-semibold text-caramel hover:bg-caramel hover:text-white transition"
                  >
                    <span>{membershipDetails.portalLabel}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
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
          )}
        </div>

        {/* Policies */}
        {(policies.heading ||
          (policies.sections && policies.sections.length)) && (
          <PoliciesAccordion policies={policies} />
        )}

        {/* Location */}
        <div className="mt-6 rounded-xl bg-white text-midnight-navy shadow-sm border border-gray-200">
          <div className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center">
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
                <path d="M12 22s7-5.33 7-12A7 7 0 0 0 5 10c0 6.67 7 12 7 12Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>

            <div className="flex-1">
              <div className="font-semibold text-base sm:text-lg">
                {location.title}
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

        {/* Corporate block */}
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
