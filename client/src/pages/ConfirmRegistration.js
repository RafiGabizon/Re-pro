// Importing necessary dependencies
import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle management
import { useLocation } from 'react-router-dom'; // Import for accessing route location data
import '../styles/register.css'; // Import CSS for styling the component

// Functional component for confirming registration details
export default function ConfirmRegistration() {
  const location = useLocation(); // Hook for accessing route data
  const [formData, setFormData] = useState({}); // State to store form data

  // Effect to fetch form data passed via location state
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData); // Update state with form data from location
    }
  }, [location.state]);

  // Function to handle confirmation of registration
  const handleConfirm = () => {
    // Placeholder logic for sending data to a server
    console.log('הרשמה אושרה:', formData);

    // Display a prompt for video upload
    showVideoUploadPopup();
  };

  // Function to show a popup for video upload
  const showVideoUploadPopup = () => {
    alert('נא להעלות סרטון תדמית'); // Display an alert for uploading a promotional video
    // Optional: Logic to redirect after video upload can be added here
    // navigate('/home');
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>אישור פרטי הרשמה</h2> {/* Title of the page */}
        <p>אנא אשר/י את הפרטים הבאים:</p> {/* Instruction text */}
        <div className="confirmation-details">
          <p>אימייל: {formData.email}</p> {/* Display email from formData */}
          <p>טלפון: {formData.phone}</p> {/* Display phone from formData */}
          {/* Add more details here if necessary */}
        </div>
        <button onClick={handleConfirm} className="confirm-button">אשר/י הרשמה</button> {/* Confirmation button */}
      </div>
    </div>
  );
}
