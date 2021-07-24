const personService = require('./person.service');

exports.getVaccinedCount = (req, res, next) => {
  personService.countOfVaccined()
    .then((count) => res.json({ vaccinatedCount: count }))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.message);
      next(err);
    });
};

exports.getVaccinedPeople = (req, res, next) => {
  personService.getVaccinatedPeople()
    .then((vaccinatedPeople) => res.json(vaccinatedPeople))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.message);
      next(err);
    });
};
