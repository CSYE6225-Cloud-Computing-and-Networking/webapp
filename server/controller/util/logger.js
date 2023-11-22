import { createLogger, transports, format } from "winston";

//logger setup
const logger = createLogger({
    transports: [new transports.File({
      filename: 'webapp.log',
    }),],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  });

export default logger;
