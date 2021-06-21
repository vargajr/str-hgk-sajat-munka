const { readFile, writeFile } = require('fs').promises

module.exports = class MoviesApiClass {
  constructor (path, prop) {
    this.path = path
    this.prop = prop
    this.init()
    this.list = null
  }

  async init () {
    const datastring = await readFile(this.path, { encoding: 'utf-8' })
    this.list = await JSON.parse(datastring)[this.prop]
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
