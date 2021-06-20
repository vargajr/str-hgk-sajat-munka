const OptionFactory = ({ alias, describe, type = 'number', demandOption = 'true' } = {}) => ({
  alias, describe, type, demandOption
})

const count = OptionFactory({
  alias: 'c',
  describe: 'Minimum amount of product'
})

module.exports = Object.freeze({
  count
})
