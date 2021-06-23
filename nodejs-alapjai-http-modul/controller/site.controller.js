const createResponse = require('../utils/createResponse')

module.exports = Object.freeze({
  index: (res) => createResponse(res, 'index'),
  about: (res) => createResponse(res, 'about'),
  contact: (res) => createResponse(res, 'contact'),
  error404: (res) => createResponse(res, 'error404', 404)
})
