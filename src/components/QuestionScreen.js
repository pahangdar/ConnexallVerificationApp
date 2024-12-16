import React, { useState } from 'react';
import './../css/QuestionScreen.css';

function QuestionScreen({ patientData, onComplete, appID }) {
  const questions = [
    { question: 'What is the patient\'s first name?', correctAnswer: patientData.firstName },
    { question: 'What is the patient\'s last name?', correctAnswer: patientData.lastName },
    { question: 'What is the patient\'s phone number?', correctAnswer: patientData.phoneNumber },
    { question: 'What is the patient\'s address?', correctAnswer: patientData.address },
    { question: 'What is the patient\'s date of birth?', correctAnswer: patientData.dateOfBirth },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState([]);

  const handleAnswer = (isCorrect) => {
    setResults([...results, { question: questions[currentQuestionIndex].question, isCorrect }]);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      onComplete(results);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const choices = [
    currentQuestion.correctAnswer,
    'Incorrect 1',
    'Incorrect 2',
    'Incorrect 3',
  ].sort(() => Math.random() - 0.5); // Shuffle choices

  return (
    <div className="question-screen">
      <div className="question-container">
        <h2 className="question-title">{currentQuestion.question}</h2>
        <div className="choices-container">
          {choices.map((choice, index) => (
            <button
              key={index}
              className="choice-button"
              onClick={() =>
                handleAnswer(choice === currentQuestion.correctAnswer)
              }
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
      {/* Kiosk ID */}
      <p className="kiosk-id">Kiosk ID: {appID || 'Requesting ID from server...'}</p>
    </div>
  );
}

export default QuestionScreen;
