import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

export default function InitialRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן תוכל להוסיף את הלוגיקה של שמירת הנתונים
    console.log('נתונים ראשוניים:', formData);
    navigate('/register2', { state: { formData } });
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>הרשמה</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">שם פרטי</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">שם משפחה</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
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
          <button type="submit" className="register-button">
             המשך להשלמת הרישום
             </button>
        </form>
      </div>
    </div>
  );
}