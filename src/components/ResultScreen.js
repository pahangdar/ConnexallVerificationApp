import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ResultScreen({ result }) {
  const navigate = useNavigate();

  // Redirect to the main page after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Replace '/' with the path of your main page
    }, 3000);

    // Cleanup the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Verification Complete</h1>
      <p>Result: {result.every((r) => r.isCorrect) ? 'Confirmed' : 'Not Confirmed'}</p>
      <h2>Details:</h2>
      <ul>
        {result.map((r, index) => (
          <li key={index}>
            {r.question}: {r.isCorrect ? 'Correct' : 'Incorrect'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultScreen;
