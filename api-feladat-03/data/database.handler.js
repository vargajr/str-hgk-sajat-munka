const { readFile, writeFile } = require('fs').promises;
const { join } = require('path');

const dataFilePath = join(__dirname, 'data.json');

const readMockFile = async (filePath, collection) => {
  const mockFileContent = await readFile(filePath, { encoding: 'utf8' });
  return JSON.parse(mockFileContent)[collection];
};

const addCollection = async (database, collection, dataArray) => {
  const db = JSON.parse(JSON.stringify(database, null, 2));
  db[collection] = dataArray;
  return db;
};

const readData = async (collection, mockFilePath) => {
  let fileContent = '';
  try {
    fileContent = await readFile(dataFilePath, { encoding: 'utf8' });
  } catch (err) {
    if (err.message.includes('no such file or directory')) {
      const mockData = await readMockFile(mockFilePath, 'people');
      const db = await addCollection({}, collection, mockData);
      await writeFile(dataFilePath, JSON.stringify(db, null, 2), 'utf8');
      return Promise.resolve(mockData);
    }
    return Promise.reject(err);
  }
  if (!fileContent) {
    fileContent = '{}';
  }
  const dataBase = JSON.parse(fileContent);
  // console.log(dataBase);
  if (!dataBase[collection]) {
    const mockData = await readMockFile(mockFilePath, 'people');
    const db = await addCollection(dataBase, collection, mockData);
    await writeFile(dataFilePath, JSON.stringify(db, null, 2), 'utf8');
    return Promise.resolve(mockData);
  }
  return Promise.resolve(dataBase[collection]);
};

const writeData = async (collection, data) => {
  let fileContent = '';
  try {
    fileContent = await readFile(dataFilePath, { encoding: 'utf8' });
  } catch (err) {
    if (err.message.includes('no such file or directory')) {
      await writeFile(dataFilePath, JSON.stringify({ [collection]: data }, null, 2), 'utf8');
      return Promise.resolve(true);
    }
    return Promise.reject(err);
  }
  if (!fileContent) {
    fileContent = '{}';
  }
  const dataBase = JSON.parse(fileContent);
  dataBase[collection] = data;
  await writeFile(dataFilePath, JSON.stringify(dataBase, null, 2), 'utf8');
  return Promise.resolve(true);
};

module.exports = Object.freeze({
  readData,
  writeData,
});
