import React from 'react';
import '../styles/styles.css';

export default function Policy({ toggleContactModal }) {
  return (
    <div>
      <div className="Policy">
        <h2>מדיניות ופרטיות</h2>
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
