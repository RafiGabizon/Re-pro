import React, { useState } from 'react';
import '../styles/questionAsk.css';

const QuestionItem = ({ question, answer, isVisible, toggleVisibility }) => (
  <div className="question-answer-pair">
    <h3>{question}</h3>
    <button 
      className="toggle-answer-button" 
      onClick={toggleVisibility}
      aria-label={isVisible ? "Hide answer" : "Show answer"}
    >
      {isVisible ? 'הסתר תשובה' : 'הראה תשובה'}
    </button>
    {isVisible && <p>{answer}</p>}
  </div>
);

export default function QuestionAsk() {
  const [visibleAnswer, setVisibleAnswer] = useState(null);

  const toggleAnswerVisibility = (index) => {
    setVisibleAnswer(prevIndex => (prevIndex === index ? null : index));
  };


  const questionsAndAnswers = [
    { question: "איך עובד התהליך?", answer: "תשובה 1" },
    { question: "שאלה 2", answer: "תשובה 2" },
    { question: "שאלה 3", answer: "תשובה 3" },
    // Continue adding questions and answers as needed...
  ];

  return (
    <div className="question-ask-page">
      <main>
        <div className="question-ask-section">
          <h2>שאלות ותשובות</h2>
          {questionsAndAnswers.map((qa, index) => (
            <QuestionItem 
              key={index}
              question={qa.question}
              answer={qa.answer}
              isVisible={visibleAnswer === index}
              toggleVisibility={() => toggleAnswerVisibility(index)}
            />
          ))}
        </div>
        <div className="additional-info">
          <p>השארת פרטים וקישורים</p>
          <div className="newsletter-social">
            <p>הרשמה לניוזלטר</p>
          </div>
        </div>
      </main>
    </div>
  );
}
