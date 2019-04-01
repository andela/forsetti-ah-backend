import winston from 'winston';

const loggerOptions = {
  file: {
    level: 'error',
    filename: 'app.log',
    handleExceptions: true,
    json: false,
    maxsize: 5242880,
    colorize: false,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: false,
  }
};

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(loggerOptions.file),
    new winston.transports.Console(loggerOptions.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

export default logger;
