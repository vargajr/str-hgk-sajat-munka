const { join } = require('path');
const winston = require('winston');

const options = {
  file: {
    level: 'debug',
    filename: join(__dirname, '..', '..', 'app.log'),
    format: winston.format.simple(),
  },
  console: {
    level: 'debug',
  },
};

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message) => logger.info(message),
};

module.exports = logger;
