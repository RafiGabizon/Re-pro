import React from 'react';
import '../styles/styles.css';

export default function About({ toggleContactModal }) {
  return (
    <div>
      <div className="About">
        <h2>אודות</h2>
      </div>
      <button 
        className="consultant-button" 
        onClick={toggleContactModal}
        aria-label="Contact career advisor"
      >
        פנייה ליועץ תעסוקתי
      </button>
    </div>
  )
}
