const { createReadStream, createWriteStream } = require('fs')
const { unlink } = require('fs').promises
const { createGzip } = require('zlib')

const successLogger = (message) => console.log('\x1b[32m', message)
const errorLogger = (error) => console.log('\x1b[31m', error.message)

const deleteFile = (path) => {
  unlink(path)
    .then(
      successLogger(`Deleting ${path} was successful.`),
      err => errorLogger(err)
    )
}

const compressFile = (fileToArchive, copiedFile, zippedFile) => {
  const readableStream = createReadStream(copiedFile, { encoding: 'utf-8', highWaterMark: 128 })
  readableStream.on('error', errorLogger)

  const compressedFile = createWriteStream(zippedFile)
  readableStream
    .pipe(createGzip())
    .pipe(compressedFile)

  compressedFile.on('error', errorLogger)
  compressedFile.on('finish', successLogger('File complressed successfully.'))
  compressedFile.on('finish', deleteFile(fileToArchive))
  compressedFile.on('finish', deleteFile(copiedFile))
}

const copyFile = (fileToArchive, copiedFile, zippedFile) => {
  const readableStream = createReadStream(fileToArchive, { encoding: 'utf-8', highWaterMark: 512 })
  readableStream.on('error', errorLogger)

  const writeableStream = createWriteStream(copiedFile)
  writeableStream.on('error', errorLogger)
  writeableStream.on('finish', successLogger('File copied successfully.'))
  writeableStream.on('finish', compressFile(fileToArchive, copiedFile, zippedFile))

  readableStream.pipe(writeableStream)
}

module.exports = { copyFile }
