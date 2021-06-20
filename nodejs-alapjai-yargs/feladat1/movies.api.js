const { readFile, writeFile } = require('fs').promises

const MoviesApiFactory = (path, prop) => ({
  async get () {
    try {
      const dataString = await readFile(path)
      return JSON.parse(dataString)[prop]
    } catch (err) {
      console.log('\x1b[31m%s\x1b[0m', err.message)
    }
  },

  async save (data) {
    try {
      await writeFile(path, JSON.stringify({ [prop]: data }))
    } catch (err) {
      console.log('\x1b[31m%s\x1b[0m', err.message)
    }
  }
})

module.exports = MoviesApiFactory
