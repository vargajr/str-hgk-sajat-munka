const yargs = require('yargs')
const { id, producer, title } = require('./option')
const MoviesApiFactory = require('./movies.api')
const MoviesServiceFactory = require('./movies.services')
const { dbFilePath, propName } = require('./config')

const moviesApi = MoviesApiFactory(dbFilePath, propName)
const {
  getAllMovies,
  findMovieById,
  createMovie,
  editMovies,
  removeMovie
} = MoviesServiceFactory(moviesApi)

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'get',
    describe: 'Get all movies',
    handler: async () => console.log(await getAllMovies())
  })
  .command({
    command: 'find',
    describe: 'Find movie by id',
    builder: { id },
    handler: async (args) => console.log(await findMovieById(args.id))
  })
  .command({
    command: 'create',
    describe: 'Create new movie',
    builder: { producer, title },
    handler: async (args) => {
      console.log(await createMovie(args))
    }
  })
  .command({
    command: 'edit',
    describe: 'Edit a movie',
    builder: { id, producer, title },
    handler: async (args) => {
      console.log(await editMovies(args))
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove a movie by ID',
    builder: { id },
    handler: (args) => {
      removeMovie(args.id)
      console.log('Record deleted')
    }
  })
  .locale('en')
  .strict()
  .help()
  .parse() // process.argv -> args
