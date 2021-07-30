const Person = require('../../models/person.model');

module.exports.getAll = () => Person.find();

module.exports.getOneById = (id) => Person.findById(id);

module.exports.create = (newPersonData) => Person.create(newPersonData);

module.exports.update = (id, update) => Person.findByIdAndUpdate(id, update, {
  new: true,
  useFindAndModify: false,
});

module.exports.delete = (id) => Person.findByIdAndRemove(id);

module.exports.getVaccinedCount = () => Person
  .find({ vaccine: { $exists: true, $nin: [''] } }).countDocuments();

module.exports.getVaccinedPeople = () => Person
  .find({ vaccine: { $exists: true, $nin: [''] } });

module.exports.eraseVaccinatedPeople = (vaccine) => Person
  .deleteMany({ vaccine: `${vaccine}` });
