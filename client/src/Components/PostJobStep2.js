// Importing necessary dependencies
import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle management

// Options for dropdowns
const visaOptions = [
  'החברה מנפיקה אישורי עבודה',
  'עוזרים בהוצאת ויזה',
  'באחריות העובד',
  'דואגים לויזת עבודה לפני ההמראה',
  'אחר'
];

const flightOptions = [
  'לא רלוונטי',
  'אין החזרי טיסות',
  'החזר הוצאת הטיסה במשכורת',
  'החזר לאחר תקופת הכשרה',
  'קונים לך את הכרטיס',
  'השתתפות חלקית בכרטיס'
];

const accommodationOptions = [
  'עוזרים במציאת דירה',
  'דירות עובדים מסובסדות',
  'מגורים על חשבון החברה',
  'לא מספקים מגורים'
];

const salaryOptions = [
  'ממוצע שכר',
  'תנאים מעולים',
  'שכר גבוה למתאימים'
];

// Functional component for the second step of job posting
export default function PostJobStep2({ onNext, onBack, formData, setFormData }) {
  const [errors, setErrors] = useState({}); // State to track form validation errors
  const [showSalaryInput, setShowSalaryInput] = useState(false); // State to conditionally display salary input

  // Effect to determine if the salary input should be displayed based on the selected salary type
  useEffect(() => {
    setShowSalaryInput(formData.salaryType === 'ממוצע שכר');
  }, [formData.salaryType]);

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

    // Reset salary amount if the salary type changes
    if (field === 'salaryType' && value !== 'ממוצע שכר') {
      setFormData(prev => ({
        ...prev,
        salaryAmount: ''
      }));
    }
  };

  // Validate form fields before proceeding
  const validateForm = () => {
    const newErrors = {};

    if (!formData.visaType) newErrors.visaType = 'נא לבחור אפשרות'; // Visa type is required
    if (!formData.flightType) newErrors.flightType = 'נא לבחור אפשרות'; // Flight type is required
    if (!formData.accommodationType) newErrors.accommodationType = 'נא לבחור אפשרות'; // Accommodation type is required
    if (!formData.salaryType) newErrors.salaryType = 'נא לבחור אפשרות'; // Salary type is required
    if (formData.salaryType === 'ממוצע שכר' && !formData.salaryAmount) {
      newErrors.salaryAmount = 'נא להזין סכום'; // Salary amount is required if "ממוצע שכר" is selected
    }

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem('jobPostingStep2', JSON.stringify(formData)); // Save form data to local storage
      onNext(); // Proceed to the next step
    }
  };

  return (
    <div className="unique-jobposting-content">
      <h2>פרסום משרה חדשה</h2>
      <h4>שלב 2 מתוך 3 - תנאי העסקה</h4>

      {/* Visa Options */}
      <div className="unique-form-group">
        <label>הוצאת ויזה</label>
        <select
          value={formData.visaType || ''}
          onChange={(e) => handleInputChange('visaType', e.target.value)}
        >
          <option value="">בחר אפשרות</option>
          {visaOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.visaType && <span className="error-message">{errors.visaType}</span>}
      </div>

      {/* Flight Reimbursement Options */}
      <div className="unique-form-group">
        <label>החזרי טיסות</label>
        <select
          value={formData.flightType || ''}
          onChange={(e) => handleInputChange('flightType', e.target.value)}
        >
          <option value="">בחר אפשרות</option>
          {flightOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.flightType && <span className="error-message">{errors.flightType}</span>}
      </div>

      {/* Accommodation Options */}
      <div className="unique-form-group">
        <label>מגורי עובדים</label>
         <select
          value={formData.accommodationType || ''}
          onChange={(e) => handleInputChange('accommodationType', e.target.value)}
        >
          <option value="">בחר אפשרות</option>
          {accommodationOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.accommodationType && <span className="error-message">{errors.accommodationType}</span>}
      </div>

      {/* Salary Options */}
      <div className="unique-form-group">
        <label>משכורת ב-USD</label>
        <select
          value={formData.salaryType || ''}
          onChange={(e) => handleInputChange('salaryType', e.target.value)}
        >
          <option value="">בחר אפשרות</option>
          {salaryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.salaryType && <span className="error-message">{errors.salaryType}</span>}
      </div>

      {/* Conditional Salary Amount Input */}
      {showSalaryInput && (
        <div className="unique-form-group">
          <label>סכום בדולרים</label>
          <input
            type="number"
            value={formData.salaryAmount || ''}
            onChange={(e) => handleInputChange('salaryAmount', e.target.value)}
            placeholder="הכנס סכום בדולרים"
          />
          {errors.salaryAmount && <span className="error-message">{errors.salaryAmount}</span>}
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          className="unique-submit-button" 
          style={{ backgroundColor: '#6c757d' }}
          onClick={onBack}
        >
          חזור {/* "Back" */}
        </button>
        <button className="unique-submit-button" onClick={handleSubmit}>
          המשך לשלב הבא {/* "Next Step" */}
        </button>
      </div>
    </div>
  );
}
