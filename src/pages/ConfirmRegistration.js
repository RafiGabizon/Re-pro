import React, { useState, useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import '../styles/register.css';

export default function ConfirmRegistration() {
  const location = useLocation();
//   const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleConfirm = () => {
    // כאן תוכל להוסיף את הלוגיקה של שליחת הנתונים לשרת
    console.log('הרשמה אושרה:', formData);
    // הצג פופ-אפ להעלאת סרטון תדמית
    showVideoUploadPopup();
  };

  const showVideoUploadPopup = () => {
    // כאן תוכל ליישם את הלוגיקה של הצגת הפופ-אפ להעלאת סרטון
    alert('נא להעלות סרטון תדמית');
    // לאחר העלאת הסרטון, ניתן לנווט לדף הבית או לדף אחר
    // navigate('/home');
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>אישור פרטי הרשמה</h2>
        <p>אנא אשר/י את הפרטים הבאים:</p>
        <div className="confirmation-details">
          <p>אימייל: {formData.email}</p>
          <p>טלפון: {formData.phone}</p>
          {/* כאן תוכל להציג פרטים נוספים לפי הצורך */}
        </div>
        <button onClick={handleConfirm} className="confirm-button">אשר/י הרשמה</button>
      </div>
    </div>
  );
}