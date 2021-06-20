const yargs = require('yargs')
const { count } = require('./option')
const ProductsApiFactory = require('./products.api')
const ProductsServiceFactory = require('./products.services')
const { dbFilePath, propName } = require('./config')

const productsApi = ProductsApiFactory(dbFilePath, propName)
const {
  getSum,
  getAvg,
  getLessThan
} = ProductsServiceFactory(productsApi)

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'sum',
    describe: 'Total value of product on stock',
    handler: async () => console.log(await getSum())
  })
  .command({
    command: 'avg',
    describe: 'Total value of product on stock divided by the total number of product on stock',
    handler: async () => console.log(await getAvg())
  })
  .command({
    command: 'lessthan',
    describe: 'Products less on stoch then count number',
    builder: { count },
    handler: async (args) => {
      console.log(await getLessThan(args))
    }
  })
  .locale('en')
  .strict()
  .help()
  .parse() // process.argv -> args
