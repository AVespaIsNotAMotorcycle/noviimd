import React from 'react';
import PropTypes from 'prop-types';

function TextField({
  className,
  onChange,
  placeholder,
}) {
  return (
    <textarea
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
    />
  );
}

export default TextField;

TextField.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

TextField.defaultProps = {
  className: '',
  onChange: () => {},
  placeholder: '',
};
