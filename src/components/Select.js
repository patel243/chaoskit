import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { FormFooter, FormLabel } from '.';
import { generateUUID } from '../helpers/utility';
import { config } from '../helpers/config';

const Select = ({
  className,
  explanationMessage,
  label,
  name,
  options,
  onChange,
  required,
  selected,
  validationMessage,
  ...opts
}) => {
  const id = `${name}-${generateUUID()}`;

  const handleOnChange = ({
    target: { name: fieldName, value: fieldValue },
  }) => {
    onChange(fieldName, fieldValue);
  };

  const classes = cx('form-group', className, {
    [config.classes.notValid]: validationMessage,
    [config.classes.required]: required,
  });

  const renderOpts = (option) => {
    // If the option has options as well we're in an `<optgroup>`
    if (option.options) {
      return (
        <optgroup key={option.value} label={option.label}>
          {option.options.map(childOption => (
            <option key={childOption.value} value={childOption.value}>
              {childOption.label}
            </option>
          ))}
        </optgroup>
      );
    }

    // We're in a default single-level `<option>`
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  };

  return (
    <div className={classes}>
      <FormLabel id={id}>{label}</FormLabel>
      <div className="form-select">
        <select
          id={id}
          name={name}
          onChange={handleOnChange}
          value={selected}
          {...opts}
        >
          {options.map(renderOpts)}
        </select>
      </div>
      <FormFooter
        explanationMessage={explanationMessage}
        validationMessage={validationMessage}
      />
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  explanationMessage: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validationMessage: PropTypes.string,
};

export default Select;
