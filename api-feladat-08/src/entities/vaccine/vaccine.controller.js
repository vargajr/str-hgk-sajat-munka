const createError = require('http-errors');
const logger = require('../../config/logger');
const vaccineService = require('./vaccine.service');

exports.create = (req, res, next) => {
  const { name, efficiency } = req.body;
  if (!name || !efficiency) {
    return next(new createError.BadRequest('Required properties: name, efficiency.'));
  }
  const newData = {
    name,
    efficiency,
  };
  return vaccineService.create(newData)
    .then((newVaccine) => {
      res.status(201);
      res.json(newVaccine);
    })
    .catch((err) => {
      logger.debug(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.getAll = (req, res, next) => vaccineService.getAll()
  .then((vaccinae) => {
    res.json(vaccinae);
  })
  .catch((err) => {
    logger.debug(err.message);
    next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
  });

exports.getOneById = (req, res, next) => vaccineService.getOneById(req.params.id)
  .then((vaccine) => {
    if (!vaccine) {
      logger.debug(`No vaccine was found with id: ${req.params.id}`);
      return next(new createError.NotFound(`No vaccine was found with id: ${req.params.id}`));
    }
    return res.json(vaccine);
  })
  .catch((err) => {
    logger.error(err.message);
    next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
  });

exports.update = (req, res, next) => {
  const { name, efficiency } = req.body;
  if (!name || !efficiency) {
    return next(new createError.BadRequest('Required properties: name, efficiency.'));
  }
  const updateData = {
    name,
    efficiency,
  };
  return vaccineService.update(req.params.id, updateData)
    .then((updatedVaccine) => {
      res.status(202);
      res.json(updatedVaccine);
    })
    .catch((err) => {
      logger.debug(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.delete = (req, res, next) => {
  const { id } = req.params;
  vaccineService.delete(id)
    .then(() => {
      res.status(202);
      res.json('Vaccine deleded.');
    })
    .catch((err) => {
      logger.debug(err.message);
      return next(new createError.NotFound(err.message));
    });
};
