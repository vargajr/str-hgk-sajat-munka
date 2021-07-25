require('dotenv').config();
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./config/logger');
const server = require('./server');

mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;

// database connection
if (!config.has('database')) {
  logger.error('No database config found.');
  process.exit();
}
const { username, pwd, host } = config.get('database');
mongoose.connect(`mongodb+srv://${username}:${pwd}@${host}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('MongoDB connection has been established succesfully.'))
  .catch((err) => {
    logger.error(err);
    process.exit();
  });

server.listen(port, () => logger.info(`Server listening at http://localhost:${port}`));
