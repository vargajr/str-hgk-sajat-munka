const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();

app.use(express.static('public'));
app.use('/person', require('./entities/person/person.router'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  res.status(404);
  res.json('An error occured. Please contact system administrators.');
  next();
});

module.exports = app;
