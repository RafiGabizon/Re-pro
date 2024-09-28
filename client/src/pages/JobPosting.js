import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import DOMPurify from 'dompurify';
import '../styles/jobPosting.css';
import { Link } from 'react-router-dom';

export default function JobPosting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    countryCode: '',
    phoneNumber: '',
    email: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [countryCodes, setCountryCodes] = useState([]);

  useEffect(() => {
    const storedCodes = localStorage.getItem('countryCodes');
    if (storedCodes) {
      setCountryCodes(JSON.parse(storedCodes));
    } else {
      fetchCountryCodes();
    }
  }, []);

  const fetchCountryCodes = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags');
      const data = await response.json();
      const codes = data.map((country) => ({
        name: country.name.common,
        code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
      }));
      setCountryCodes(codes);
      localStorage.setItem('countryCodes', JSON.stringify(codes));
    } catch (error) {
      console.error("שגיאה בטעינת קודי מדינות:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const sanitizedValue = type === 'checkbox' ? checked : DOMPurify.sanitize(value.trim());

    setFormData((prevData) => ({
      ...prevData,
      [name]: sanitizedValue,
    }));

    validateField(name, sanitizedValue);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'companyName':
        if (value.length < 2) {
          error = 'יש להזין לפחות 2 תווים';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'יש להזין כתובת אימייל תקינה';
        }
        break;
      case 'phoneNumber':
        if (formData.countryCode && value) {
          const phoneNumber = parsePhoneNumberFromString(value, formData.countryCode);
          if (!phoneNumber || !phoneNumber.isValid()) {
            error = 'יש להזין מספר טלפון תקין';
          }
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => validateField(key, formData[key]));
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'יש לאשר את תנאי השימוש';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      console.log('הטופס נשלח:', formData);
      navigate('/JobPostingForm');
    } else {
      alert('יש לתקן את השגיאות בטופס');
    }
  };

  return (
    <div className="unique-jobposting-container">
      <div className="unique-jobposting-content">
        <h2>הרשמת מעסיק</h2>
        <h4>משתמש רשום ? <Link to={'/login'}>לחץ כאן !</Link></h4> 
        <form onSubmit={handleSubmit} noValidate>
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
              aria-required="true"
              aria-invalid={!!errors.firstName}
              aria-describedby="firstName-error"
            />
            {errors.firstName && <span id="firstName-error" className="error-message">{errors.firstName}</span>}
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
              aria-required="true"
              aria-invalid={!!errors.lastName}
              aria-describedby="lastName-error"
            />
            {errors.lastName && <span id="lastName-error" className="error-message">{errors.lastName}</span>}
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
              aria-required="true"
              aria-invalid={!!errors.companyName}
              aria-describedby="companyName-error"
            />
            {errors.companyName && <span id="companyName-error" className="error-message">{errors.companyName}</span>}
          </div>

          <div className="unique-form-group phone-group">
            <label htmlFor="phoneNumber">מספר טלפון</label>
            <div className="phone-input-container">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="מספר טלפון"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.phoneNumber}
                aria-describedby="phoneNumber-error"
              />
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.countryCode}
                aria-describedby="countryCode-error"
              >
                <option value="">קידומת</option>
                {countryCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.code} ({country.name})
                  </option>
                ))}
              </select>
            </div>
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
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
          </div>

          <div className="unique-form-group checkbox">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.agreeTerms}
                aria-describedby="agreeTerms-error"
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
            {errors.agreeTerms && <span id="agreeTerms-error" className="error-message">{errors.agreeTerms}</span>}
          </div>

          <button type="submit" className="unique-submit-button">
            לשלב הבא
          </button>
        </form>
      </div>
    </div>
  );
}