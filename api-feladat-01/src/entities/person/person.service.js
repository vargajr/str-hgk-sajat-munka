const { readFile } = require('fs').promises;
const { join } = require('path');

const filePath = join(__dirname, '..', '..', '..', 'data', 'data.json');

const readData = (collection) => new Promise((res, rej) => {
  readFile(filePath, { encoding: 'utf8' })
    .then((filecontent) => {
      if (!filecontent) {
        return rej(new Error('The database is empty.'));
      }
      const database = JSON.parse(filecontent);
      if (!database[collection]) {
        return rej(new Error(`In the database there is no ${collection} collection.`));
      }
      return res(database[collection]);
    })
    .catch((err) => rej(err));
});

module.exports.countOfVaccined = () => new Promise((res, rej) => {
  readData('people')
    .then((people) => {
      res(people.filter((person) => person.vaccine).length);
    })
    .catch((err) => rej(err));
});

module.exports.getVaccinatedPeople = () => new Promise((res, rej) => {
  readData('people')
    .then((people) => res(people.filter((person) => person.vaccine)))
    .catch((err) => rej(err));
});
