import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/ResultScreen.css';


function ResultScreen({ result, appID }) {
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
    <>
    <div className="result-screen">
      <div className="result-container">
        <h1 className="result-title">Verification Complete</h1>
        <p>Thank you for completing the verification process.</p>
        <p>Please refer to the front desk receptionist for further assistance.</p>
      </div>
      {/* Kiosk ID */}
      <p className="kiosk-id">Kiosk ID: {appID || 'Requesting ID from server...'}</p>
    </div>
    <div>
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
    </>
  );
}

export default ResultScreen;
