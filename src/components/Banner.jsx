import { useTranslation, Trans } from 'react-i18next';

export default function Banner() {
  const { t } = useTranslation('banner');

  const btn = (...c) =>
    `inline-flex items-center justify-center text-base font-semibold px-6 py-2 rounded-full transition whitespace-nowrap ${c.join(' ')}`;

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const sub = t('sub', { defaultValue: '' });

  return (
    <section id="banner" className="relative bg-creme font-body overflow-hidden pt-14">
      {/* Image pinned to top-right WITH its own relative container */}
      <div
        className="absolute top-0 right-0 z-0 hidden md:block pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="relative w-[70vw] max-w-[496px]">
          <img
            src="/handshake.jpg"
            alt=""
            className="block w-full h-auto object-contain"
            loading="eager"
          />
          <div className="absolute inset-y-0 left-0 w-[0%] bg-gradient-to-r from-creme via-creme/40 to-transparent" />
        </div>
      </div>

      {/* Text container aligned EXACTLY like the navbar */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-5">
        <div className="max-w-3xl text-left">
          <h1
            className="font-display font-extrabold text-caramel
                       text-3xl sm:text-5xl md:text-7xl
                       tracking-tight leading-tight md:leading-snug mb-4 break-words"
          >
            <Trans t={t} i18nKey="headline" components={[<br key="br" />]} />
          </h1>

          {sub && (
            <p className="mt-3 text-base sm:text-xl font-extrabold text-midnight-navy leading-relaxed">
              {sub}
            </p>
          )}

          {/* Primary + Secondary CTAs */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              onClick={() => scrollTo('pricing')}
              className={btn('bg-orange text-off-white', 'hover:bg-copper-rust/90', 'self-start w-auto')}
            >
              {t('cta.services')}
            </button>

            <button
              onClick={() => scrollTo('made-for')} // change if your section id differs
              className={btn(
                'bg-white text-midnight-navy border border-gray-300',
                'hover:bg-gray-50',
                'self-start w-auto'
              )}
            >
              {t('cta.isThisForMe')}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer before next section */}
      <div className="h-[26rem] md:h-[32rem]" aria-hidden="true" />
    </section>
  );
}
