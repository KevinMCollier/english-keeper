import { useTranslation, Trans } from 'react-i18next';
import ServiceButton from './ServiceButton';

export default function Pricing() {
  const { t } = useTranslation('pricing');

  const items = (t('items', { returnObjects: true }) || []).filter(
    (i) => i.key !== 'corporate'
  );

  const table = t('table', { returnObjects: true }) || {};
  const notes = t('notes', { returnObjects: true }) || {};
  const corporate = t('corporate', { returnObjects: true }) || {};

  // ---- Helpers to compute 20% off for private 1:1 ----
  const getItem = (key) => items.find((i) => i.key === key);
  const parseYen = (s) => {
    if (!s) return null;
    const digits = String(s).replace(/[^\d]/g, '');
    return digits ? Number(digits) : null;
  };
  const formatYen = (n) =>
    `¥${(Math.round(n) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

  const INPERSON_PRICE = parseYen(getItem('inperson')?.price);
  const ONLINE_PRICE = parseYen(getItem('online50')?.price);
  const RATE = 0.2;

  const inpersonDiscounted = INPERSON_PRICE ? INPERSON_PRICE * (1 - RATE) : null; // 4800
  const onlineDiscounted = ONLINE_PRICE ? ONLINE_PRICE * (1 - RATE) : null; // 3200

  return (
    <section id="pricing" className="bg-white py-16 sm:py-20 font-body">
      <div className="mx-auto w-full max-w-3xl px-5">

      {/* Heading + Promo (compact ticket) */}
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          {/* Title */}
          <h2 className="text-midnight-navy font-display font-extrabold text-3xl sm:text-4xl leading-tight">
            {t('heading')}
          </h2>

          {/* Ticket card — narrower & shorter */}
          <aside
            className="
              relative overflow-hidden
              rounded-2xl border border-orange/25 bg-white shadow-sm
              md:w-[360px] lg:w-[400px]
            "
            aria-label="20% off first private lesson"
          >
            {/* Left strip (narrower) */}
            <div
              className="
                absolute inset-y-0 left-0 w-20
                bg-orange/95 text-white
                flex items-center justify-center
                font-extrabold tracking-wide
              "
            >
              <span className="text-base">20% OFF</span>
            </div>

            {/* Content (tighter padding) */}
            <div className="pl-24 pr-3 py-2">
              <dl className="mt-0.5 space-y-1">
                {/* 1:1 In-Person */}
                <div className="grid grid-cols-[1fr,auto] items-center gap-x-2">
                  <dt className="font-semibold text-midnight-navy leading-tight">
                    1:1 In-Person
                  </dt>
                  <dd className="text-right leading-tight">
                    {INPERSON_PRICE ? (
                      <>
                        <span className="text-graphite/50 line-through mr-1 text-[13px] align-middle">
                          {formatYen(INPERSON_PRICE)}
                        </span>
                        <span className="font-extrabold text-midnight-navy text-lg align-middle">
                          {formatYen(inpersonDiscounted)}
                        </span>
                      </>
                    ) : (
                      <span className="text-graphite/60">—</span>
                    )}
                  </dd>
                </div>

                {/* 1:1 Online */}
                <div className="grid grid-cols-[1fr,auto] items-center gap-x-2">
                  <dt className="font-semibold text-midnight-navy leading-tight">
                    1:1 Online
                  </dt>
                  <dd className="text-right leading-tight">
                    {ONLINE_PRICE ? (
                      <>
                        <span className="text-graphite/50 line-through mr-1 text-[13px] align-middle">
                          {formatYen(ONLINE_PRICE)}
                        </span>
                        <span className="font-extrabold text-midnight-navy text-lg align-middle">
                          {formatYen(onlineDiscounted)}
                        </span>
                      </>
                    ) : (
                      <span className="text-graphite/60">—</span>
                    )}
                  </dd>
                </div>
              </dl>

              {/* Fine print (kept compact) */}
              <p className="mt-1 text-[11px] leading-4 text-graphite/70">
                Not valid for group lessons.
              </p>
            </div>
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
                  <ServiceButton
                    url="#"
                    label="Coming soon"
                    disabled
                    disabledClassName="bg-[#E2B985] hover:bg-[#E2B985] text-white"
                    className="w-full justify-center whitespace-nowrap text-sm py-2"
                  />
                </div>
              ) : (
                i.url?.trim() && (
                  <div className="mt-3">
                    <ServiceButton
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
                      className="w-full justify-center whitespace-nowrap text-sm py-2"
                    />
                  </div>
                )
              )}
            </div>
          ))}
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
                      <ServiceButton
                        url="#"
                        label="Coming soon"
                        disabled
                        disabledClassName="bg-[#E2B985] hover:bg-[#E2B985] text-white"
                        className="w-full justify-center whitespace-nowrap"
                      />
                    ) : (
                      i.url?.trim() && (
                        <ServiceButton
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

          {/* Notes */}
          <div className="mt-4 space-y-1 text-xs text-graphite/80">
            {notes.prices && <p>{notes.prices}</p>}
            {notes.locations && <p>{notes.locations}</p>}
            {/* New discount note (i18n-backed if provided) */}
            <p>{notes.discount || '※ 20% first-lesson discount applies to private 1:1 sessions (online & in-person) only; not valid for group sessions.'}</p>
            {notes.cancellation && (
              <p>
                <Trans
                  i18nKey="notes.cancellation"
                  ns="pricing"
                  components={[
                    <strong key="b1" />,
                    <strong key="b2" />,
                    <strong key="b3" />,
                    <strong key="b4" />
                  ]}
                />
              </p>
            )}
          </div>
        </div>

{/* —— Location Info (styled like Corporate card) —— */}
<div className="mt-6 rounded-xl bg-white text-midnight-navy shadow-sm border border-gray-200">
  <div className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center">
    {/* Icon */}
    <span
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-midnight-navy/10"
      aria-hidden="true"
    >
      {/* Map-pin icon */}
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

    {/* Text */}
    <div className="flex-1">
      <div className="font-semibold text-base sm:text-lg">Location Info</div>
      <p className="mt-0.5 text-sm sm:text-base leading-relaxed text-graphite">
        In-person sessions currently available in <strong>Jiyugaoka</strong>, <strong>Omori</strong>,
        <strong> Oimachi</strong>, <strong>Shinagawa</strong>, and <strong>Gotanda</strong> upon request.
      </p>
      {/* Future headbase note (uncomment when ready) */}
      {/*
      <p className="mt-1.5 text-xs text-graphite/80 italic">
        In-person sessions located at <strong>___ Building</strong> at <strong>___ Station</strong> (___ Line).
      </p>
      */}
    </div>
  </div>
</div>


        {/* —— Corporate callout —— */}
        {(corporate.title || corporate.body) && (
          <div className="mt-6 rounded-xl bg-white text-midnight-navy shadow-sm border border-gray-200">
            <div className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3 flex-1">
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
