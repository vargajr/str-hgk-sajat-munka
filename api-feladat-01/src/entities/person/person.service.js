const { readFile } = require('fs').promises;
const { join } = require('path');

const filePath = join(__dirname, '..', '..', '..', 'data', 'data.json');

const readData = async () => {
  const filecontent = await readFile(filePath, { encoding: 'utf8' });
  return JSON.parse(filecontent);
};

module.exports.countOfVaccined = async () => {
  const data = await readData();
  return data.people.filter((person) => person.vaccine).length;
};

module.exports.getVaccinatedPeople = async () => {
  const data = await readData();
  return data.people.filter((person) => person.vaccine);
};
