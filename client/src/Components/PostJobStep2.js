import React, { useState, useEffect } from 'react';

const visaOptions = [
  'החברה מנפיקה אישורי עבודה',
  'עוזרים בהוצאת ויזה',
  'באחריות העובד',
  'דואגים לויזת עבודה לפני ההמראה',
  'אחר'
];

const flightOptions = [
  'לא רלוונטי',
  'אין החזרי טיסות',
  'החזר הוצאת הטיסה במשכורת',
  'החזר לאחר תקופת הכשרה',
  'קונים לך את הכרטיס',
  'השתתפות חלקית בכרטיס'
];

const accommodationOptions = [
  'עוזרים במציאת דירה',
  'דירות עובדים מסובסדות',
  'מגורים על חשבון החברה',
  'לא מספקים מגורים'
];

const salaryOptions = [
  'ממוצע שכר',
  'תנאים מעולים',
  'שכר גבוה למתאימים'
];

export default function PostJobStep2({ onNext, onBack, formData, setFormData }) {
  const [errors, setErrors] = useState({});
  const [showSalaryInput, setShowSalaryInput] = useState(false);

  useEffect(() => {
    setShowSalaryInput(formData.salaryType === 'ממוצע שכר');
  }, [formData.salaryType]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    if (field === 'salaryType') {
      if (value !== 'ממוצע שכר') {
        setFormData(prev => ({
          ...prev,
          salaryAmount: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.visaType) newErrors.visaType = 'נא לבחור אפשרות';
    if (!formData.flightType) newErrors.flightType = 'נא לבחור אפשרות';
    if (!formData.accommodationType) newErrors.accommodationType = 'נא לבחור אפשרות';
    if (!formData.salaryType) newErrors.salaryType = 'נא לבחור אפשרות';
    if (formData.salaryType === 'ממוצע שכר' && !formData.salaryAmount) {
      newErrors.salaryAmount = 'נא להזין סכום';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem('jobPostingStep2', JSON.stringify(formData));
      onNext();
    }
  };

  return (
    <div className="unique-jobposting-content">
      <h2>פרסום משרה חדשה</h2>
      <h4>שלב 2 מתוך 3 - תנאי העסקה</h4>

      <div className="unique-form-group">
        <label>הוצאת ויזה</label>
        <select
          value={formData.visaType || ''}
          onChange={(e) => handleInputChange('visaType', e.target.value)}
        >
          <option value="">בחר אפשרות</option>
          {visaOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.visaType && <span className="error-message">{errors.visaType}</span>}
      </div>

      <div className="unique-form-group">
        <label>החזרי טיסות</label>
        <select
          value={formData.flightType || ''}
          onChange={(e) => handleInputChange('flightType', e.target.value)}
        >
          <option value="">בחר אפשרות</option>
          {flightOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.flightType && <span className="error-message">{errors.flightType}</span>}
      </div>

      <div className="unique-form-group">
        <label>מגורי עובדים</label>
         <select
          value={formData.accommodationType || ''}
          onChange={(e) => handleInputChange('accommodationType', e.target.value)}
        >
          <option value="">בחר אפשרות</option>
          {accommodationOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.accommodationType && <span className="error-message">{errors.accommodationType}</span>}
      </div>

      <div className="unique-form-group">
        <label>משכורת ב-USD</label>
        <select
          value={formData.salaryType || ''}
          onChange={(e) => handleInputChange('salaryType', e.target.value)}
        >
          <option value="">בחר אפשרות</option>
          {salaryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.salaryType && <span className="error-message">{errors.salaryType}</span>}
      </div>

      {showSalaryInput && (
        <div className="unique-form-group">
          <label>סכום בדולרים</label>
          <input
            type="number"
            value={formData.salaryAmount || ''}
            onChange={(e) => handleInputChange('salaryAmount', e.target.value)}
            placeholder="הכנס סכום בדולרים"
          />
          {errors.salaryAmount && <span className="error-message">{errors.salaryAmount}</span>}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          className="unique-submit-button" 
          style={{ backgroundColor: '#6c757d' }}
          onClick={onBack}
        >
          חזור
        </button>
        <button className="unique-submit-button" onClick={handleSubmit}>
          המשך לשלב הבא
        </button>
      </div>
    </div>
  );
}