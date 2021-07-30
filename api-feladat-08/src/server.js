const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const morgan = require('morgan');
const logger = require('./config/logger');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();

app.use(morgan('tiny', { stream: logger.stream }));

app.use(express.static('public'));
app.use(express.json());
app.use('/person', require('./entities/person/person.router'));
app.use('/vaccine', require('./entities/vaccine/vaccine.rourer'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  logger.error(`ERR ${err.statusCode}: ${err.message}`);
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message,
  });
  next();
});

module.exports = app;
