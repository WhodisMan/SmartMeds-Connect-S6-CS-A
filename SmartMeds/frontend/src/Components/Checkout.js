import React, { useState } from 'react';
import './Checkout.css';
import { Link } from 'react-router-dom'

const CustomerForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');

  return (
    <div className="form-section1">
      <h2>Customer Info</h2>
      <form className='bf'>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Pin Code:
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="form-section1">
      <h2>Payment Info</h2>
      <div className="radio-group">
        <label>
        Test Gateway

          <input
            type="radio"
            value="test"
            checked={paymentMethod === 'test'}
            onChange={handlePaymentMethodChange}
          />
        </label>
        <label>
        Credit Card
          <input
            type="radio"
            value="creditCard"
            checked={paymentMethod === 'creditCard'}
            onChange={handlePaymentMethodChange}
          />
        
        </label>
      </div>
      {paymentMethod === 'creditCard' && (
        <form>
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </label>
          <label>
            Cardholder Name:
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </label>
        </form>
      )}
    </div>
  );
};

// Rest of the code remains the same


const BillingForm = () => {
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingPinCode, setBillingPinCode] = useState('');

  return (
    <div className="form-section1">
      <h2>Billing Address</h2>
      <form className='bf'>
        <label>
          First Name:
          <input
            type="text"
            value={billingFirstName}
            onChange={(e) => setBillingFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={billingLastName}
            onChange={(e) => setBillingLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={billingEmail}
            onChange={(e) => setBillingEmail(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            value={billingCountry}
            onChange={(e) => setBillingCountry(e.target.value)}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={billingCity}
            onChange={(e) => setBillingCity(e.target.value)}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            value={billingState}
            onChange={(e) => setBillingState(e.target.value)}
          />
        </label>
        <label>
          Pin Code:
          <input
            type="text"
            value={billingPinCode}
            onChange={(e) => setBillingPinCode(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};


const Page = () => {
    const handleCheckout = () => {
      // Handle checkout logic here
      // e.g., send form data to the server, perform validation, etc.
      console.log('Checkout button clicked');
    };
  
    return (
      <div className="checkout-container">
        <CustomerForm />
        <PaymentForm />
        <BillingForm />
        
        <Link to='/Order'>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout and Pay
          </button>
        </Link>
      </div>
    );
  };

export default Page;
