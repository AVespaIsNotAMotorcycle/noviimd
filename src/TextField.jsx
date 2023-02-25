import React from 'react';
import PropTypes from 'prop-types';
import './TextField.css';

function TextField({
  onChange,
  placeholder,
}) {
  return (
    <textarea
      className="textfield"
      onChange={onChange}
      placeholder={placeholder}
      type="text"
    />
  );
}

export default TextField;

TextField.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

TextField.defaultProps = {
  onChange: () => {},
  placeholder: '',
};
