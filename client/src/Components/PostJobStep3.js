// Importing necessary dependencies
import React, { useState } from 'react'; // Import React and useState hook for managing state

// Functional component for the third step of job posting
export default function PostJobStep3({ onBack, formData, setFormData, jobs, updateJobs, onComplete }) {
  const [errors, setErrors] = useState({}); // State to track form validation errors
  const [uploadedImages, setUploadedImages] = useState([]); // State to store additional uploaded images

  // Handle changes to form fields
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors for the field if it was previously invalid
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle single file upload for the main image
  const handleFileUpload = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange(field, reader.result); // Store the uploaded file as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle multiple file uploads for additional images
  const handleMultipleImagesUpload = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    const newImages = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result); // Push each file as a base64 string
        if (newImages.length === files.length) {
          setUploadedImages(prev => [...prev, ...newImages]); // Update state when all files are processed
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Validate form fields before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.mainImage) newErrors.mainImage = 'נדרשת תמונה ראשית'; // Main image is required
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const jobToAdd = {
        ...formData,
        id: Date.now(), // Generate a unique ID for the job
        mainImg: formData.mainImage || "https://via.placeholder.com/150", // Use placeholder if no image is provided
        countryFlag: "https://via.placeholder.com/30", // Placeholder for country flag
        status: 'ממתין לאישור', // Default status for new jobs
        additionalImages: uploadedImages // Include uploaded images
      };
      
      updateJobs([...jobs, jobToAdd]); // Add the job to the jobs list
      localStorage.removeItem('jobPostingStep1'); // Clear form data from local storage
      localStorage.removeItem('jobPostingStep2');
      localStorage.removeItem('jobPostingStep3');
      alert('המשרה נשלחה לאישור המנהל'); // Success message
      onComplete(); // Call completion callback
    }
  };

  return (
    <div className="unique-jobposting-content">
      <h2>פרסום משרה חדשה</h2>
      <h4>שלב 3 מתוך 3 - מדיה ותמונות</h4>

      {/* Main Image Upload */}
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

      {/* Video URL Input */}
      <div className="unique-form-group">
        <label>סרטון תדמית</label>
        <input
          type="text"
          value={formData.videoUrl || ''}
          onChange={(e) => handleInputChange('videoUrl', e.target.value)}
          placeholder="הכנס קישור לסרטון (YouTube/Vimeo)"
        />
      </div>

      {/* Additional Images Upload */}
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

      {/* Explanation Section */}
      <div className="about-section" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h2>איך זה עובד?</h2>
        <p>לאחר שליחת המשרה, היא תועבר לאישור המנהל במערכת. ברגע שהמשרה תאושר, היא תפורסם באתר ותהיה זמינה למועמדים פוטנציאליים.</p>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          className="unique-submit-button" 
          style={{ backgroundColor: '#6c757d' }}
          onClick={onBack}
        >
          חזור {/* "Back" */}
        </button>
        <button 
          className="unique-submit-button"
          onClick={handleSubmit}
        >
          שלח משרה לאישור {/* "Submit Job for Approval" */}
        </button>
      </div>
    </div>
  );
}
