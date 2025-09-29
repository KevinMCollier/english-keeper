// src/components/Sessions.jsx
import { useTranslation, Trans } from 'react-i18next';
import ServiceButton from './ServiceButton';

export default function Sessions() {
  const { t } = useTranslation('sessions');

  const items = (t('items', { returnObjects: true }) || []).filter(
    (i) => i.key !== 'corporate'
  );

  const table = t('table', { returnObjects: true }) || {};
  const notes = t('notes', { returnObjects: true }) || {};
  const corporate = t('corporate', { returnObjects: true }) || {};

  return (
    <section id="sessions" className="bg-creme py-16 sm:py-20 font-body">
      <div className="mx-auto w-full max-w-3xl px-5">
        <h2 className="text-midnight-navy font-display font-extrabold text-2xl sm:text-3xl mb-5">
          {t('heading')}
        </h2>

        {/* SESSIONS & PRICING TABLE */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
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
                    {i.url?.trim() && (
                      <ServiceButton
                        url={i.url}
                        label={
                          i.key === 'freetrial'
                            ? t('buttons.bookFreeTrial', 'Book Free Trial')
                            : i.key === 'online50'
                            ? t('buttons.bookOnline', 'Book 1:1 Online')
                            : i.key === 'inperson'
                            ? t('buttons.bookInPerson', 'Book 1:1 In-Person')
                            : i.key === 'group80'
                            ? t('buttons.bookGroup', 'Book Group')
                            : t('buttons.book', 'Book')
                        }
                        color={i.key === 'freetrial' ? 'lemon' : 'caramel'}
                        className="w-full justify-center whitespace-nowrap"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Global notes under the table (from i18n) */}
          <div className="mt-4 space-y-1 text-xs text-graphite/80">
            {notes.prices && <p>{notes.prices}</p>}
            {notes.locations && <p>{notes.locations}</p>}
            {notes.cancellation && (
              <p>
                <Trans
                  i18nKey="notes.cancellation"
                  ns="sessions"
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

        {/* Corporate callout — light card */}
{(corporate.title || corporate.body) && (
  <div
    className="
      mt-6 rounded-xl bg-white text-midnight-navy
      shadow-sm border border-gray-200
    "
  >
    <div
      className="
        p-5 flex flex-col gap-4
        sm:flex-row sm:items-center
      "
    >
      {/* Icon + text */}
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

      {/* CTA button */}
      {corporate.linkUrl && corporate.linkLabel && (
        <div className="sm:ml-auto">
          <a
            href={corporate.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 rounded-full px-4 py-2
              bg-sea-mist text-white font-semibold
              hover:opacity-90 transition
            "
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
