const { join } = require('path')
const { copyFile } = require('./utils2')

const filePathObject = {
  dir: 'file-to-copy',
  base: 'color-reference.md'
}

const fileArchiver = ({ dir, base } = {}) => {
  const fileToArchive = join(__dirname, dir, base)
  const copiedFile = `${join(__dirname, base)}.bak`
  const zippedFile = `${join(__dirname, base)}.gz`

  copyFile(fileToArchive, copiedFile, zippedFile)
}

fileArchiver(filePathObject)
