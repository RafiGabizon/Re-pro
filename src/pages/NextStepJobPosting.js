import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NextStepJobPosting.css'; 

export default function NextStepJobPosting() {
  const navigate = useNavigate();

  // State for required fields
  const [role, setRole] = useState('');
  const [brand, setBrand] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showAdditionalRequirements, setShowAdditionalRequirements] = useState(false);

  const maxChars = 500;

  // Check if all required fields are filled
  const isFormValid = role && brand && country && city && jobDescription;

  // Function to handle next button click
  const handleNextClick = () => {
    if (isFormValid) {
      navigate('/NextStepJobPosting1'); // Replace '/NextStep' with the actual route for the next step
    } else {
      // Alert for missing required fields
      let missingFields = [];

      if (!role) missingFields.push("תפקיד");
      if (!brand) missingFields.push("שם מותג");
      if (!country) missingFields.push("מדינה");
      if (!city) missingFields.push("עיר");
      if (!jobDescription) missingFields.push("תיאור המשרה והחברה");

      alert(`נא למלא את השדות החסרים: ${missingFields.join(', ')}`);
    }
  };

  return (
    <div className="job-posting-container">
      <h2 className="step-indicator">שלב 1 מתוך 3</h2>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>תפקיד*</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">הקף משרה (בחירה מרובה)</option>
              <option value="משרה מלאה">משרה מלאה</option>
              <option value="משרה חלקית">משרה חלקית</option>
              <option value="פרילנס">פרילנס</option>
            </select>
          </div>
          <div className="form-group">
            <label>שם מותג*</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="הזן שם מותג"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>מדינה*</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">בחר מדינה</option>
              <option value="ישראל">ישראל</option>
              <option value="ארצות הברית">ארצות הברית</option>
              <option value="צרפת">צרפת</option>
            </select>
          </div>
          <div className="form-group">
            <label>עיר*</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">בחר עיר</option>
              <option value="תל אביב">תל אביב</option>
              <option value="ירושלים">ירושלים</option>
              <option value="חיפה">חיפה</option>
            </select>
          </div>
        </div>

        <div className="form-row additional-requirements">
          <button
            className="add-requirements"
            onClick={() => setShowAdditionalRequirements(!showAdditionalRequirements)}
          >
            {showAdditionalRequirements ? 'הסתר דרישות נוספות' : 'דרישות נוספות'}
          </button>
        </div>

        {showAdditionalRequirements && (
          <div className="form-row">
            <div className="form-group">
              <label>דרישות נוספות</label>
              <textarea placeholder="הזן דרישות נוספות כאן..." />
            </div>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>תיאור המשרה והחברה*</label>
            <textarea
              maxLength={maxChars}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="הזן תיאור משרה עד 500 תווים"
            />
            <p className="char-count">{jobDescription.length} / {maxChars}</p>
          </div>
        </div>

        <button
          className="next-button"
          onClick={handleNextClick}
        >
          הבא
        </button>
      </div>
    </div>
  );
}
