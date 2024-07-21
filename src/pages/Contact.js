import React from 'react';
import '../styles/styles.css';

export default function Contact({ toggleContactModal }) {
  return (
    <div>
      <div className="Contact">
        <h2>צור קשר</h2>
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
