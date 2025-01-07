import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './Payment.module.scss'

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod'); 
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigatess = useNavigate();

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

   
    const paymentData = {
      paymentMethod,
      cardNumber,
      cardExpiry,

      nameOnCard,
      address,
    };

    try {
     
      const response = await axios.post('http://localhost:3031/process-payment', paymentData);

   
      if (response.data.status === 'success') {
        navigatess('/thankyou'); 
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred. Please try again later.');
    }

    setLoading(false);
  };
  const nav=useNavigate()
  const Handlesubmits=()=>{
     nav('/Thankyou')
  }

  return (
    <div className={classes.paymentPage}>
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit} className={classes.paymentForm}>
        <div className={classes.paymentMethod}>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={handlePaymentMethodChange}
            />
            Cash on Delivery (COD)
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={handlePaymentMethodChange}
            />
            Credit Card
          </label>
        </div>

        
        {paymentMethod === 'creditCard' && (
          <div className={classes.creditCardDetails}>
            <label>
              Card Number:
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </label>
            <label>
              Expiry Date (MM/YY):
         
            </label>
            <label>
              Name on Card:
              <input
                type="text"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                required
              />
            </label>
          </div>
        )}

        <label>
          Shipping Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </label>

        <button type="submit" disabled={loading} className={classes.submitButton} onClick={Handlesubmits}>
          {loading ? 'Processing Payment...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
