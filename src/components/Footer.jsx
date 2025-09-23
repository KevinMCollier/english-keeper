import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('footer');   // add the namespace

  return (
    <footer className="bg-orange">
      <div className="container mx-auto p-5">
        <p className="text-right text-base text-white hover:text-white">
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
}
