import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';
import authService from '../services/authService';

export default function InitialRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Allow only numeric input and restrict phone number to 12 digits
    if (name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, ''); // Remove non-numeric characters
      if (onlyNumbers.length > 12) return; // Limit the phone number to 12 digits
      setFormData((prevState) => ({
        ...prevState,
        phone: onlyNumbers,
      }));
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { acceptTerms, ...userData } = formData; // remove acceptTerms before sending
    try {
      const response = await authService.register(userData);
      console.log('Registration successful:', response);
      navigate('/register2', { state: { formData } });  // Navigate to RegisterStepTwo
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="unique-register-container">
      <div className="unique-register-content">
        <h2>הרשמה</h2>
        <form onSubmit={handleSubmit}>
          <div className="unique-form-group">
            <label htmlFor="username">שם משתמש</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="הכנס שם משתמש"
              value={formData.username}
              onChange={handleChange}
              required
              maxLength="20"
              pattern="[A-Za-z0-9]*"
              title="Letters and numbers only, max 20 characters"
            />
          </div>

          <div className="unique-form-group">
            <label htmlFor="email">כתובת אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="הכנס כתובת אימייל"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength="20"
              pattern="[A-Za-z0-9@.]*"
              title="Letters, numbers, '@', and '.', max 20 characters"
            />
          </div>

          <div className="unique-form-group">
            <label htmlFor="phone">מספר טלפון נייד</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="הכנס מספר טלפון"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength="12"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>

          <div className="unique-form-group">
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="הכנס סיסמה"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="unique-form-group checkbox">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="acceptTerms" className="unique-checkbox-label">
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

          <button
            type="submit"
            className="unique-register-button"
          >
            המשך להשלמת תהליך
          </button>
        </form>
      </div>
    </div>
  );
}
