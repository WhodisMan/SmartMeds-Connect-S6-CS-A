// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Signup.css';

// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';



// export default function Signup() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   // const navigate = useNavigate();



  



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = { firstName, lastName, email, password };
//     console.log(userData);


//   axios.post('http://127.0.0.1:8000/signup/', { firstName,lastName,email,password })
//   .then((response) => {
//     if (response.data.success) {
//      window.location.href = '/Login';
//     } else {
//       alert('Signup failed. Please try again.');
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

//   };
//   return (
//     <div className='formbg'>
  
 
//       <form onSubmit={handleSubmit}>
//         <h3>Sign Up</h3>
//         <div className="form-group">
//           <label htmlFor="firstName">First Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="firstName"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder="First Name"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="lastName"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="Last Name"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//             minLength="8"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Confirm Password"
//             required
//             minLength="8"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Sign Up
//         </button>
//         <p className='para'>Are you can existing user?</p>
//         <Link to="/Login">
//       <button type='submit' className="btn btn-secondary">Login</button>
//     </Link>
        
//       </form>

//      </div>
//   );
// }


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

import axios from 'axios';

export default function Signup() {
  const [userType, setUserType] = useState('patient');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [patientId, setpatientId] = useState('');
  const [doctorId, setdoctorId] = useState('');
  const [department, setdepartment] = useState('');
  const [hospital, setHospital] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const toggleUserType = () => {
    setUserType((prevType) => (prevType === 'patient' ? 'doctor' : 'patient'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    // Reset password match status
    setPasswordsMatch(true);


    const userData = { firstName, lastName, email, password, userType, patientId,age,hospital,department };
    console.log(userData);

    axios
      .post('http://127.0.0.1:8000/signup/', userData)
      .then((response) => {
        if (response.data.success) {
          window.location.href = '/Login';
        } else {
          alert('Signup failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='formbg'>
      <form onSubmit={handleSubmit}>
        <h3 style={{ fontFamily: "'Poppins', sans-serif" }}>Sign Up</h3>
        <div className='form-group'>
          <label style={{ fontFamily: "'Poppins', sans-serif" }}>User Type:</label>
          <div className='toggle-container'>
            <button
              type='button'
              onClick={toggleUserType}
              className={`toggle-button ${userType === 'patient' ? 'active' : ''}`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Patient
            </button>
            <button
              type='button'
              onClick={toggleUserType}
              className={`toggle-button ${userType === 'doctor' ? 'active' : ''}`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Doctor
            </button>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </div>
        {userType === 'patient' && (
          <>
            <div className='form-group'>
              <label htmlFor='patientId'>Patient ID</label>
              <input
                type='text'
                className='form-control'
                id='patientId'
                value={patientId}
                onChange={(e) => setpatientId(e.target.value)}
                placeholder='Patient ID'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='age'>Age</label>
              <input
                type='text'
                className='form-control'
                id='age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder='Age'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='uploadImage'>Upload Patient Image</label>
              <input
                type='file'
                className='form-control'
                id='uploadImage'
                accept='image/*'
                required
              />
            </div>
          </>
        )}
        {userType === 'doctor' && (
          <>
            <div className='form-group'>
              <label htmlFor='patientId'>Doctor ID</label>
              <input
                type='text'
                className='form-control'
                id='doctorId'
                value={doctorId}
                onChange={(e) => setdoctorId(e.target.value)}
                placeholder='Doctor ID'
                required
              />
            </div>
            <div className='form-group'  style={{ position: 'relative', left: '-27px'}}>
              <label htmlFor='department'>Department</label>
              <select
                id='department'
                className='form-control'
                value={department}
                onChange={(e) => setdepartment(e.target.value)}
                style={{ width: '133%' }}
                required
              >
                <option value='' disabled>Select Department</option>
                <option value='Cardiology'>Cardiology</option>
                <option value='Orthopedics'>Orthopedics</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className='form-group'style={{ position: 'relative', left: '-27px'}}>
              <label htmlFor='hospital'>Hospital Name</label>
              <select
                id='hospital'
                className='form-control'
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                style={{ width: '133%' }}
                required
              >
                <option value='' disabled>Select Hospital</option>
                <option value='General Hospital'>General Hospital</option>
                <option value='Community Clinic'>Community Clinic</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </>
        )}
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            minLength='8'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
            minLength='8'
          />
            {!passwordsMatch && <p className='error-message'>Passwords do not match</p>}
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign Up
        </button>
        <p className='para'>Are you an existing user?</p>
        <Link to='/Login'>
          <button type='submit' className='btn btn-secondary'>
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}


// import React, { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import './Signup.css';
// import axios from 'axios';

// export default function Signup() {
//   const [userType, setUserType] = useState('patient');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [capturedImage, setCapturedImage] = useState(null);

//   const videoRef = useRef(null);

//   const toggleUserType = () => {
//     setUserType((prevType) => (prevType === 'patient' ? 'doctor' : 'patient'));
//   };

//   const startCamera = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       })
//       .catch((error) => console.error('Error accessing camera:', error));
//   };

//   const captureImage = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     const context = canvas.getContext('2d');
//     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const imageDataURL = canvas.toDataURL('image/png');
//     setCapturedImage(imageDataURL);
//     videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const userData = { firstName, lastName, email, password, userType, capturedImage };
//     console.log(userData);

//     axios
//       .post('http://127.0.0.1:8000/signup/', userData)
//       .then((response) => {
//         if (response.data.success) {
//           window.location.href = '/Login';
//         } else {
//           alert('Signup failed. Please try again.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <div className='formbg'>
//       <form onSubmit={handleSubmit}>
//         <h3 style={{ fontFamily: "'Poppins', sans-serif" }}>Sign Up</h3>
//         <div className='form-group'>
//           <label style={{ fontFamily: "'Poppins', sans-serif" }}>User Type:</label>
//           <div className='toggle-container'>
//             <button
//               type='button'
//               onClick={toggleUserType}
//               className={`toggle-button ${userType === 'patient' ? 'active' : ''}`}
//               style={{ fontFamily: "'Poppins', sans-serif" }}
//             >
//               Patient
//             </button>
//             <button
//               type='button'
//               onClick={toggleUserType}
//               className={`toggle-button ${userType === 'doctor' ? 'active' : ''}`}
//               style={{ fontFamily: "'Poppins', sans-serif" }}
//             >
//               Doctor
//             </button>
//           </div>
//         </div>
//         <div className='form-group'>
//           <label htmlFor='firstName'>First Name</label>
//           <input
//             type='text'
//             className='form-control'
//             id='firstName'
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder='First Name'
//             required
//           />
//         </div>
//         {/* ... (other form fields) */}
//         {userType === 'patient' && (
//           <>
//             {/* ... (other patient-specific form fields) */}
//             <div className='form-group'>
//               <button type='button' onClick={startCamera}>
//                 Start Camera
//               </button>
//               <button type='button' onClick={captureImage}>
//                 Capture Image
//               </button>
//               {capturedImage && <img src={capturedImage} alt='Captured' />}
//             </div>
//           </>
//         )}
//         <button type='submit' className='btn btn-primary'>
//           Sign Up
//         </button>
//         <p className='para'>Are you an existing user?</p>
//         <Link to='/Login'>
//           <button type='submit' className='btn btn-secondary'>
//             Login
//           </button>
//         </Link>
//       </form>
//       <video ref={videoRef} style={{ display: 'none' }}></video>
//     </div>
//   );
// }
