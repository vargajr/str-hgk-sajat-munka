const yargs = require('yargs')
const { id, producer, title } = require('./option')
const MoviesServiceClass = require('./movies.service.class')
const movieService = new MoviesServiceClass()

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'get',
    describe: 'Get all movies',
    handler: async () => console.log(await movieService.getAll())
  })
  .command({
    command: 'find',
    describe: 'Find movie by id',
    builder: { id },
    handler: async (args) => console.log(await movieService.findMovieById(args.id))
  })
  .command({
    command: 'create',
    describe: 'Create new movie',
    builder: { producer, title },
    handler: async (args) => {
      console.log(await movieService.createNewMovie(args))
    }
  })
  .command({
    command: 'edit',
    describe: 'Edit a movie',
    builder: { id, producer, title },
    handler: async (args) => {
      console.log(await movieService.editMovie(args))
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove a movie by ID',
    builder: { id },
    handler: async (args) => {
      await movieService.deleteMovie(args.id)
      console.log('Record deleted')
    }
  })
  .locale('en')
  .strict()
  .help()
  .parse() // process.argv -> args
