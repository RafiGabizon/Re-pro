import React from 'react';
import '../styles/styles.css';

export default function Articles({ toggleContactModal }) {
  return (
    <div>
      <div className="Articles">
        <h2>כתבות</h2>
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
