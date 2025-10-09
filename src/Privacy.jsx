import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PropTypes from 'prop-types'

function Section({ title, children }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-midnight-navy">{title}</h2>
      <div className="mt-2 text-sm leading-6">{children}</div>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node
};

export default function Privacy() {
  const { t } = useTranslation('privacy');

  return (
    <div className="min-h-screen bg-creme text-gray-900 font-body">
      <Navbar />
      <main className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 py-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-caramel">{t('title')}</h1>
        <p className="mt-2 text-sm opacity-80">{t('effective')}</p>

        <div className="mt-8 rounded-2xl bg-white shadow-sm border border-gray-200 p-6 sm:p-8">
          <Section title={t('who.title')}>{t('who.body')}</Section>

          <Section title={t('data.title')}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('data.items.identity')}</li>
              <li>{t('data.items.contact')}</li>
              <li>{t('data.items.booking')}</li>
              <li>{t('data.items.payment')}</li>
              <li>{t('data.items.usage')}</li>
              <li>{t('data.items.cookies')}</li>
            </ul>
          </Section>

          <Section title={t('purpose.title')}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('purpose.items.provide')}</li>
              <li>{t('purpose.items.support')}</li>
              <li>{t('purpose.items.billing')}</li>
              <li>{t('purpose.items.security')}</li>
              <li>{t('purpose.items.marketing')}</li>
              <li>{t('purpose.items.compliance')}</li>
            </ul>
          </Section>

          <Section title={t('thirdParties.title')}>
            <p>{t('thirdParties.intro')}</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{t('thirdParties.items.stripe')}</li>
              <li>{t('thirdParties.items.calendly')}</li>
              <li>{t('thirdParties.items.hosting')}</li>
              <li>{t('thirdParties.items.analytics')}</li>
            </ul>
            <p className="mt-2 text-xs opacity-70">{t('thirdParties.note')}</p>
          </Section>

          <Section title={t('transfers.title')}>
            <p>{t('transfers.body')}</p>
          </Section>

          <Section title={t('security.title')}>
            <p>{t('security.body')}</p>
          </Section>

          <Section title={t('retention.title')}>
            <p>{t('retention.body')}</p>
          </Section>

          <Section title={t('rights.title')}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('rights.items.access')}</li>
              <li>{t('rights.items.correct')}</li>
              <li>{t('rights.items.suppress')}</li>
              <li>{t('rights.items.delete')}</li>
              <li>{t('rights.items.optout')}</li>
            </ul>
            <p className="mt-2">{t('rights.how')}</p>
          </Section>

          <Section title={t('cookies.title')}>
            <p>{t('cookies.body')}</p>
          </Section>

          <Section title={t('updates.title')}>
            <p>{t('updates.body')}</p>
          </Section>

          <Section title={t('contact.title')}>
            <p>{t('contact.body')}</p>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
