const { createReadStream, createWriteStream } = require('fs')

const { constructPath } = require('./constructPath')
const { Logger } = require('./Logger')
const { TitleCaseTransform } = require('./TitleCaseTransform')

const capitalizeWords = (source, dest, logEmitter) => {
  const readableStream = createReadStream(source, {
    encoding: 'utf8',
    highWaterMark: 256
  })
  readableStream.on('error', (err) => logEmitter.error(err.message))

  logEmitter.success(`Reading file ${source}`)

  const titleTransform = new TitleCaseTransform()
  titleTransform.on('error', (err) => logEmitter.error(`File transform error: ${err.message}`))

  const writeableStream = createWriteStream(dest, 'utf8')

  writeableStream.on('error', (err) => logEmitter.error(`File writing error: ${err.message}`))
  writeableStream.on('finish', () => logEmitter.success(`File transformed successfully: ${dest}`))

  readableStream.pipe(titleTransform).pipe(writeableStream)
}

const transformFile = (fileName) => {
  const routes = constructPath(fileName)
  capitalizeWords(routes.sourceFilePath, routes.targetPath, new Logger())
}

transformFile('szamarmese.txt')
