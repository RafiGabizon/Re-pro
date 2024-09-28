import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobPostingForm.css';

const JobPostingForm = ({ onNextStep }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobType: '',
    company: '',
    location: '',
    country: '',
    city: '',
    description: '',
    additionalRequirements: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
    validateField(name, newValue);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'jobTitle':
        if (!value.trim()) error = 'נא להזין את שם התפקיד';
        break;
      case 'jobType':
        if (!value) error = 'נא לבחור היקף משרה';
        break;
      case 'company':
        if (!value.trim()) error = 'נא להזין את שם החברה';
        break;
      case 'location':
        if (!value.trim()) error = 'נא להזין את מיקום העבודה';
        break;
      case 'country':
        if (!value) error = 'נא לבחור מדינה';
        break;
      case 'city':
        if (!value) error = 'נא לבחור עיר';
        break;
      case 'description':
        if (!value.trim()) error = 'נא להזין תיאור משרה';
        else if (value.length > 500) error = 'תיאור המשרה ארוך מדי';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'יש לאשר את תנאי השימוש';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      console.log('הטופס נשלח:', formData);
      onNextStep(formData);
    } else {
      alert('יש לתקן את השגיאות בטופס');
    }
  };

  const toggleAdditionalRequirements = () => {
    // כאן תוכל להוסיף לוגיקה להצגת/הסתרת שדה דרישות נוספות
    console.log('Toggle additional requirements');
  };

  return (
    <div className="job-posting-container">
      <h1 className="form-title">פרסום משרה</h1>
      <p className="form-subtitle">שלב 1 מתוך 3</p>
      <form onSubmit={handleSubmit} className="job-posting-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="jobType">היקף משרה</label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
            >
              <option value="">בחר היקף משרה</option>
              <option value="full-time">משרה מלאה</option>
              <option value="part-time">משרה חלקית</option>
              <option value="contract">חוזה</option>
            </select>
            {errors.jobType && <span className="error">{errors.jobType}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">תפקיד</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
            {errors.jobTitle && <span className="error">{errors.jobTitle}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="company">שם מותג</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
            {errors.company && <span className="error">{errors.company}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="location">התחייבות עתידית</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            {errors.location && <span className="error">{errors.location}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">מדינה</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">בחר מדינה</option>
              <option value="israel">ישראל</option>
              <option value="usa">ארצות הברית</option>
              {/* הוסף כאן מדינות נוספות לפי הצורך */}
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="city">עיר</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">בחר עיר</option>
              <option value="tel-aviv">תל אביב</option>
              <option value="jerusalem">ירושלים</option>
              {/* הוסף כאן ערים נוספות לפי הצורך */}
            </select>
            {errors.city && <span className="error">{errors.city}</span>}
          </div>
        </div>
        <div className="form-row">
          <button type="button" className="additional-requirements-btn" onClick={toggleAdditionalRequirements}>
            דרישות נוספות
          </button>
        </div>
        <div className="form-group full-width">
          <label htmlFor="description">תיאור המשרה והחברה</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder='
            החברה הוקמה בשנת...
            החברה עוסקת בתחום...
            העבודה במשרה תכלול...'
            maxLength={500}
            required
          ></textarea>
          <p className="char-count">{formData.description.length} / 500</p>
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            אני מסכים/ה לתנאי השימוש
          </label>
          {errors.agreeTerms && <span className="error">{errors.agreeTerms}</span>}
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">הבא</button>
        </div>
      </form>
    </div>
  );
};

const JobPostingWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNextStep = (data) => {
    setFormData(prevData => ({ ...prevData, ...data }));
    setStep(prevStep => prevStep + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <JobPostingForm onNextStep={handleNextStep} />;
      case 2:
        return <div>קומפוננטה לשלב 2 (יש ליישם)</div>;
      case 3:
        return <div>קומפוננטה לשלב 3 (יש ליישם)</div>;
      default:
        return <div>הטופס הושלם</div>;
    }
  };

  return (
    <div className="job-posting-wizard">
      {renderStep()}
    </div>
  );
};

export default JobPostingWizard;