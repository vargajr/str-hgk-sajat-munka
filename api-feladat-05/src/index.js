const mongoose = require('mongoose');
const logger = require('./config/logger');
const server = require('./server');

mongoose.Promise = global.Promise;

const port = 3000;

mongoose.connect('mongodb+srv://NodeUser:zcoV1RIZx6mNfVKe@cluster0.yofa0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('MongoDB connection has been established succesfully.'))
  .catch((err) => {
    logger.error(err);
    process.exit();
  });

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
