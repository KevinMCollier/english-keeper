import { useTranslation } from 'react-i18next';
import useLangLink from '../hooks/useLangLink';

export default function Footer() {
  const { t } = useTranslation('footer');
  const langLink = useLangLink();

  return (
    <footer className="bg-orange text-off-white">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 py-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
        {/* Left: small nav links */}
        <nav className="flex items-center gap-5 text-sm">
          <a href={langLink('commerce-disclosure')} className="hover:underline underline-offset-4">
            {t('links.disclosure')}
          </a>
          <a href={langLink('privacy')} className="hover:underline underline-offset-4">
            {t('links.privacy')}
          </a>
          {/* Optional: jump to pricing from any route */}
          <a href={langLink('#pricing')} className="hover:underline underline-offset-4">
            {t('links.pricing')}
          </a>
        </nav>

        <div className="flex-1" />

        {/* Right: copyright */}
        <p className="text-right text-sm md:text-base">
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
}
