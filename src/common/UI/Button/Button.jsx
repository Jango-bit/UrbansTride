import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss'; // SCSS file for button styling

const Button = ({ type = 'button', text, onClick, className = '' }) => {
  return (
    <button 
      type={type} 
      className={`${classes.btn} ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
