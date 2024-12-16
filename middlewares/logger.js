import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Logs to console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Logs errors to a file
    new transports.File({ filename: "logs/combined.log" }), // Logs all messages to a file
  ],
});

export default logger; // Export logger using ESM
