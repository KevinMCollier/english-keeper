/* src/components/ContactSplit.jsx */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import useLangLink from '../hooks/useLangLink';

export default function ContactSplit() {
  const { t } = useTranslation('contact');
  const navigate = useNavigate();
  const [openInquiry, setOpenInquiry] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const ln = useLangLink();

  const btn = (...c) =>
    `block w-full text-center text-base font-semibold px-6 py-2 rounded-lg transition ${c.join(' ')}`;

  const openCalendly = () => {
    if (window?.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/collier-consulting/',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'inquiry',
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        navigate(ln('thank-you'));
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-off-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-24 flex flex-col md:flex-row md:items-start md:justify-center gap-10 md:gap-14">
        <h2 className="text-midnight-navy font-display font-extrabold flex-none max-w-md text-2xl sm:text-3xl leading-tight break-words">
          <Trans
            i18nKey="heading"
            t={t}
            components={{ 1: <span className="text-orange" /> }}
          />
        </h2>

        <div className="flex-none w-full max-w-sm space-y-4">
          <button
            onClick={openCalendly}
            className={btn('bg-lemon', 'hover:bg-lemon/90')}
          >
            {t('cta.call')}
          </button>

          <button
            onClick={() => setOpenInquiry(true)}
            className={btn('bg-caramel', 'hover:bg-caramel/90')}
          >
            {t('cta.inquiry')}
          </button>
        </div>
      </div>

      {openSignup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpenSignup(false)}
        >
          <div
            className="bg-off-white w-full max-w-md rounded-xl p-8 space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-midnight-navy font-bold text-2xl">
              {t('modalJoin.title')}
            </h3>

            <form
              action="https://kevin-collier.us8.list-manage.com/subscribe/post?u=3223839310f18f06bdb1456c2&id=7987856aee&f_id=004972e1f0"
              method="post"
              target="_blank"
              noValidate
              className="space-y-4"
            >
              <input
                type="email"
                name="EMAIL"
                placeholder={t('modalJoin.emailPlaceholder')}
                required
                className="w-full border border-stone-grey rounded px-4 py-2 focus:ring-2 focus:ring-copper-rust focus:outline-none"
              />

              {/* Honeypot */}
              <div className="absolute -left-[5000px]" aria-hidden="true">
                <input
                  type="text"
                  name="b_3223839310f18f06bdb1456c2_7987856aee"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>

              <button
                type="submit"
                className={btn(
                  'bg-copper-rust text-off-white',
                  'hover:bg-copper-rust/90'
                )}
              >
                {t('modalJoin.subscribe')}
              </button>

              <p className="text-center opacity-70">
                <a
                  href="http://eepurl.com/jhC0UY"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Mailchimp – email marketing made easy and fun"
                  className="inline-block"
                >
                  <img
                    src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                    alt="Intuit Mailchimp"
                    className="h-6 mx-auto"
                  />
                </a>
              </p>
            </form>

            <button
              onClick={() => setOpenSignup(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-graphite hover:text-midnight-navy"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {openInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpenInquiry(false)}
        >
          <div
            className="bg-off-white w-full max-w-lg rounded-xl p-8 space-y-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-midnight-navy font-bold text-2xl">
              {t('modalInquiry.title')}
            </h3>

            <form
              name="inquiry"
              onSubmit={handleSubmit}
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="inquiry" />

              <p className="hidden">
                <label>
                  Don&apos;t fill this out:{' '}
                  <input name="bot-field" onChange={handleChange} />
                </label>
              </p>

              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('modalInquiry.namePlaceholder')}
                className="w-full border border-stone-grey rounded px-4 py-2 focus:ring-2 focus:ring-copper-rust focus:outline-none"
              />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('modalInquiry.emailPlaceholder')}
                className="w-full border border-stone-grey rounded px-4 py-2 focus:ring-2 focus:ring-copper-rust focus:outline-none"
              />
              <textarea
                required
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={t('modalInquiry.messagePlaceholder')}
                className="w-full border border-stone-grey rounded px-4 py-2 focus:ring-2 focus:ring-copper-rust focus:outline-none"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={btn(
                    'flex-1 border border-graphite text-graphite',
                    'hover:bg-orange hover:text-off-white',
                    isSubmitting && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {isSubmitting ? 'Sending...' : t('modalInquiry.send')}
                </button>
                <button
                  type="button"
                  onClick={() => setOpenInquiry(false)}
                  className={btn(
                    'flex-1 border border-graphite text-graphite',
                    'hover:bg-orange hover:text-off-white'
                  )}
                >
                  {t('modalInquiry.cancel')}
                </button>
              </div>
            </form>

            <button
              onClick={() => setOpenInquiry(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-graphite hover:text-midnight-navy"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
