const { EventEmitter } = require('events')

class Logger extends EventEmitter {
  constructor () {
    super()
    this.on('error', this.error)
    this.on('success', this.success)
    // this.init()
  }

  /* init () {
    this.emit('error', 'belső hiba')
    this.emit('success', 'belső siker')
  } */

  error (msg) { console.log('\x1b[31m%s\x1b[0m', msg) }
  success (msg) { console.log('\x1b[32m%s\x1b[0m', msg) }
}

class FileArchiver extends Logger {
  constructor () {
    super()
    this.archive()
  }

  archive () {
    this.emit('error', 'Archiver inner error')
    this.emit('success', 'Archiver inner success')
    this.on('trigger', this.customMethod)
  }

  customMethod () {
    console.log('Ez egy custom event kezelő callback-je')
  }
}

const fileArchiver = new FileArchiver()

fileArchiver.emit('trigger')

fileArchiver.emit('error', 'Archiver hiba')

fileArchiver.emit('success', 'Archiver siker')
