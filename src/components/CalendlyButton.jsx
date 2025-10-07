import PropTypes from 'prop-types';

export default function CalendlyButton({
  url,
  label,
  color = 'caramel',
  className = '',
  disabled = false,
  disabledClassName = ''
}) {
  const openCalendly = () => {
    if (disabled) return;
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

  const disabledStyles =
    `pointer-events-none cursor-not-allowed ` +
    (disabledClassName || 'bg-caramel/50 text-white hover:bg-caramel/50');

  const classes = `${base} ${disabled ? disabledStyles : styles} ${className}`;

  return (
    <button
      type="button"
      onClick={openCalendly}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      title={label}
    >
      {label}
    </button>
  );
}

CalendlyButton.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['caramel', 'lemon', 'orange']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledClassName: PropTypes.string
};
