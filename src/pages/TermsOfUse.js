import React from 'react';
import '../styles/styles.css';

export default function TermsOfUse({ toggleContactModal }) {
  return (
    <div>
      <div className="TermsOfUse">
        <h2>תנאי שימוש</h2>
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
