const MoviesApiClass = require('./movies.api.class')
const { dbFilePath, propname } = require('./config')

module.exports = class MoviesServiceClass {
  constructor () {
    this.moviesApi = new MoviesApiClass(dbFilePath, propname)
    this.movies = null
    this.init()
  }

  async init () {
    if (!this.movies) {
      this.movies = await this.moviesApi.get()
    }
  }

  async getAll () {
    if (!this.movies) {
      await this.init()
    }
    return await this.movies
  }

  async findMovieById (id) {
    if (!this.movies) {
      await this.init()
    }
    return await this.movies.filter(movie => movie.id === id)[0]
  }

  generateNewId (arr) {
    const sortedMovies = [...arr].sort((a, b) => b.id - a.id)
    return sortedMovies[0].id + 1
  }

  async createNewMovie ({ producer, title }) {
    if (!this.movies) {
      await this.init()
    }
    const id = await this.generateNewId(await this.movies)
    const movie = { id, producer, title }
    this.movies = [...this.movies, movie]
    await this.moviesApi.save(this.movies)
    return movie
  }

  async editMovie ({ id, producer, title }) {
    if (!this.movies) {
      await this.init()
    }
    const editedMovie = { id, producer, title }
    await this.movies.map(movie => movie.id === id ? editedMovie : movie)
    await this.moviesApi.save(this.movies)
    return editedMovie
  }

  async deleteMovie (id) {
    if (!this.movies) {
      await this.init()
    }
    this.movies = await this.movies.filter(movie => movie.id !== id)
    await this.moviesApi.save(this.movies)
  }
}
