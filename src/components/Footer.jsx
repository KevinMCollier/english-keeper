import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation('footer');
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // helper: ensure section hash links work from any route
  const link = (hash) => (isHome ? hash : `/${hash}`);

  return (
    <footer className="bg-orange text-off-white">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 py-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
        {/* Left: small nav links */}
        <nav className="flex items-center gap-5 text-sm">
          <Link to="/commerce-disclosure" className="hover:underline underline-offset-4">
            {t('links.disclosure')}
          </Link>
          <Link to="/privacy" className="hover:underline underline-offset-4">
            {t('links.privacy')}
          </Link>
          {/* Optional: jump to pricing from any route */}
          <Link to={link('#pricing')} className="hover:underline underline-offset-4">
            {t('links.pricing')}
          </Link>
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
