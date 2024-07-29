import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/register.css';

export default function RegisterStepTwo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: '',
    birthDate: '',
    country: '',
    city: '',
    englishLevel: '',
    additionalLanguage: '',
    additionalLanguageLevel: '',
    usVisa: false,
    additionalPassport: false,
    additionalPassportCountry: '',
    availabilityDate: '',
    jobTitle: '',
    companyName: '',
    currentlyEmployed: false,
  });

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(prevState => ({...prevState, ...location.state.formData}));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('נתונים מלאים:', formData);
    navigate('/RegisterConfirm', { state: { formData } });
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>השלמת פרטי הרשמה</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>מין</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">בחר</option>
              <option value="male">זכר</option>
              <option value="female">נקבה</option>
              <option value="other">אחר</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">תאריך לידה</label>
            <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="country">ארץ מגורים</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">עיר מגורים</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>רמת שליטה באנגלית</label>
            <select name="englishLevel" value={formData.englishLevel} onChange={handleChange} required>
              <option value="">בחר</option>
              <option value="basic">בסיסית</option>
              <option value="intermediate">בינונית</option>
              <option value="advanced">מתקדמת</option>
              <option value="fluent">שוטפת</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="additionalLanguage">שפה נוספת (אופציונלי)</label>
            <input type="text" id="additionalLanguage" name="additionalLanguage" value={formData.additionalLanguage} onChange={handleChange} />
          </div>
          {formData.additionalLanguage && (
            <div className="form-group">
              <label>רמת שליטה בשפה הנוספת</label>
              <select name="additionalLanguageLevel" value={formData.additionalLanguageLevel} onChange={handleChange} required>
                <option value="">בחר</option>
                <option value="basic">בסיסית</option>
                <option value="intermediate">בינונית</option>
                <option value="advanced">מתקדמת</option>
                <option value="fluent">שוטפת</option>
              </select>
            </div>
          )}
          <div className="form-group checkbox">
            <input type="checkbox" id="usVisa" name="usVisa" checked={formData.usVisa} onChange={handleChange} />
            <label htmlFor="usVisa">יש לי ויזה לארה"ב</label>
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="additionalPassport" name="additionalPassport" checked={formData.additionalPassport} onChange={handleChange} />
            <label htmlFor="additionalPassport">יש לי דרכון נוסף</label>
          </div>
          {formData.additionalPassport && (
            <div className="form-group">
              <label htmlFor="additionalPassportCountry">מדינת הדרכון הנוסף</label>
              <input type="text" id="additionalPassportCountry" name="additionalPassportCountry" value={formData.additionalPassportCountry} onChange={handleChange} required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="availabilityDate">זמינות לתחילת עבודה</label>
            <input type="date" id="availabilityDate" name="availabilityDate" value={formData.availabilityDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">תפקיד נוכחי</label>
            <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="companyName">שם החברה</label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" id="currentlyEmployed" name="currentlyEmployed" checked={formData.currentlyEmployed} onChange={handleChange} />
            <label htmlFor="currentlyEmployed">אני עדיין עובד/ת בתפקיד זה</label>
          </div>
          <button type="submit" className="register-button">סיום הרשמה</button>
        </form>
      </div>
    </div>
  );
}