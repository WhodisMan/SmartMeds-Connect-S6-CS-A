import React from 'react';

const Privacy = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="custom-button" style={styles.button} onClick={handleGoBack}>
        Go Back
      </div>

      <div className="card mt-3 mb-5" style={styles.container}>
        <h1 style={styles.heading}>Privacy Policy</h1>
        <div style={styles.content}>
          <p>Welcome to SmartMeds Connect</p>
          <p>At SmartMeds Connect, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services. Please read this policy carefully.</p>

          <h2>1. Information We Collect</h2>
          <p>a) Personal Information: When you create an account or use our services, we may collect personal information such as your name, email address, and contact details.</p>
          <p>b) Usage Information: We collect information about your interactions with our website and services, including IP address, device information, and browsing activity.</p>

          <h2>2. How We Use Your Information</h2>
          <p>a) Personalization: We use your information to provide personalized food recommendations and improve your user experience.</p>
          <p>b) Communication: We may send you notifications, updates, and marketing materials related to our services.</p>

          <h2>3. Information Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. However, we may share your information with trusted partners and service providers who assist us in delivering our services.</p>

          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

          <h2>5. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to enhance your user experience and collect information about your usage patterns.</p>

          <h2>6. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.</p>

          <h2>7. Children's Privacy</h2>
          <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children.</p>

          <h2>8. Changes to This Policy</h2>
          <p>We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting on our website.</p>

          <h2>9. Contact Us</h2>
          <p>If you have any questions or concerns about our Privacy Policy, please contact us at privacy@smartmeds.com.</p>
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

export default Privacy;
