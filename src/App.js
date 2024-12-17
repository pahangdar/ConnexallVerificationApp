import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import WaitingScreen from './components/WaitingScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { connectToWebSocket, sendMessage } from './websocket';

function App() {
  const [appID, setAppID] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);
  const [requesterAppID, setRequesterAppID] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const ws = connectToWebSocket((message) => {
      if (message.type === 'assign_id') {
        setAppID(message.appID);
      } else if (message.type === 'start_verification') {
        setAppointmentId(message.appointmentId);
        setRequesterAppID(message.requesterAppID);
        setPatientData(message.patientData);
        navigate('/verify'); // Navigate to the QuestionScreen route
      }
    });

    return () => ws.close();
  }, []);

  const navigate = useNavigate(); // To programmatically navigate between routes

  const handleVerificationComplete = (result) => {
    setVerificationResult(result);
    sendMessage({
      type: 'verification_result',
      appointmentId,
      result: result.every((r) => r.isCorrect) ? 'Confirmed' : 'Not Confirmed',
      resultDetails: result,
      targetAppID: requesterAppID,
    });
    navigate('/result'); // Navigate to the ResultScreen route
  };

  return (
    <Routes>
      <Route path="/" element={<WaitingScreen appID={appID} />} />
      <Route
        path="/verify"
        element={<QuestionScreen patientData={patientData} onComplete={handleVerificationComplete}  appID={appID} />}
      />
      <Route path="/result" element={<ResultScreen result={verificationResult} appID={appID} />} />
    </Routes>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
