import React, { useState } from 'react';
import '../styles/questionFrame.css';

const QuestionFrame = ({ question, answer }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <div className="question-frame">
      <h3 className="question-text">{question}</h3>
      <button 
        className="toggle-answer-button" 
        onClick={toggleAnswerVisibility}
        aria-label={isAnswerVisible ? "Hide answer" : "Show answer"}
      >
        {isAnswerVisible ? 'הסתר תשובה' : 'הראה תשובה'}
      </button>
      {isAnswerVisible && (
        <div className="answer-overlay">
          <div className="answer-frame">
            <div className="answer-content">
              <p>{answer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionFrame;