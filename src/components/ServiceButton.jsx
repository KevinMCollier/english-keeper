import PropTypes from 'prop-types';

export default function ServiceButton({ url, label, color = 'caramel', className = '' }) {
  const openCalendly = () => {
    if (window?.Calendly?.initPopupWidget && url) {
      window.Calendly.initPopupWidget({ url });
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const base =
    'inline-flex items-center justify-center rounded-lg text-sm font-medium transition px-3 py-1.5';
  const styles =
    color === 'caramel'
      ? 'bg-caramel text-off-white hover:bg-caramel/80'
      : color === 'lemon'
      ? 'bg-lemon text-midnight-navy hover:bg-lemon/90'
      : 'bg-orange text-off-white hover:bg-orange/80';

  return (
    <button type="button" onClick={openCalendly} className={`${base} ${styles} ${className}`}>
      {label}
    </button>
  );
}

ServiceButton.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['caramel', 'lemon', 'orange']),
  className: PropTypes.string,
};
