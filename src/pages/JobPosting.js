import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/jobPosting.css';

/* JobPosting component: handles the form state and submission for job postings */
export default function JobPosting() {
  const navigate = useNavigate();

  /* useState hook: manages form input data */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    agreeTerms: false,
  });

  /* handleChange: updates form data when user types or checks a box */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /* handleSubmit: handles form submission, validates terms agreement, and navigates to the next step */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agreeTerms) {
      console.log('Form submitted:', formData);
      navigate('/NextStepJobPosting'); // Redirect to the next step
    } else {
      alert('יש לאשר את תנאי השימוש להמשך התליך');
    }
  };

  /* Render the Job Posting form */
  return (
    <div className="jobposting-container">
      <h2 className="form-title">הרשמת מעסיק</h2>


      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="jobposting-form">
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="שם פרטי"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="lastName"
            placeholder="שם משפחה"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="companyName"
            placeholder="Company name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="WhatsApp מספר"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="מייל להתחברות"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="terms">
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            אני מאשר/ת שקראתי ואני מסכים/ה ל
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              מדיניות הפרטיות ותנאי השימוש
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">לשלב הבא</button>
      </form>
    </div>
  );
}
