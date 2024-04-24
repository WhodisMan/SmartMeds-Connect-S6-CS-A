import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import axios from 'axios';
import './PatientPage.css'; // Import CSS file for patient page styling

const PatientPage = () => {
  const [patientInfo, setPatientInfo] = useState({});
  const [showForm, setShowForm] = useState(false); // State variable to control form visibility
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    comment: '',
    date: new Date().toISOString().split('T')[0],
    medicines: [],
  });
  const [medicineOptions, setMedicineOptions] = useState([]);
  const quantityOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  const timeOptions = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }


  // Fetch patient information from the backend
  const fetchPatientInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3030/patient-info');
      if (response && response.data) {
        setPatientInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatientInfo();
    fetchMedicineOptions();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend
      const response = await axios.post('http://localhost:3030/consultation', formData);
      console.log(response.data); // Log the response from the backend
      // Optionally, you can update the UI or show a success message here
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMedicineOptions = async () => {
    try {
      const response = await axios.get('http://localhost:3030/medicine-options');
      if (response && response.data) {
        setMedicineOptions(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMedicine = () => {
    // Create a new medicine object with default values
    const newMedicine = {
      medName: '',
      dosage: '',
      qty: '',
       timeToConsume: '06:00',
    };
    // Add the new medicine to the medicines array in the form data
    setFormData({ ...formData, medicines: [...formData.medicines, newMedicine] });
  };

  // Function to handle changing medicine details
  const handleMedicineChange = (index, fieldName, value) => {
    // Update the specified field of the medicine at the given index
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index][fieldName] = value;
    setFormData({ ...formData, medicines: updatedMedicines });
  };
  
  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines.splice(index, 1);
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  return (
    <div className="patient-page">
      <Navbar2 />
      <div className="patient-content">
        <h1>Patient Information</h1>
        <div className="patient-details">
          <p>Patient ID: {patientInfo.patient_id}</p>
          <p>Name: {patientInfo.firstName} {patientInfo.lastName}</p>
          <p>Age: {patientInfo.age}</p>
          <p>Email: {patientInfo.email}</p>
          {/* Add more patient details here */}
          
        </div>
        <button onClick={() => setShowForm(true)}>New Consultation</button>
      </div>
      {/* Form for new consultation */}
      
      {showForm && (
        <div className="consultation-form">
          <h2>New Consultation</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="doctor_id">Doctor ID:</label>
            <input type="text" id="doctor_id" name="doctor_id" value={formData.doctor_id} onChange={handleChange} />
            <label htmlFor="comment">Comment:</label>
            <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange}></textarea>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
            <table>
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Quantity</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.medicines.map((medicine, index) => (
                  <tr key={index}>
                    <td>
                      <select value={medicine.medName} onChange={(e) => handleMedicineChange(index, 'medName', e.target.value)}>
                        <option value="">Select Medicine</option>
                        {medicineOptions.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input type="text" value={medicine.dosage} onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)} />
                    </td>
                    <td>
                      <select value={medicine.qty} onChange={(e) => handleMedicineChange(index, 'qty', e.target.value)}>
                        {quantityOptions.map((qty, idx) => (
                          <option key={idx} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select value={medicine.timeToConsume} onChange={(e) => handleMedicineChange(index, 'timeToConsume', e.target.value)}>
                        {timeOptions.map((time, idx) => (
                          <option key={idx} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button type="button" onClick={() => handleRemoveMedicine(index)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={handleAddMedicine}>Add Medicine</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PatientPage;
