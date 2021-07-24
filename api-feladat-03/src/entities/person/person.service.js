const { join } = require('path');
const dbHandler = require('../../../data/database.handler');

const mockFilePath = join(__dirname, 'mock.data.json');

module.exports.getAll = () => dbHandler.readData('people', mockFilePath)
  .then((personArray) => Promise.resolve(personArray))
  .catch((err) => Promise.reject(err));

module.exports.getOneById = (id) => this.getAll()
  .then((personArray) => {
    const person = personArray.find((p) => p.id === Number(id));
    if (!person) {
      return Promise.reject(new Error(`No person was found with id: ${id}`));
    }
    return Promise.resolve(person);
  })
  .catch((err) => Promise.reject(err));

module.exports.create = (newPersonData) => this.getAll()
  .then((personArray) => {
    const id = personArray.sort((a, b) => a.id - b.id)[personArray.length - 1].id + 1;
    const newPerson = { id, ...newPersonData };
    personArray.push(newPerson);
    return dbHandler.writeData('people', personArray)
      .then(() => Promise.resolve(newPerson))
      .catch((err) => Promise.reject(err));
  })
  .catch((err) => Promise.reject(err));

module.exports.update = (update) => this.getAll()
  .then((personArray) => {
    const { id } = update;
    const updateData = JSON.parse(JSON.stringify(update));
    delete updateData.id;
    const newArray = personArray.map((p) => (p.id === Number(id) ? { ...p, ...updateData } : p));
    const updatedPerson = newArray.find((p) => p.id === Number(id));
    if (!updatedPerson) {
      return Promise.reject(new Error(`No person was found with id: ${id}`));
    }
    return dbHandler.writeData('people', newArray)
      .then(() => Promise.resolve(updatedPerson))
      .catch((err) => Promise.reject(err));
  })
  .catch((err) => Promise.reject(err));

module.exports.delete = (id) => this.getAll()
  .then((personArray) => {
    const newArray = personArray.filter((p) => p.id !== Number(id));
    return dbHandler.writeData('people', newArray)
      .then(() => Promise.resolve(true))
      .catch((err) => Promise.reject(err));
  })
  .catch((err) => Promise.reject(err));
