import React from 'react';
import '../styles/employers.css';
import { reco_ar } from '../data/recommands'; // Adjust the import path as necessary

export default function Employers({ toggleContactModal }) {
  return (
    <div className="employers-page">
      <div className="buttons-container">
        <button aria-label="Post a job">פרסום משרה</button>
        <button aria-label="Business recommendations">עסקים ממליצים</button>
        <button aria-label="Businesses">עסקים</button>
        <button aria-label="Recruit partners/franchisees">גיוס שותפים/זכיינים</button>
      </div>

      <div className="video-placeholder">
        {/* Placeholder for video content */}
      </div>

      <div className="about-us">
        <h2>מי אנחנו</h2>
        <p>כאן תוכל להוסיף הסבר על מי אנחנו וכו וכו</p>
      </div>

      <div className="split-section">
        <div className="presenter">
          <p>פרזנטור של החברה</p>
        </div>
        <div className="how-it-works">
          <p>כאן יש מלל של איך זה עובד</p>
        </div>
      </div>

      <div className="recommendations">
        {reco_ar.map((recommendation, index) => (
          <div key={index} className="recommendation-box">
            <div className="recommendation-video">
              
            </div>
            <h3>{recommendation.Name}</h3>
            <p>{recommendation.jobType}</p>
            <p>{recommendation.recommand}</p>
          </div>
        ))}
      </div>
      <button
        className="consultant-button"
        onClick={toggleContactModal}
        aria-label="Contact a career advisor"
      >
        פנייה ליועץ תעסוקתי
      </button>
    </div>
  );
}
