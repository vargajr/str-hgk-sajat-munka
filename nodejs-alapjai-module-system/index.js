const { increaseAndFormatDate } = require('./utils')

const dateArray = [
  new Date(Date.now()),
  new Date('2021-06-16T22:22'),
  new Date(2021, 5, 16, 22, 22)
]

console.log(increaseAndFormatDate(dateArray))
