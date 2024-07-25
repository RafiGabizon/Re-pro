// QuestionFrame.js
import React, { useState } from 'react';
import '../styles/questionFrame.css';

const QuestionFrame = ({ question, answer }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(!isAnswerVisible);
    if (!isAnswerVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className="question-frame">
      <h3 onClick={toggleAnswerVisibility} className="question-text">{question}</h3>
      {isAnswerVisible && (
        <div className="answer-overlay">
          <div className="answer-frame">
            <div className="answer-content">
              <p>{answer}</p>
            </div>
            <button onClick={toggleAnswerVisibility} className="close-button">סגור</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionFrame;