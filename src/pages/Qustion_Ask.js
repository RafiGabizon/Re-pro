import React from 'react';
import '../styles/questionAsk.css';
import QuestionFrame from '../Components/QuestionFrame'; // ייבוא הקומפוננטה

export default function QuestionAsk() {
  const questionsAndAnswers = [
    { question: "איך עובד התהליך?", answer: "תשובה 1" },
    { question: "שאלה 2", answer: "תשובה 2" },
    { question: "שאלה 3", answer: "תשובה 3" },
    // המשך הוספת שאלות ותשובות לפי הצורך...
  ];

  return (
    <div className="question-ask-page">
      <main>
        <div className="question-ask-section">
          <h2>שאלות ותשובות</h2>
          {questionsAndAnswers.map((qa, index) => (
            <QuestionFrame 
              key={index}
              question={qa.question}
              answer={qa.answer}
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