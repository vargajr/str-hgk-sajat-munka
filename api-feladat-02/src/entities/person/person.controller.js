const personService = require('./person.service');

exports.getVaccinedCount = (req, res, next) => {
  personService.getAll()
    .then((people) => {
      const count = people.filter((person) => person.vaccine).length;
      res.json({ vaccinatedCount: count });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.log(err.message);
      next(err);
    });
};

/* const getOne = (id) => {

};

exports.personIsVaccinated = (req, res, next) => {
  const { id } = req.params;
}; */
