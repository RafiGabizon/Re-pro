// Importing necessary dependencies
import React, { useState } from 'react'; // Import React and useState hook for managing state
import '../styles/questionFrame.css'; // Import CSS for styling the QuestionFrame component

// Functional component for rendering a question and its corresponding answer
const QuestionFrame = ({ question, answer }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false); // State to toggle the visibility of the answer

  // Function to toggle the answer's visibility
  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(!isAnswerVisible); // Invert the current visibility state
  };

  return (
    <div className="question-frame">
      {/* Display the question text */}
      <h3 className="question-text">{question}</h3>
      {/* Button to toggle the visibility of the answer */}
      <button 
        className="toggle-answer-button" 
        onClick={toggleAnswerVisibility}
        aria-label={isAnswerVisible ? "Hide answer" : "Show answer"} // Accessibility label for screen readers
      >
        {isAnswerVisible ? 'הסתר תשובה' : 'הראה תשובה'} {/* Button text changes based on visibility */}
      </button>
      {/* Conditionally render the answer overlay */}
      {isAnswerVisible && (
        <div className="answer-overlay">
          <div className="answer-frame">
            <div className="answer-content">
              {/* Display the answer text */}
              <p>{answer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionFrame; // Export the component for use in other parts of the application
