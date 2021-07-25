const createError = require('http-errors');
const personService = require('./person.service');
const logger = require('../../config/logger');

exports.personIsVaccinated = (req, res, next) => {
  const { id } = req.params;
  personService.getOneById(id)
    .then((person) => res.json({ vaccined: !!person.vaccine }))
    .catch((err) => {
      logger.debug(err.message);
      if (err.message.includes('Cast to ObjectId failed for value')) {
        return next(new createError.NotFound(err.message));
      }
      return next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.modifyVaccine = (req, res, next) => {
  const { id, vaccine } = req.params;
  return personService.update(id, { vaccine })
    .then((modifiedPerson) => {
      res.status(202);
      res.json(modifiedPerson);
    })
    .catch((err) => {
      logger.debug(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.eraseVaccinatedPeople = (req, res, next) => {
  const { vaccine } = req.params;
  personService.eraseVaccinatedPeople(vaccine)
    .then((result) => {
      if (result.deletedCount === 0) {
        return next(new createError.NotFound(`No person was found who received ${vaccine}`));
      }
      if (!result.ok) {
        next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
      }
      res.status(202);
      return res.json(`Deleted ${result.deletedCount} person who got ${vaccine}.`);
    })
    .catch((err) => {
      logger.debug(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.getVaccinedCount = (req, res, next) => {
  personService.getVaccinedCount()
    .then((count) => {
      res.json({ vaccinatedCount: count });
    })
    .catch((err) => {
      logger.debug(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.getVaccinedPeople = (req, res, next) => {
  personService.getVaccinedPeople()
    .then((vaccinatedPeople) => {
      res.status(200);
      res.json(vaccinatedPeople);
    })
    .catch((err) => {
      logger.debug(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

// CRUD on /person route
exports.getAll = (req, res, next) => personService.getAll()
  .then((people) => res.json(people))
  .catch((err) => {
    logger.debug(err.message);
    return next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
  });

exports.getById = (req, res, next) => personService.getOneById(req.params.id)
  .then((person) => {
    if (!person) {
      logger.debug(`No person was found with id: ${req.params.id}`);
      return next(new createError.NotFound(`No person was found with id: ${req.params.id}`));
    }
    return res.json(person);
  })
  .catch((err) => {
    logger.debug(err.message);
    return next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
  });

exports.create = (req, res, next) => {
  const { firstName, lastName, vaccine } = req.body;
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

exports.update = (req, res, next) => {
  const {
    _id,
    firstName,
    lastName,
    vaccine,
  } = req.body;
  if (!_id || !firstName || !lastName) {
    return next(new createError.BadRequest('Required properties: id, firstName, lastName, vaccine. If person is not vaccinated use vaccine: ""'));
  }
  const updatePersonData = {
    firstName,
    lastName,
    vaccine: vaccine || '',
  };
  return personService.update(_id, updatePersonData)
    .then((modifiedPerson) => {
      if (modifiedPerson === null) {
        return next(new createError.NotFound(`No person was found with id: ${_id}`));
      }
      res.status(202);
      return res.json(modifiedPerson);
    })
    .catch((err) => {
      logger.debug(err.message);
      return next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.delete = (req, res, next) => {
  const { id } = req.body;
  personService.delete(id)
    .then(() => {
      res.status(202);
      res.json('Person deleded.');
    })
    .catch((err) => {
      logger.debug(err.message);
      return next(new createError.NotFound(err.message));
    });
};
