import React from 'react';
import '../styles/styles.css';

export default function LogIn({ toggleContactModal }) {
  return (
    <div>
      <div className="LogIn">
        <h2>איזור אישי</h2>
      </div>
      <button 
        className="consultant-button" 
        onClick={toggleContactModal}
        aria-label="Contact career advisor"
      >
        פנייה ליועץ תעסוקתי
      </button>
    </div>
  );
}
