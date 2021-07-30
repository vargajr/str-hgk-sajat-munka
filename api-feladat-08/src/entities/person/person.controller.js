const createError = require('http-errors');
const personService = require('./person.service');
const vaccineService = require('../vaccine/vaccine.service');
const logger = require('../../config/logger');

exports.create = async (req, res, next) => {
  const { vaccine } = req.params;
  const vaccId = await vaccineService.returnId();
  const { firstName, lastName, vaccineId, efficiency } = req.body;
  if (!firstName || !lastName || (!vaccine && vaccine !== '')) {
    return next(new createError.BadRequest('Required properties: firstName, lastName, vaccine. If person is not vaccinated use vaccine: ""'));
  }
  const newPersonData = {
    firstName,
    lastName,
    vaccine: vaccine || '',
  };
  return personService.create(newPersonData)
    .then((person) => {
      res.status(201);
      res.json(person);
    })
    .catch((err) => {
      logger.debug(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};
