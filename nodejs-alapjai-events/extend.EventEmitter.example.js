const { EventEmitter } = require('events')

class Logger extends EventEmitter {
  constructor () {
    super()
    this.on('error', this.error)
    this.on('success', this.success)
  }

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

  customMethod (par1, par2, par3) {
    console.log(`Ez egy custom event kezelő callback-je. Par1: ${par1}, par2: ${par2}, par3: ${par3}.`)
  }
}

const fileArchiver = new FileArchiver()

fileArchiver.emit('trigger', 111, 222, 333)

fileArchiver.emit('error', 'Archiver hiba')

fileArchiver.emit('success', 'Archiver siker')
