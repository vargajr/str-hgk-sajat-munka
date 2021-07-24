const createError = require('http-errors');
/* eslint-disable no-console */
const personService = require('./person.service');

exports.getVaccinedCount = (req, res, next) => {
  personService.getAll()
    .then((people) => {
      const count = people.filter((person) => person.vaccine).length;
      res.json({ vaccinatedCount: count });
    })
    .catch((err) => {
      console.log(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.getVaccinedPeople = (req, res, next) => {
  personService.getAll()
    .then((people) => {
      const vaccinatedPeople = people.filter((person) => person.vaccine);
      res.json(vaccinatedPeople);
    })
    .catch((err) => {
      console.log(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.personIsVaccinated = (req, res, next) => {
  const { id } = req.params;
  personService.getOneById(id)
    .then((person) => res.json({ vaccined: !!person.vaccine }))
    .catch((err) => {
      console.log(err.message);
      if (err.message.includes('No person was found with id:')) {
        return next(new createError.NotFound(err.message));
      }
      return next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.getAll = (req, res, next) => personService.getAll()
  .then((people) => res.json(people))
  .catch((err) => {
    console.log(err.message);
    return next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
  });

exports.getById = (req, res, next) => personService.getOneById(Number(req.params.id))
  .then((person) => res.json(person))
  .catch((err) => {
    console.log(err.message);
    if (err.message.includes('No person was found with id:')) {
      return next(new createError.NotFound(err.message));
    }
    return next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
  });

exports.create = (req, res, next) => {
  const { firstName, lastName, vaccine } = req.body;
  if (!firstName || !lastName) {
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
      console.log(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.modifyVaccine = (req, res, next) => {
  const { id, vaccine } = req.params;
  return personService.update({ id, vaccine })
    .then((modifiedPerson) => {
      res.status(202);
      res.json(modifiedPerson);
    })
    .catch((err) => {
      console.log(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

exports.update = (req, res, next) => {
  const {
    id,
    firstName,
    lastName,
    vaccine,
  } = req.body;
  if (!id || !firstName || !lastName) {
    return next(new createError.BadRequest('Required properties: id, firstName, lastName, vaccine. If person is not vaccinated use vaccine: ""'));
  }
  const updatePersonData = {
    id,
    firstName,
    lastName,
    vaccine: vaccine || '',
  };
  return personService.update(updatePersonData)
    .then((modifiedPerson) => {
      res.status(202);
      res.json(modifiedPerson);
    })
    .catch((err) => {
      console.log(err.message);
      if (err.message.includes('No person was found with id:')) {
        return next(new createError.NotFound(err.message));
      }
      return next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index]);
  }
};

exports.eraseVaccinatedPeople = (req, res, next) => {
  const { vaccine } = req.params;
  personService.getAll()
    .then((people) => {
      const toRemove = people
        .filter((p) => p.vaccine === vaccine)
        .map((p) => p.id);
      if (toRemove.length === 0) {
        return next(new createError.NotFound(`No person was found who received ${vaccine}`));
      }
      (async () => {
        await asyncForEach(toRemove, async (id) => {
          await personService.delete(id);
        });
      })();
      res.status(202);
      return res.json(`Every person who got ${vaccine} was deleted.`);
    })
    .catch((err) => {
      console.log(err.message);
      next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
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
      console.log(err.message);
      if (err.message.includes('No person was found with id:')) {
        return next(new createError.NotFound(err.message));
      }
      return next(new createError.InternalServerError('An error occured. Please contact system administrators.'));
    });
};
