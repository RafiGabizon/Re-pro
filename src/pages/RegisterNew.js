import React, { useState } from 'react';
import '../styles/RegisterNew.css';

export default function RegisterNew() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('הסיסמאות אינן תואמות');
      return;
    }
    if (!formData.agreeTerms) {
      alert('יש לאשר את תנאי השימוש');
      return;
    }
    console.log('Form submitted:', formData);
    // כאן תוכל להוסיף לוגיקה לשליחת הנתונים לשרת
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2 className="form-title">הרשמה לחשבון חדש</h2>
        <form onSubmit={handleSubmit} className="register-form">
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
              type="email"
              name="email"
              placeholder="אימייל"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="סיסמה"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="אימות סיסמה"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit" className="register-button">הרשמה</button>
        </form>
      </div>
    </div>
  );
}