const EventEmitter = require('events')

class Logger extends EventEmitter {
  error (msg) { console.log('\x1b[31m%s\x1b[0m', msg) }

  success (msg) { console.log('\x1b[32m%s\x1b[0m', msg) }
}

module.exports = Object.freeze({
  Logger
})
