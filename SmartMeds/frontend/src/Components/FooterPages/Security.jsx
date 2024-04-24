import React from 'react';

const Security = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="custom-button" style={styles.button} onClick={handleGoBack}>
        Go Back
      </div>

      <div className="card mt-3 mb-5" style={styles.container}>
        <h1 style={styles.heading}>Security</h1>
        <div style={styles.content}>
          <p>Welcome to SmartMeds Connect</p>
          <p>At SmartMeds Connect, we prioritize the security of your information. This Security page outlines the measures we take to protect your data and ensure a secure user experience. Please read this information carefully.</p>

          <h2>1. Data Encryption</h2>
          <p>We use industry-standard encryption protocols to protect the transmission and storage of your personal information. This includes the use of secure HTTPS connections.</p>

          <h2>2. Account Security</h2>
          <p>a) Password Protection: We enforce strong password requirements and encourage users to choose unique and secure passwords for their accounts.</p>
          <p>b) Two-Factor Authentication: We offer optional two-factor authentication to add an extra layer of security to your account.</p>

          <h2>3. Data Access and Storage</h2>
          <p>a) Limited Access: We restrict access to your personal information to authorized personnel who need to process it for providing our services.</p>
          <p>b) Data Storage: We store your information on secure servers and regularly monitor and update our security measures.</p>

          <h2>4. Third-Party Services</h2>
          <p>a) Service Providers: We work with trusted third-party service providers who follow industry best practices to ensure the security of your data.</p>
          <p>b) External Links: Our website may contain links to third-party websites. We are not responsible for the security practices or content of these websites.</p>

          <h2>5. Reporting Security Issues</h2>
          <p>If you discover any security vulnerabilities or have concerns regarding the security of our website or services, please report them to our security team at security@foodiko.com.</p>

          <h2>6. Updates to Security Measures</h2>
          <p>We continually review and enhance our security measures to protect your information. We may update this Security page to reflect any changes or improvements.</p>

          <h2>7. Contact Us</h2>
          <p>If you have any questions or concerns regarding the security of your information, please contact us at security@foodiko.com.</p>
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

export default Security;
