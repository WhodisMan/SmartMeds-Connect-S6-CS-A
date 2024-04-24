import React from 'react';

const FAQ = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="custom-button" style={styles.button} onClick={handleGoBack}>
        Go Back
      </div>

      <div className="card mt-3 mb-5" style={styles.container}>
        <h1 style={styles.heading}>Frequently Asked Questions</h1>
        <div style={styles.content}>
          <h2>General Questions</h2>

          <div className="faq-item">
            <h4>1. What is Foodiko?</h4>
            <p>Foodiko is a food ordering recommendation website that helps you discover and enjoy the best culinary experiences. We provide personalized food recommendations tailored to your taste buds.</p>
          </div>

          <div className="faq-item">
            <h4>2. How does Foodiko work?</h4>
            <p>Foodiko leverages advanced algorithms and user preferences to analyze your taste and provide personalized food recommendations. Simply browse through the menus, read reviews, and place orders seamlessly.</p>
          </div>

          <h2>Account and Ordering</h2>

          <div className="faq-item">
            <h4>3. Do I need to create an account to use Foodiko?</h4>
            <p>Creating an account is not mandatory, but it allows you to save your preferences, track your orders, and enjoy a more personalized experience.</p>
          </div>

          <div className="faq-item">
            <h4>4. Can I change or cancel my order?</h4>
            <p>Once you've placed an order, it may not be possible to change or cancel it. However, you can contact the restaurant directly to inquire about any modifications or cancellations.</p>
          </div>

          <h2>Privacy and Security</h2>

          <div className="faq-item">
            <h4>5. How does Foodiko protect my personal information?</h4>
            <p>At Foodiko, we take your privacy seriously. We adhere to strict privacy practices and implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
          </div>

          <div className="faq-item">
            <h4>6. Does Foodiko share my information with third parties?</h4>
            <p>No, we do not sell or rent your personal information to third parties. However, we may share your information with trusted partners and service providers who assist us in delivering our services.</p>
          </div>

          <h2>Technical Support</h2>

          <div className="faq-item">
            <h4>7. How can I get technical support?</h4>
            <p>If you need technical support or have any issues with the Foodiko website or app, please contact our customer support team at support@foodiko.com. We're here to help!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'lightblue',
  },
  heading: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  content: {
    fontSize: '16px',
  },
  button: {
    width: 'fit-content',
    height: 'fit-content',
    marginTop: '20px',
    marginLeft: '30px',
    padding: '10px 20px',
    backgroundColor: 'lightblue', // Replace 'yourColorHere' with the color you want
    color: 'black', // Optionally set the text color
    borderRadius: '5px', // Optionally add border radius for rounded corners
  },
};

export default FAQ;
