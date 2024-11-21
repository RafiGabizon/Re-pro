// Importing necessary dependencies
import React, { useState } from 'react'; // Import React and useState hook for managing state

// Defining unique options for job types, states, and cities
const uniqueJobTypes = ['משרה מלאה', 'חצי משרה', 'משרת אם', 'משרת סטודנט', 'פרילנס']; // Job types
const uniqueStates = ['ישראל', 'ארצות הברית', 'קנדה', 'בריטניה', 'גרמניה', 'צרפת']; // States
const uniqueCities = {
  'ישראל': ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'רמת גן', 'הרצליה'], // Cities in Israel
  'ארצות הברית': ['ניו יורק', 'לוס אנג\'לס', 'שיקגו', 'מיאמי'], // Cities in the USA
  // Add more states and cities as needed
};

// Functional component for the first step of job posting
export default function PostJobStep1({ formData, setFormData, onNext }) {
  const [errors, setErrors] = useState({}); // State to track form validation errors

  // Handle changes to form fields
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors for the field if it was previously invalid
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Reset city selection if the state changes
    if (field === 'state') {
      setFormData(prev => ({
        ...prev,
        city: ''
      }));
    }
  };

  // Validate form fields before proceeding
  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'שדה חובה'; // Job title is required
    if (!formData.companyName.trim()) newErrors.companyName = 'שדה חובה'; // Company name is required
    if (!formData.jobType) newErrors.jobType = 'נא לבחור היקף משרה'; // Job type is required
    if (!formData.state) newErrors.state = 'נא לבחור מדינה'; // State is required
    if (!formData.city) newErrors.city = 'נא לבחור עיר'; // City is required
    if (!formData.minCommitment.trim()) newErrors.minCommitment = 'שדה חובה'; // Minimum commitment is required
    if (!formData.description.trim()) newErrors.description = 'שדה חובה'; // Job description is required

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem('jobPostingStep1', JSON.stringify(formData)); // Save form data to local storage
      onNext(); // Proceed to the next step
    }
  };

  return (
    <div className="unique-jobposting-content">
      <h2>פרסום משרה חדשה</h2>
      <h4>שלב 1 מתוך 3 - פרטי המשרה</h4>

      {/* Job Title */}
      <div className="unique-form-group">
        <label>תפקיד</label>
        <input
          type="text"
          value={formData.jobTitle}
          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
        />
        {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
      </div>

      {/* Company Name */}
      <div className="unique-form-group">
        <label>שם החברה/מותג</label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
        />
        {errors.companyName && <span className="error-message">{errors.companyName}</span>}
      </div>

      {/* Job Type */}
      <div className="unique-form-group">
        <label>היקף משרה</label>
        <select
          value={formData.jobType}
          onChange={(e) => handleInputChange('jobType', e.target.value)}
        >
          <option value="">בחר היקף משרה</option>
          {uniqueJobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.jobType && <span className="error-message">{errors.jobType}</span>}
      </div>

      {/* State */}
      <div className="unique-form-group">
        <label>מדינה</label>
        <select
          value={formData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
        >
          <option value="">בחר מדינה</option>
          {uniqueStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <span className="error-message">{errors.state}</span>}
      </div>

      {/* City */}
      <div className="unique-form-group">
        <label>עיר</label>
        <select
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          disabled={!formData.state} // Disable if no state is selected
        >
          <option value="">בחר עיר</option>
          {formData.state && uniqueCities[formData.state]?.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      {/* Minimum Commitment */}
      <div className="unique-form-group">
        <label>התחייבות מינימלית</label>
        <input
          type="text"
          value={formData.minCommitment}
          onChange={(e) => handleInputChange('minCommitment', e.target.value)}
          placeholder="לדוגמה: שנה"
        />
        {errors.minCommitment && <span className="error-message">{errors.minCommitment}</span>}
      </div>

      {/* Job Description */}
      <div className="unique-form-group">
        <label>תיאור המשרה והחברה</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={5}
          style={{ width: '100%', padding: '12px', textAlign: 'right' }}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      {/* Additional Requirements */}
      <div className="unique-form-group checkbox">
        <label>
          <input
            type="checkbox"
            checked={formData.showAdditionalReq}
            onChange={(e) => handleInputChange('showAdditionalReq', e.target.checked)}
          />
          <span className="unique-checkbox-label">הצג דרישות נוספות</span>
        </label>
      </div>

      {/* Display additional requirements if checkbox is checked */}
      {formData.showAdditionalReq && (
        <div className="unique-form-group">
          <label>דרישות נוספות</label>
          <textarea
            value={formData.additionalRequirements}
            onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '12px', textAlign: 'right' }}
          />
        </div>
      )}

      {/* Submit button to proceed to the next step */}
      <button className="unique-submit-button" onClick={handleSubmit}>
        המשך לשלב הבא
      </button>
    </div>
  );
}
