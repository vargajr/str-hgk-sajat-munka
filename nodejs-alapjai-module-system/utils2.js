const generateUserList = (users) => users
  .map(user => (
    {
      isAdult: user.age > 18,
      fullName: `${user.firstName ? user.firstName : 'missing firstName'} ${user.lastName ? user.lastName : 'missing lastName'}`
    }
  ))

const getUserNames = (users) => users
  .map(user => `${user.firstName ? user.firstName : 'missing firstName'} ${user.lastName ? user.lastName : 'missing lastName'}`)
  .join(', ')

module.exports = Object.freeze({
  generateUserList,
  getUserNames
})
