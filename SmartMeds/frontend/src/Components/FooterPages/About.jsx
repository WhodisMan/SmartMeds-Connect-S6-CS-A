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
        <h1 style={styles.heading}>About Us</h1>
        <div style={styles.content}>
          <p>Welcome to SmartMeds Connect</p>
          <p>At SmartMeds Connect, our mission is to revolutionize healthcare by integrating cutting-edge technology with personalized patient care. We believe in creating a seamless and efficient healthcare experience, connecting patients, doctors, and medication providers in a way that enhances accessibility and improves overall well-being.</p>
          <p>SmartMeds Connect is committed to harnessing the power of data and technology to empower individuals in managing their health proactively. Our platform facilitates real-time communication between patients and healthcare professionals, ensuring timely consultations, prescription management, and medication adherence. Join us on this journey towards a healthier and connected future with SmartMeds Connect.</p>
     
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
