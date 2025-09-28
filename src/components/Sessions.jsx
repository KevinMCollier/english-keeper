import { useTranslation } from 'react-i18next';
import ServiceButton from './ServiceButton';

export default function Sessions() {
  const { t } = useTranslation('sessions');

  const items           = (t('items', { returnObjects: true }) || []).filter(i => i.key !== 'corporate'); // remove from table
  // const packages        = t('packages', { returnObjects: true }) || [];
  // const packagesHeading = t('packagesHeading', { defaultValue: '' });
  // const packagesSub     = t('packagesSub', { defaultValue: '' });
  const studentBadge    = t('studentBadge', { defaultValue: '' });

  return (
    <section id="sessions" className="bg-creme py-16 sm:py-20 font-body">
      <div className="mx-auto w-full max-w-3xl px-5">
        <h2 className="font-display font-bold text-copper-rust text-2xl sm:text-3xl mb-3">
          {t('heading')}
        </h2>

        {studentBadge && (
          <div className="mb-5">
            <span className="inline-block rounded-full bg-midnight-navy text-off-white text-xs sm:text-sm px-3 py-1">
              {studentBadge}
            </span>
          </div>
        )}

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
                <th className="text-left pb-2">Session</th>
                <th className="text-left pb-2">Time</th>
                <th className="text-left pb-2">Price</th>
                <th className="text-left pb-2">Book</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.key} className="border-t first:border-t-0 border-gray-200/70 align-middle">
                  <td className="py-4">
                    <span className="font-display text-midnight-navy text-base sm:text-lg font-semibold">
                      {i.title}
                    </span>
                  </td>
                  <td className="py-4 text-sm sm:text-base text-graphite">{i.duration?.trim() || '—'}</td>
                  <td className="py-4 text-sm sm:text-base font-medium text-midnight-navy">{i.price?.trim() || '—'}</td>
                  <td className="py-4">
                    {i.url?.trim() && (
                      <ServiceButton
                        url={i.url}
                        label={
                          i.key === 'freetrial' ? 'Book Free Trial'
                          : i.key === 'online50' ? 'Book 1:1 Online'
                          : i.key === 'inperson' ? 'Book 1:1 In-Person'
                          : i.key === 'group80' ? 'Book Group'
                          : 'Book'
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

          {/* Global notes under the table */}
          <div className="mt-4 space-y-1 text-xs text-graphite/80">
            <p>※ Prices include session fee, post-session learning summary, and venue/transportation cost.</p>
            <p>※ In-person & group sessions available within limited locations. Contact for more details.</p>
            <p>
              <strong>Cancellation policy</strong>: Free up to <strong>48 hours</strong> before; <strong>24–48 hours</strong> = 50% fee;{' '}
              <strong>within 24 hours</strong> = 100% fee. Rescheduling allowed up to <strong>24 hours</strong> before start.
            </p>
          </div>
        </div>

        {/* CORPORATE BLOCK (moved out of table) */}
        <div className="mt-8 text-sm text-graphite/90">
          <span className="font-semibold text-midnight-navy">Corporate Training</span>{' '}
          · Tailored programs for teams and companies —{' '}
          <a
            href="https://kevin-collier.me"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-copper-rust"
          >
            visit Collier Consulting
          </a>.
        </div>

        {/* PACKAGES
        {packages.length > 0 && (
          <div className="mt-10">
            {packagesHeading && (
              <h3 className="font-display font-bold text-midnight-navy text-xl sm:text-2xl">
                {packagesHeading}
              </h3>
            )}
            {packagesSub && <p className="mt-1 text-graphite/80 text-sm">{packagesSub}</p>}

            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm mt-3">
              <div className="divide-y divide-gray-200/70">
                {packages.map((p) => (
                  <div key={p.key} className="py-3">
                    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_140px_auto] items-center gap-x-4">
                      <div>
                        <h4 className="font-display text-midnight-navy text-base sm:text-lg font-semibold">
                          {p.title}
                        </h4>
                        {p.note && <p className="mt-1 text-xs text-graphite/70">{p.note}</p>}
                      </div>
                      <div className="text-sm sm:text-base font-medium text-midnight-navy">{p.price}</div>
                      <div>
                        {p.url?.trim() && (
                          <ServiceButton
                            url={p.url}
                            label="Purchase Package"
                            color="caramel"
                            className="w-full sm:w-[180px] justify-center whitespace-nowrap"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
}
