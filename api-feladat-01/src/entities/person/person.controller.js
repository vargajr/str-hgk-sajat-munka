const personService = require('./person.service');

exports.getVaccinedCount = async (req, res) => {
  const count = await personService.countOfVaccined();
  res.json({ vaccinatedCount: count });
};

exports.getVaccinedPeople = async (req, res) => {
  const vaccinatedPeople = await personService.getVaccinatedPeople();
  res.json(vaccinatedPeople);
};
