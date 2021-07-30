const config = require('config');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');
const Person = require('./models/person.model');

const dbConfig = config.get('database');

describe('REST API integration tests', () => {
  const insertData = [
    {
      firstName: 'Winnie',
      lastName: 'Kembrey',
      vaccine: 'vaccine-4',
    },
    {
      firstName: 'Esmaria',
      lastName: 'Taks',
      vaccine: '',
    },
  ];

  beforeEach((done) => {
    mongoose.connect(`mongodb+srv://${dbConfig.username}:${dbConfig.pwd}@${dbConfig.host}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, () => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  test('PUT /person - update function', async () => {
    const person = await Person.create(insertData[0]);
    const { id } = person;
    const updatePerson = {
      _id: id,
      firstName: 'Barba',
      lastName: 'Papa',
      vaccine: 'vaccine-1',
    };
    const response = await supertest(app).put('/person').send(updatePerson).expect(202);
    expect(response.body.firstName).toBe(updatePerson.firstName);
    expect(response.body.lastName).toBe(updatePerson.lastName);
    expect(response.body.vaccine).toBe(updatePerson.vaccine);
  });

  test('DELETE /person - delete with invalid id', async () => {
    await supertest(app).delete('/person').send({ id: 1 }).expect(404);
  });
});
