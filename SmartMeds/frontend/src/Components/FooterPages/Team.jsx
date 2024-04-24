import React from 'react';

const Team = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="custom-button" style={styles.button} onClick={handleGoBack}>
        Go Back
      </div>

      <div className="card mt-3 mb-5" style={styles.container}>
        <h1 style={styles.heading}>Our Team</h1>
        <div style={styles.content}>
          <h2>Meet Our Foodiko Team</h2>
          <p>At Foodiko, our team is composed of passionate individuals who share a love for food and technology.
             Together, we strive to provide the best food ordering recommendations and enhance your culinary experiences.
              </p>
            
        
        
          
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
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
};

export default Team;
