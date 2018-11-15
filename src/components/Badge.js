import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Badge = (props) => {
  const { className, label, rounded, type } = props;
  const classes = cx('badge', className, {
    'badge--rounded': rounded,
    'badge--primary': type === 'primary',
    'badge--danger': type === 'danger',
    'badge--chaosMonkey': type === 'chaosMonkey',
  });

  return (
    <div className={classes}>
      {label}
    </div>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
  type: PropTypes.oneOf(['success', 'danger', 'chaosMonkey']),
};

export default Badge;
