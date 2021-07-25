const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const personController = require('./person.controller');
const personService = require('./person.service');

jest.mock('./person.service');

describe('person controller', () => {
  const mockData = [{
    id: 1,
    firstName: 'Winnie',
    lastName: 'Kembrey',
    vaccine: 'vaccine-4',
  },
  {
    id: 2,
    firstName: 'Esmaria',
    lastName: 'Taks',
    vaccine: 'vaccine-1',
  },
  {
    id: 3,
    firstName: 'Archambault',
    lastName: 'Dugan',
    vaccine: '',
  },
  {
    id: 4,
    firstName: 'Charmine',
    lastName: 'Baxstair',
    vaccine: 'vaccine-3',
  }];

  let response;
  const nextFunction = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    personService.__setMockData(mockData);
    response = mockResponse;
  });

  test('Find one person with invalid id', () => {
    const PERSON_ID = 8;
    const request = mockRequest({ params: { d: PERSON_ID } });

    return personController.getById(request, response, nextFunction)
      .catch((err) => {
        expect(personService.getOneById).toBeCalledWith(PERSON_ID);
        expect(err).toEqual(new createError.NotFound(`No person was found with id: ${PERSON_ID}`));
      });
  });

  test('Testing http-post /person : create new person', () => {
    const createData = {
      firstName: 'Johny',
      lastName: 'Firpo',
      vaccine: 'vaccine-1',
    };
    const request = mockRequest({
      method: 'POST',
      body: createData,
    });

    return personController.create(request, response, nextFunction)
      .then(() => {
        expect(personService.create).toHaveBeenCalledWith(createData);
      });
  });
});
