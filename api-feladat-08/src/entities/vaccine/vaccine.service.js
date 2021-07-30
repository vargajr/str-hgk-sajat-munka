const Vaccine = require('../../models/vaccine.model');

exports.create = (newData) => Vaccine.create(newData);

exports.getAll = () => Vaccine.find();

exports.getOneById = (id) => Vaccine.findById(id);

exports.update = (id, updateData) => Vaccine.findByIdAndUpdate(id, updateData, {
  new: true,
  useFindAndModify: false,
});

exports.delete = (id) => Vaccine.findByIdAndRemove(id);

exports.returnId = (vaccine) => Vaccine.find({ name: vaccine })
  // eslint-disable-next-line no-underscore-dangle
  .then((vacc) => Promise.resolve(vacc._id));
