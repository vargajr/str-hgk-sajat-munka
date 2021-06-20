const MoviesServiceFactory = (moviesApi) => {
  const getAllMovies = async () => await moviesApi.get()

  const findMovieById = async (id) => {
    const movies = await moviesApi.get()
    return movies.find(movie => movie.id === id)
  }

  const generateNewMovieId = (movies) => {
    const sortedMovies = [...movies].sort((a, b) => b.id - a.id)
    return sortedMovies[0].id + 1
  }

  const createMovie = async ({ producer, title }) => {
    let movies = await moviesApi.get()
    const id = generateNewMovieId(movies)
    const movie = { id, producer, title }
    movies = [...movies, movie]
    moviesApi.save(movies)
    return movie
  }

  const editMovies = async ({ id, producer, title }) => {
    let movies = await moviesApi.get()
    movies = movies.map(movie => movie.id === id ? { id, title, producer } : movie)
    moviesApi.save(movies)
    return movies.find(movie => movie.id === id)
  }

  const removeMovie = async (id) => {
    let movies = await moviesApi.get()
    movies = movies.filter(movie => movie.id !== id)
    moviesApi.save(movies)
  }

  return {
    getAllMovies,
    findMovieById,
    createMovie,
    editMovies,
    removeMovie
  }
}

module.exports = MoviesServiceFactory
