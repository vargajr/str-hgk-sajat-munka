const { readFile } = require('fs').promises

const ProductsApiFactory = (path, prop) => ({
  async get () {
    try {
      const dataString = await readFile(path)
      return JSON.parse(dataString)[prop]
    } catch (err) {
      console.log('\x1b[31m%s\x1b[0m', err.message)
    }
  }
})

module.exports = ProductsApiFactory
