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
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
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
    <div className="register-container">
      <div className="register-content">
        <h2>הרשמה</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">שם משתמש</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">כתובת אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">מספר טלפון נייד</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group checkbox">
              <label htmlFor="acceptTerms">אני מאשר/ת את תנאי השימוש</label>
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">המשך להשלמת הרישום</button>
        </form>
      </div>
    </div>
  );
}
