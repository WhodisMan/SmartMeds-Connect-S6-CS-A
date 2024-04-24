import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import axios from 'axios';
import Calendar from './Calendar';
import './Dashboard.css'

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const Dashboard = () => {
  const [patientInfo, setPatientInfo] = useState({});
  const [consultationDetails, setConsultationDetails] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [medicationCalendar, setMedicationCalendar] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const fetchDashboardData = async () => {
    try {
      // const patientResponse = await axios.get('http://localhost:3030/patient-info');
      // if (patientResponse && patientResponse.data) {
      //   setPatientInfo(patientResponse.data);
      // }

      const consultationResponse = await axios.get('http://127.0.0.1:8000/consultations/');
       if (consultationResponse && consultationResponse.data) {
        setConsultationDetails(consultationResponse.data);
      }

      const doctorResponse = await axios.get('http://127.0.0.1:8000/docinfo/');
      if (doctorResponse && doctorResponse.data) {
        // console.log(doctorResponse.data);
        console.log(doctorResponse.data)
        setDoctorInfo(doctorResponse.data);
      }

      const patientResponse = await axios.get('http://127.0.0.1:8000/patientinfo/');
      if(patientResponse && patientResponse.data)
      setPatientInfo(patientResponse.data);
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

  const handleConsultationSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedConsultation = consultationDetails.find(
      (consultation) => consultation.consult_id === selectedId
    );
    setSelectedConsultation(selectedConsultation);
  };
  return (
    
    <div className='dashboard'>
      <nav>
        <Navbar2 />
      </nav>
      <body className='dashboard-body'>
      {/* <div className="bg-img position-relative d-flex justify-content-center">
              <div className="fg-content d-flex flex-column justify-content-center align-items-center gap-5 ">
                <h1 className>Welcome </h1> 
              </div>
            </div> */}
        <div className='container'>
          <div className='row'>
          <div className='col-md-4'>
  <div className='container pb-5'>
    <h2 className='pt-5'>Patient Information</h2>
    <div className='container p-0 m-0'>
      {/* Display patient information */}
      <p>Patient ID: {patientInfo.patient_id}</p>
      <p>Name: {patientInfo.firstName} {patientInfo.lastName}</p>
      <p>Age: {patientInfo.age}</p>
      <p>Email: {patientInfo.email}</p>
    </div>
  </div>
</div>

            {/* Consultation Details Section */}
            <div className='col-md-4'>
              <div className='container pb-5'>
                <h2 className='pt-5'>Last Consultation Details</h2>
                <div className='container p-0 m-0'>
                  {consultationDetails.length > 0 && (
                    <div>
                      <p>Date: {consultationDetails[consultationDetails.length - 1].date}</p>
                      <p>Comment: {consultationDetails[consultationDetails.length - 1].comment}</p>
                      {/* Iterate over each medicine within the last consultation */}
                      
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Doctor Information Section */}
            <div className='col-md-4'>
  <div className='container pb-5'>
    <h2 className='pt-5'>Your Doctor </h2>
    <div className='container p-0 m-0'>
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
              {/* Consultation Details Section */}
            <div className='col-md-4'>
              <h2 className='pt-5'>Previous Consultations</h2>
              <div className='container p-0 m-0'>
                <select className='form-select' onChange={handleConsultationSelect}>
                  <option value=''>Select Consultation</option>
                  {consultationDetails.map((consultation) => (
                    <option key={consultation.consult_id} value={consultation.consult_id}>
                      Consultation ID: {consultation.consult_id} - Date: {consultation.date}
                    </option>
                  ))}
                </select>
                {selectedConsultation && (
                  <div>
                    <p>Date: {selectedConsultation.date}</p>
                    {doctorInfo.map((doctor, index) => (
                      <div key={index}>
                        <p>Doctor ID: {doctor.doctor_id}</p>
                        <p>Doctor: Dr. {doctor.firstName} {doctor.lastName}</p>
                        
                      </div>
                    ))}
                    <p>Comment: {selectedConsultation.comment}</p>
                    <ul>
                      {selectedConsultation.medicines.map((medicine, index) => (
                        <li key={index}>
                          <p>Medicine Name: {medicine.medname}</p>
                          <p>Dosage: {medicine.dosage}</p>
                          <p>Quantity: {medicine.qty}</p>
                        </li>
                      ))}
       
                    </ul>
                  </div>
                )}
              </div>
            </div>
          {/* Medication History Section */}
          <div className='row mt-5'>
            <div className='col-md-12'>
              <div className='container pb-5'>
                {/* <h2 className='pt-5'>Medication History</h2> */}
                
                {/* Prescription Details */}
                <div className='container p-0 m-0'>
                <h3>Current Prescription</h3>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>Medicine Name</th>
                      <th scope='col'>Dosage</th>
                      <th scope='col'>Qty</th>
                      {/* Add any additional columns you want to display */}
                    </tr>
                  </thead>
                  <tbody>
                    {consultationDetails.length > 0 && consultationDetails[consultationDetails.length - 1].medicines.map((medicine, index) => (
                      <tr key={index}>
                        <td>{medicine.medname}</td>
                        <td>{medicine.dosage}</td>
                        <td>{medicine.qty}</td>
                        {/* Add additional cells for other details if needed */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

                {/* Medication Calendar */}
                {/* <div className='container p-0 m-0'>
                  <h3>Medication Calendar</h3>
                  <Calendar medicationCalendar={medicationCalendar} />
                </div> */}
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

export default Dashboard;
