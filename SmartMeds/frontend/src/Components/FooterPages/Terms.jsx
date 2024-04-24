import React from 'react';

const Terms = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
        <div className="custom-button" style={styles.button} onClick={handleGoBack}>
            Go Back
        </div>

    
        <div className="card mt-3 mb-5" style={styles.container}>
        <h1 style={styles.heading}>Terms and Conditions</h1>
        <div style={styles.content}>
        <p>Welcome to SmartMeds Connect!</p>
            <p>By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.</p>

            <h2>2. User Responsibilities</h2>
            <p>a) You must be at least 18 years old to use our services.</p>
            <p>b) You are solely responsible for any content you post or submit on our website.</p>
            <p>c) You agree not to use our website for any illegal or unauthorized purposes.</p>

            <h2>3. Privacy</h2>
            <p>We respect your privacy and handle your personal information in accordance with our Privacy Policy. By using our website, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.</p>

            <h2>4. Intellectual Property</h2>
            <p>All content and materials on our website, including logos, text, images, and software, are protected by intellectual property laws. You agree not to reproduce, modify, distribute, or exploit any content without prior written permission from the respective owners.</p>

            <h2>5. Disclaimer</h2>
            <p>Our website provides food recommendations and suggestions, but we do not guarantee the accuracy, availability, or quality of the recommended establishments. We are not responsible for any issues or disputes that may arise between users and recommended restaurants.</p>

            <h2>6. Limitation of Liability</h2>
            <p>We shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from the use of our website or services.</p>

            <h2>7. Modifications</h2>
            <p>We reserve the right to modify or replace these terms and conditions at any time. It is your responsibility to review this page periodically for changes.</p>

            <h2>8. Governing Law</h2>
            <p>These terms and conditions shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].</p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions or concerns about these terms and conditions, please contact us at support@foodiko.com.</p>

            
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
    //   backgroundColor: 'coral',
    //   color: '#fff',
    //   border: 'none',
    //   borderRadius: '4px',
    //   cursor: 'pointer',
    },
  };
  

  

export default Terms;
