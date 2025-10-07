import PropTypes from 'prop-types';

export default function LinkButton({
  href,
  label,
  color = 'caramel',
  className = '',
  disabled = false,
  disabledClassName = '',
  sameTab = false,
}) {
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

  if (disabled) {
    return (
      <button type="button" className={classes} disabled aria-disabled title={label}>
        {label}
      </button>
    );
  }

  const isAnchor = typeof href === 'string' && href.startsWith('#');

  // Anchors: same-tab
  if (isAnchor) {
    return (
      <a href={href} className={classes} title={label}>
        {label}
      </a>
    );
  }

  // External links (Stripe, your sites, mailto, etc.)
  return (
    <a
      href={href}
      target={sameTab ? '_self' : '_blank'}
      rel={sameTab ? undefined : 'noopener noreferrer'}
      className={classes}
      title={label}
    >
      {label}
    </a>
  );
}

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['caramel', 'lemon', 'orange']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledClassName: PropTypes.string,
  sameTab: PropTypes.bool,
};
