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
      next(err);
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
      next(err);
    });
};

exports.personIsVaccinated = (req, res, next) => {
  const { id } = req.params;
  personService.getOneById(id)
    .then((person) => res.json({ vaccined: !!person.vaccine }))
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
};

exports.create = (req, res, next) => {
  const { firstName, lastName, vaccine } = req.body;
  if (!firstName || !lastName) {
    return next(new Error('Required properties: firstName, lastName, vaccine. If person is not vaccinated use vaccine: ""'));
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
      next(err);
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
      next(err);
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
      (async () => {
        await asyncForEach(toRemove, async (id) => {
          await personService.delete(id);
        });
      })();
      res.status(202);
      res.json(`all person who got ${vaccine} was deleted.`);
    })
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
};
