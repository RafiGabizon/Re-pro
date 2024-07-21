import React from 'react';
import '../styles/styles.css';

export default function Employers({ toggleContactModal }) {
  return (
    <div>
      <div className="Employers">
        <h2>מעסיקים</h2>
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
