// Importing necessary dependencies
import React from 'react'; // Import React library
import '../styles/employers.css'; // Import CSS for styling
import { reco_ar } from '../data/recommands'; // Import recommendations data
import { Link } from 'react-router-dom'; // Import Link for navigation

// Functional component for the Employers page
export default function Employers({ toggleContactModal }) {
  return (
    <div className="employers-page">
      {/* Buttons section */}
      <div className="buttons-container">
        <Link to="/PostJob" className="post-job-button">
          <button aria-label="Post a job">פרסום משרה</button> {/* Button to navigate to the Post Job page */}
        </Link>
        <button aria-label="Business recommendations">עסקים ממליצים</button> {/* Placeholder button */}
        <button aria-label="Businesses">עסקים</button> {/* Placeholder button */}
        <button aria-label="Recruit partners/franchisees">גיוס שותפים/זכיינים</button> {/* Placeholder button */}
      </div>

      {/* Video section */}
      <div className="video-placeholder">
        {/* Placeholder for video content */}
      </div>

      {/* About us section */}
      <div className="about-us">
        <h2>מי אנחנו</h2> {/* Section title */}
        <p>כאן תוכל להוסיף הסבר על מי אנחנו וכו וכו</p> {/* Placeholder text for company description */}
      </div>

      {/* Split section for presenter and process explanation */}
      <div className="split-section">
        <div className="presenter">
          <p>פרזנטור של החברה</p> {/* Placeholder text for presenter information */}
        </div>
        <div className="how-it-works">
          <p>כאן יש מלל של איך זה עובד</p> {/* Placeholder text for process explanation */}
        </div>
      </div>

      {/* Recommendations section */}
      <div className="recommendations">
        {reco_ar.map((recommendation, index) => (
          <div key={index} className="recommendation-box"> {/* Unique key for each recommendation */}
            <div className="recommendation-video">
              {/* Placeholder for recommendation video */}
            </div>
            <h3>{recommendation.Name}</h3> {/* Name of the recommender */}
            <p>{recommendation.jobType}</p> {/* Job type of the recommender */}
            <p>{recommendation.recommand}</p> {/* Recommendation text */}
          </div>
        ))}
      </div>
    </div>
  );
}
