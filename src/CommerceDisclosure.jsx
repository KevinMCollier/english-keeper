import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Row({ label, children }) {
  return (
    <div className="py-4 border-b border-gray-200">
      <div className="text-sm font-semibold text-midnight-navy">{label}</div>
      <div className="mt-1 text-sm leading-6">{children}</div>
    </div>
  );
}
Row.propTypes = {
  label: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default function CommerceDisclosure() {
  const { t } = useTranslation('legal');

  return (
    <div className="min-h-screen bg-creme text-gray-900 font-body">
      <Navbar />

      <main className="relative">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 py-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-caramel">
            {t('title')}
          </h1>
          <p className="mt-2 text-sm opacity-80">{t('effective')}</p>

          <section
            aria-label={t('title')}
            className="mt-8 rounded-2xl bg-white shadow-sm border border-gray-200"
          >
            <div className="p-6 sm:p-8">
              {/* Legal name */}
              <Row label={t('legalName.label')}>{t('legalName.value')}</Row>

              {/* Head of Operations */}
              <Row label={t('head.label')}>{t('head.value')}</Row>

              {/* Address (or disclose-upon-request) */}
              <Row label={t('address.label')}>
                <div>{t('address.value')}</div>
                {t('address.note') && (
                  <div className="text-xs opacity-70">{t('address.note')}</div>
                )}
              </Row>

              {/* Phone */}
              <Row label={t('phone.label')}>
                <div>{t('phone.value')}</div>
                {t('phone.hours') && (
                  <div className="text-xs opacity-70">{t('phone.hours')}</div>
                )}
              </Row>

              {/* Email */}
              <Row label={t('email.label')}>{t('email.value')}</Row>

              {/* Site URL */}
              <Row label={t('url.label')}>
                {t('url.value') || (typeof window !== 'undefined' ? window.location.origin : '')}
              </Row>

              {/* Additional fees */}
              <Row label={t('price.label')}>
                {t('price.value.before')}
                <Link to="/#pricing" className="underline">{t('price.value.linkText')}</Link>
                {t('price.value.after')}
              </Row>

              {/* Accepted payment methods */}
              <Row label={t('paymentMethods.label')}>
                {t('paymentMethods.value')}
              </Row>

              {/* Payment period */}
              <Row label={t('paymentPeriod.label')}>
                {t('paymentPeriod.value')}
              </Row>

              {/* Delivery times / service provision timing */}
              <Row label={t('delivery.label')}>{t('delivery.value')}</Row>

              {/* Exchanges & Returns Policy (two cases) */}
              <Row label={t('returns.title')}>
                <div className="space-y-2">
                  <div>
                    <div className="font-semibold text-sm">
                      {t('returns.customer.title')}
                    </div>
                    <div className="text-sm">{t('returns.customer.body')}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {t('returns.defective.title')}
                    </div>
                    <div className="text-sm">{t('returns.defective.body')}</div>
                  </div>
                </div>
              </Row>

              {/* Optional items — include only if applicable */}
              {t('optional.applicationPeriod.value') && (
                <Row label={t('optional.applicationPeriod.label')}>
                  {t('optional.applicationPeriod.value')}
                </Row>
              )}
              {t('optional.quantity.value') && (
                <Row label={t('optional.quantity.label')}>
                  {t('optional.quantity.value')}
                </Row>
              )}
              {t('optional.environment.value') && (
                <Row label={t('optional.environment.label')}>
                  {t('optional.environment.value')}
                </Row>
              )}

              {/* Privacy policy link */}
              <Row label={t('privacy.label')}>
                <Link to="/privacy" className="underline">
                  {t('privacy.value')}
                </Link>
              </Row>
            </div>
          </section>

          <div className="mt-8">
            <Link to="/#banner" className="text-sm underline">
              {t('backHome')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
