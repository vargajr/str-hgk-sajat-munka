const { join, parse } = require('path')

const constructPath = (fileName) => {
  const sourceFilePath = join(__dirname, '.', fileName)
  const pathParts = parse(sourceFilePath)
  const targetPath = join(pathParts.dir, `${pathParts.name}Copy${pathParts.ext}`)
  return {
    sourceFilePath,
    targetPath
  }
}

module.exports = Object.freeze({
  constructPath
})
