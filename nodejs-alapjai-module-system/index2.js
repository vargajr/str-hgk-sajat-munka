const utils = require('./utils2')

const userArray = [
  { firstName: 'Johnny', lastName: 'Firpo', age: 48 },
  { firstName: 'Charlie', lastName: 'Firpo', age: 51 },
  { firstName: 'Mike', lastName: 'Firpo', age: 73 },
  {},
  { age: 45 },
  { firstName: 'Someone' }
]

console.log(utils.generateUserList(userArray))
console.log(utils.getUserNames(userArray))
