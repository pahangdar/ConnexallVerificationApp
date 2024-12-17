import React from 'react';
import './../css/WaittingScreen.css';

function WaitingScreen({ appID }) {
  return (
    <>
    <div class="context">
      <h1>Welcome to the Verification Kiosk</h1>
      <br></br>
      <h2>Please wait while we prepare your information.</h2>
      <h2>Once ready, kindly inform the front desk receptionist that you have arrived and are ready to check in.</h2>
    </div>
      {/* Kiosk ID */}
      <p className="kiosk-id">Kiosk ID: {appID || 'Requesting ID from server...'}</p>


    <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div>
    </>
  );
}

export default WaitingScreen;
