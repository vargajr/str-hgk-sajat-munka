const MovieAPI = require('./movie.api')

module.exports = class MovieService {
  constructor () {
    this.api = new MovieAPI('./database/movies.json', 'movies')
    this.movies = null
    this.init()
  };

  async init () {
    this.movies = await this.api.get()
  };

  async getAllMovies () {
    if (!this.movies) {
      await this.init()
    }
    return this.movies
  };

  async findMovieById (id) {
    if (!this.movies) {
      await this.init()
    }
    return this.movies.find(movie => movie.id === id)
  };

  async createMovie ({ title, producer }) {
    if (!this.movies) {
      await this.init()
    }
    const id = [...this.movies].sort((a, b) => b.id - a.id)[0].id + 1
    const newMovie = { id, title, producer }
    this.movies.push(newMovie)
    await this.api.save(this.movies)
    return newMovie
  }

  async editMovie ({ id, title, producer }) {
    if (!this.movies) {
      await this.init()
    }
    this.movies = this.movies.map(movie => movie.id === id
      ? { id, title, producer }
      : movie)
    await this.api.save(this.movies)
    return this.movies.find(movie => movie.id === id)
  }

  async removeMovie (id) {
    if (!this.movies) {
      await this.init()
    }
    this.movies = this.movies.filter(movie => movie.id !== id)
    await this.api.save(this.movies)
  }
}
