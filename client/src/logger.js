import log from 'loglevel';

// Set log level (debug, info, warn, error)
log.setLevel(process.env.NODE_ENV === "production" ? "warn" : "debug");

// Function to send logs to the backend
const sendLogToServer = (level, message) => {
  console.log(level +":"+ message)
};

// Custom logger that logs to console and backend
const logger = {
  info: (message) => {
    sendLogToServer('info', message);
  },
  warn: (message) => {
    sendLogToServer('warn', message);
  },
  error: (message) => {
    sendLogToServer('error', message);
  },
  debug: (message) => {
    sendLogToServer('debug', message);
  },
};

export default logger;
