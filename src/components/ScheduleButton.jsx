// src/components/ScheduleButton.jsx
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export default function ScheduleButton({
  variant = 'solid',
  className = '',
  onBeforeOpen,
  url
}) {
  const { t } = useTranslation('contact');

  const openCalendly = () => {
    if (typeof onBeforeOpen === 'function') onBeforeOpen();

    if (window?.Calendly?.initPopupWidget && url) {
      window.Calendly.initPopupWidget({ url });
    } else {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const base =
    'inline-flex items-center justify-center rounded-full text-sm font-semibold transition px-4 py-1.5';
  const styles =
    variant === 'solid'
      ? 'bg-orange text-off-white hover:bg-orange/80'
      : 'text-off-white border-2 border-off-white/70 hover:bg-off-white hover:text-black';

  return (
    <button type="button" onClick={openCalendly} className={`${base} ${styles} ${className}`}>
      {t('cta.call')}
    </button>
  );
}

ScheduleButton.propTypes = {
  variant: PropTypes.oneOf(['solid', 'outline']),
  className: PropTypes.string,
  onBeforeOpen: PropTypes.func, // optional hook
  url: PropTypes.string.isRequired, // new!
};
