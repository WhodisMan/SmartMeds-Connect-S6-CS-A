import React, { useState, useEffect } from 'react';
import Navbar3 from './Navbar3';
import Footer from './Footer';
import axios from 'axios';
import ProductSlider from './ProductSlider'
import Calendar from './Calendar';
import './Dashboard.css'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';


// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const images = [
  
  {
    url: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/QIAQ9Rd/videoblocks-doctor-with-patient-characters-animation-4k-video-animated_hbx0tgo8l_thumbnail-1080_01.png',
    title: 'Check your Patients',
    width: '70%',
  },
  
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'center',
  height: 300,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 50%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
const DocDashboard = () => {
  const [patientInfo, setPatientInfo] = useState({});
  const [consultationDetails, setConsultationDetails] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [medicationCalendar, setMedicationCalendar] = useState([]);
  const [recommended, setrecommended] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  }


  const fetchDashboardData = async () => {
    try {

      const doctorResponse = await axios.get('http://127.0.0.1:8000/docinfo/');
      if (doctorResponse && doctorResponse.data) {
        setDoctorInfo(doctorResponse.data);
      }
      
      const patientResponse = await axios.get('http://localhost:3030/patient-info');
      if (patientResponse && patientResponse.data) {
        setPatientInfo(patientResponse.data);
      }

      const consultationResponse = await axios.get('http://localhost:3030/consultation-details');
      if (consultationResponse && consultationResponse.data) {
        setConsultationDetails(consultationResponse.data);
      }

      
       // Fetch Prescription Details
       const prescriptionResponse = await axios.get('http://localhost:3030/prescription-details');
       if (prescriptionResponse && prescriptionResponse.data) {
         setPrescriptionDetails(prescriptionResponse.data);
       }
 
       // Fetch Medication Calendar
       const calendarResponse = await axios.get('http://localhost:3030/medication-calendar');
       if (calendarResponse && calendarResponse.data) {
         setMedicationCalendar(calendarResponse.data);
       }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    
    <div className='dashboard'>
      <nav>
        <Navbar3 />
      </nav>
      <body className='dashboard-body'>
      <div className="bg-img position-relative d-flex justify-content-center">
              <div className="fg-content d-flex flex-column justify-content-center align-items-center gap-5 ">
              {doctorInfo.map((doctor, index) => (
        <div key={index}>
          
          <h1>Dr. {doctor.firstName} {doctor.lastName}</h1>
          
        </div>
      ))}
                
                {/* <SearchBar onSearchResults={handleSearchResults} /> */}
              </div>
            </div>
            {searchResults.length > 0 &&
              <div className="container pb-5">
                <h2 className='pt-5'>Search Results</h2>
                <div className="container p-0 m-0">
                  {/* {searchResults.map(results => 
                      <li key={results.id}>{results.name}</li>
                    )} */}
                  <ProductSlider data={searchResults}/>
                  
                </div>
              </div>
            }
        <div className='container'>
        {/* <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <Link to="/PatientPage" className="text-decoration-none text-dark">
                <div className="card shadow p-3 mb-5 bg-white rounded">
                  <div className="card-body">
                    <h5 className="card-title"><FontAwesomeIcon icon={faUsers} className="mr-2" />Your Patients</h5>
                    <p className="card-text">View and manage your patients</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div> */}

        <h2 className='pt-5'>Your Patients</h2>
        <Box sx={{ display: 'flex',  justifyContent: 'center',flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        > <Link to="/PatientPage" className="text-decoration-none text-dark">
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
            
          </Image>
          </Link>
        </ImageButton>
      ))}
    </Box>
    
        <div className="container pb-5">
              {/* <h2 className='pt-5'>Your Patients</h2> */}
              <div className="container p-0 m-0">
                
                <ProductSlider data={recommended}/>
              </div>
            </div>
          <div className='col-md-4'>
              <div className='container pb-5'>
                <h2 className='pt-5'>Doctor Information</h2>
                <div className='container p-0 m-0'>
                  {/* <p>Doctor ID: {doctorInfo.doctorId}</p>
                  <p>Name: {doctorInfo.firstName} {doctorInfo.lastName}</p>
                  <p>Hospital: {doctorInfo.hospital}</p>
                  <p>Department: {doctorInfo.department}</p>
                  <p>Email: {doctorInfo.email}</p> */}
                  {doctorInfo.map((doctor, index) => (
        <div key={index}>
          <p>Doctor ID: {doctor.doctor_id}</p>
          <p>Name: Dr. {doctor.firstName} {doctor.lastName}</p>
          <p>Hospital: {doctor.hospital}</p>
          <p>Department: {doctor.department}</p>
          <p>Email: {doctor.email}</p>
        </div>
      ))}
                </div>
              </div>
            </div>
        </div>
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default DocDashboard;
