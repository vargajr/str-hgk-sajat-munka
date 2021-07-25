const personService = jest.mock('./person.service');

let mockData;

personService.getOneById = jest.fn((id) => Promise.resolve(mockData.find((p) => p.id === id)));

personService.create = jest.fn((createData) => {
  const id = mockData.sort((a, b) => a.id - b.id)[mockData.length - 1].id + 1;
  const newPerson = { id, ...createData };
  return Promise.resolve(newPerson);
});

// eslint-disable-next-line no-underscore-dangle
personService.__setMockData = (data) => { mockData = data; };

module.exports = personService;
