import React from 'react';
import classes from './Thankyou.module.scss'; // Import the SCSS module

function Thankyou() {
  return (
    <div className={classes['thank-you-container']}>
      <div className={classes['thank-you-box']}>
        <h2 className={classes['thank-you-title']}>Thank You for Your Order!</h2>
        <p className={classes['thank-you-message']}>Your payment was successful. We appreciate your business and hope to see you again soon!</p>
        <button className={classes['thank-you-button']} onClick={() => window.location.href = '/'}>Go to Home</button>
      </div>
    </div>
  );
}

export default Thankyou;
