const { join } = require('path')
const { createReadStream } = require('fs')

const createResponse = (res, file, statusCode = 200) => {
  res.writeHead(statusCode, {
    'Content-Type': 'text/html'
  })
  createReadStream(join(__dirname, '..', 'views', `${file}.html`)).pipe(res)
}

module.exports = createResponse
