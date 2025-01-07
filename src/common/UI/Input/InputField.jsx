import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import classes from './InputField.module.scss'; // SCSS file for styling

const InputField = ({ label, name, type = 'text', placeholder, error, touched }) => {
  return (
    <div className={classes.inputField}>
      <label htmlFor={name} className={classes.inputLabel}>{label}</label>
      <Field
        type={type}
        name={name}
        id={name}
        
        placeholder={placeholder}
        className={`${classes.input}  ${error && touched ? `${classes.inputError}` : ''}`}
      />
      {touched && error && <small className={classes.errorText}>{error}</small>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
};

export default InputField;
