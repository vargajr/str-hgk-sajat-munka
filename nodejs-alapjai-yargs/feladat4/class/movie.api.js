const { readFile, writeFile } = require('fs').promises

module.exports = class MovieAPI {
  constructor (path, prop) {
    this.path = path
    this.prop = prop
    this.list = null
    this.init()
  }

  async init () {
    const dataString = await readFile(this.path, 'utf8')
    this.list = JSON.parse(dataString)[this.prop]
  }

  async get () {
    if (!this.list) {
      await this.init()
    }
    return this.list
  }

  async save (data) {
    await writeFile(this.path, JSON.stringify({ [this.prop]: data }))
  }
}
