import React from 'react';
import './ErrorPopup.css';

interface ErrorPopupProps {
  error: boolean;
  errorMsg: Error;
  onIgnore: () => void;
  onReset: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ error, errorMsg, onIgnore, onReset }) => {
  if (!error) {
    return null; // Don't render anything if error is false
  }

  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <h2>Error!</h2>
        <div className="error-details">
          <p>A backend error occurred. Please try again later.</p>
          <p className="error-msg">Error message: {errorMsg.message}</p>
          <p className="error-stack">Error stack: {errorMsg.stack}</p>
        </div>
        <div className="error-popup-buttons">
          <button onClick={onIgnore}>Ignore</button>
          <button onClick={onReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
