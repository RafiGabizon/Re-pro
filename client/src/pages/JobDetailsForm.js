// React Component: JobDetailsForm
// This component allows users to input employment terms, insurance details, worker status, and salary information as part of a multi-step form process.

import React, { useState } from 'react';
import '../styles/JobDetailsForm.css';

const JobDetailsForm = () => {
  // Define state for form data
  const [formData, setFormData] = useState({
    employmentTerms: '', // Employment terms selection
    insuranceType: '',   // Insurance type selection
    workerStatus: '',    // Worker housing status
    salary: '',          // Salary amount
    salaryType: ''       // Salary type (hourly, monthly, etc.)
  });

  // Handle input and select field changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract the input field's name and value
    setFormData(prevState => ({
      ...prevState, // Retain existing form data
      [name]: value // Update the specific field
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Form submitted:', formData); // Log the form data to the console
    // Add logic here to send data to the server
  };

  return (
    <div className="job-details-container">
      {/* Form Title */}
      <h1 className="form-title">בוא נדבר על תנאי העסקה</h1>
      <p className="form-subtitle">שלב 2 מתוך 3</p>

      {/* Job Details Form */}
      <form onSubmit={handleSubmit} className="job-details-form">
        
        {/* Employment Terms Field */}
        <div className="form-group">
          <label htmlFor="employmentTerms">הוצאות ורכב*</label>
          <select
            id="employmentTerms"
            name="employmentTerms"
            value={formData.employmentTerms}
            onChange={handleChange}
            required
          >
            <option value="">בחר אפשרות</option>
            <option value="expenses">החזר הוצאות</option>
            <option value="car">רכב חברה</option>
            <option value="both">שניהם</option>
            <option value="none">ללא</option>
          </select>
        </div>

        {/* Insurance Type Field */}
        <div className="form-group">
          <label htmlFor="insuranceType">ביטוחי סיעודי*</label>
          <select
            id="insuranceType"
            name="insuranceType"
            value={formData.insuranceType}
            onChange={handleChange}
            required
          >
            <option value="">בחר אפשרות</option>
            <option value="company">ביטוח חברה</option>
            <option value="private">ביטוח פרטי</option>
            <option value="none">ללא</option>
          </select>
        </div>

        {/* Worker Housing Status Field */}
        <div className="form-group">
          <label htmlFor="workerStatus">מגורי עובדים*</label>
          <select
            id="workerStatus"
            name="workerStatus"
            value={formData.workerStatus}
            onChange={handleChange}
            required
          >
            <option value="">בחר אפשרות</option>
            <option value="provided">מסופק על ידי החברה</option>
            <option value="not-provided">לא מסופק</option>
          </select>
        </div>

        {/* Salary Fields */}
        <div className="salary-group">
          <label>משכורת ב-USD*</label>
          <div className="salary-inputs">
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="הכנס סכום"
              required
            />
            <select
              id="salaryType"
              name="salaryType"
              value={formData.salaryType}
              onChange={handleChange}
              required
            >
              <option value="">מחושב שכר</option>
              <option value="hourly">לשעה</option>
              <option value="daily">ליום</option>
              <option value="monthly">לחודש</option>
              <option value="yearly">לשנה</option>
            </select>
          </div>
        </div>

        {/* Form Navigation Buttons */}
        <div className="form-actions">
          <button type="button" className="back-button">הקודם</button>
          <button type="submit" className="next-button">הבא</button>
        </div>
      </form>
    </div>
  );
};

export default JobDetailsForm;
