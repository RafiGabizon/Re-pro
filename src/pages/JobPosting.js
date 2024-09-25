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

    // Allow only numeric input and restrict phone number to 12 digits
    if (name === 'phoneNumber') {
      const onlyNumbers = value.replace(/\D/g, ''); // Remove non-numeric characters
      if (onlyNumbers.length > 12) return; // Limit the phone number to 12 digits
      setFormData((prevData) => ({
        ...prevData,
        phoneNumber: onlyNumbers,
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value.trim(),
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
    <div className="unique-jobposting-container">
      <div className="unique-jobposting-content">
        <h2>הרשמת מעסיק</h2>
        <form onSubmit={handleSubmit}>
          <div className="unique-form-group">
            <label htmlFor="firstName">שם פרטי</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="שם פרטי"
              value={formData.firstName}
              onChange={handleChange}
              required
              maxLength="20" // Limit to 20 characters
              title="Letters and numbers only, max 20 characters"
            />
          </div>

          <div className="unique-form-group">
            <label htmlFor="lastName">שם משפחה</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="שם משפחה"
              value={formData.lastName}
              onChange={handleChange}
              required
              maxLength="20" // Limit to 20 characters
              title="Letters and numbers only, max 20 characters"
            />
          </div>

          <div className="unique-form-group">
            <label htmlFor="companyName">שם חברה</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="שם חברה"
              value={formData.companyName}
              onChange={handleChange}
              required
              maxLength="20" // Limit to 20 characters
              title="Letters and numbers only, max 20 characters"
            />
          </div>

          <div className="unique-form-group">
            <label htmlFor="phoneNumber">מספר טלפון</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="WhatsApp מספר"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              maxLength="12" // Restrict to a maximum of 12 digits
              pattern="[0-9]*" // Ensure only numeric characters are allowed
              inputMode="numeric" // Helps mobile devices show numeric keyboard
            />
          </div>

          <div className="unique-form-group">
            <label htmlFor="email">מייל להתחברות</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="מייל להתחברות"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength="20" // Limit to 20 characters
              pattern="[A-Za-z0-9@.]*" // Allow only letters, digits, @, and .
              title="Letters, numbers, '@', and '.', max 20 characters"
            />
          </div>

          <div className="unique-form-group checkbox">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeTerms" className="unique-checkbox-label">
              אני מאשר/ת את{' '}
              <a
                href="/TermsOfUse"
                target="_blank"
                rel="noopener noreferrer"
                className="unique-terms-link"
              >
                תנאי השימוש
              </a>
            </label>
          </div>

          <button type="submit" className="unique-submit-button">
            לשלב הבא
          </button>
        </form>
      </div>
    </div>
  );
}
