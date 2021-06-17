const { access, mkdir, writeFile } = require('fs').promises
const path = require('path')

const createFileInDir = (dir, fileName, content) => {
  access(dir)
    .catch(() => mkdir(dir))
    .then(() => writeFile(path.join(__dirname, dir, fileName), content))
    .catch(err => console.log('\x1b[31m', err.message))
}

module.exports = Object.freeze({
  createFileInDir
})
