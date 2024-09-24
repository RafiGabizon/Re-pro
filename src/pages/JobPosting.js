import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/jobPosting.css'; 

export default function JobPosting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agreeTerms) {
      console.log('Form submitted:', formData);
      navigate('/NextStepJobPosting'); // Redirect to the next step
    } else {
      alert('יש לאשר את תנאי השימוש להמשך התליך');
    }
  };

  return (
    <div className="jobposting-container">
      <h2 className="form-title">הרשמת מעסיק</h2>
      
      {/* Google Sign-in Button */}
      <button className="google-signin-button">להמשיך עם Google</button>
      
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
        <div className="form-group terms">
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            אני מאשר/ת שקראתי ואני מסכים/ה
          </label>
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            למדיניות הפרטיות ולתנאי השימוש
          </a>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">לשלב הבא</button>
      </form>
    </div>
  );
}
