import React, { useState } from 'react';

export default function PostJobStep3({ onBack, formData, setFormData, jobs, updateJobs, onComplete }) {
  const [errors, setErrors] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);

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
  };

  const handleFileUpload = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange(field, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setUploadedImages(prev => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mainImage) newErrors.mainImage = 'נדרשת תמונה ראשית';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const jobToAdd = {
        ...formData,
        id: Date.now(),
        mainImg: formData.mainImage || "https://via.placeholder.com/150",
        countryFlag: "https://via.placeholder.com/30",
        status: 'ממתין לאישור',
        additionalImages: uploadedImages
      };
      
      updateJobs([...jobs, jobToAdd]);
      localStorage.removeItem('jobPostingStep1');
      localStorage.removeItem('jobPostingStep2');
      localStorage.removeItem('jobPostingStep3');
      alert('המשרה נשלחה לאישור המנהל');
      onComplete();
    }
  };

  return (
    <div className="unique-jobposting-content">
      <h2>פרסום משרה חדשה</h2>
      <h4>שלב 3 מתוך 3 - מדיה ותמונות</h4>

      <div className="unique-form-group">
        <label>תמונה ראשית</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'mainImage')}
        />
        {formData.mainImage && (
          <img 
            src={formData.mainImage} 
            alt="תמונה ראשית" 
            style={{ maxWidth: '200px', marginTop: '10px' }}
          />
        )}
        {errors.mainImage && <span className="error-message">{errors.mainImage}</span>}
      </div>

      <div className="unique-form-group">
        <label>סרטון תדמית</label>
        <input
          type="text"
          value={formData.videoUrl || ''}
          onChange={(e) => handleInputChange('videoUrl', e.target.value)}
          placeholder="הכנס קישור לסרטון (YouTube/Vimeo)"
        />
      </div>

      <div className="unique-form-group">
        <label>תמונות סביבת עבודה ומגורים</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleImagesUpload}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {uploadedImages.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`תמונת סביבה ${index + 1}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          ))}
        </div>
      </div>

      <div className="about-section" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h2>איך זה עובד?</h2>
        <p>לאחר שליחת המשרה, היא תועבר לאישור המנהל במערכת. ברגע שהמשרה תאושר, היא תפורסם באתר ותהיה זמינה למועמדים פוטנציאליים.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          className="unique-submit-button" 
          style={{ backgroundColor: '#6c757d' }}
          onClick={onBack}
        >
          חזור
        </button>
        <button 
          className="unique-submit-button"
          onClick={handleSubmit}
        >
          שלח משרה לאישור
        </button>
      </div>
    </div>
  );
}