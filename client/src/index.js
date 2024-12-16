import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import logger from './logger'; // Import the logger

// Log environment variables for debugging
logger.info("Application Starting...");
logger.info("HTTPS:", process.env.HTTPS);
logger.info("SSL_CRT_FILE:", process.env.SSL_CRT_FILE);
logger.info("SSL_KEY_FILE:", process.env.SSL_KEY_FILE);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1065321115621-qtofco16nrkd2usq1len09a2n4f6j332.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Measure performance and log results
reportWebVitals((metric) => {
  logger.debug("Performance Metrics:", metric);
});

// Log application load completion
logger.info("Application Loaded Successfully");
