import React from 'react';
import '../styles/contactAdvisor.css';  // Ensure this path is correct

const ContactAdvisor = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <h2>פנייה ליועץ תעסוקתי</h2>
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <label htmlFor="name">שם מלא:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="הכנס את שמך המלא" 
            required 
            aria-required="true"
          />

          <label htmlFor="email">אימייל:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="הכנס את האימייל שלך" 
            required 
            aria-required="true"
          />

          <label htmlFor="phone">טלפון:</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            placeholder="הכנס את מספר הטלפון שלך" 
            required 
            aria-required="true"
          />

          <label htmlFor="message">הודעה:</label>
          <textarea 
            id="message" 
            name="message" 
            placeholder="הכנס את ההודעה שלך" 
            rows="4" 
            required 
            aria-required="true"
          ></textarea>

          <button type="submit" className="submit-button">שלח</button>
        </form>
      </div>
    </div>
  );
};

export default ContactAdvisor;
