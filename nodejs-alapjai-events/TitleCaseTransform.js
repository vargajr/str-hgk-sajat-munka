const { Transform } = require('stream')

class TitleCaseTransform extends Transform {
  _transform (chunk, encoding, done) {
    const text = JSON.stringify(chunk.toString())
      .split('\\n').join('\\n ')
    const arr = [...text]
    for (let i = 0; i < arr.length - 2; i += 1) {
      if (arr[i] === ' ') {
        arr[i + 1] = arr[i + 1].toLocaleUpperCase()
      }
    }
    const modText = JSON.parse(arr.join('')
      .split('\\n ').join('\\n'))
    // process.stdout.write(modText)
    this.push(modText)
    done()
  }
}

module.exports = Object.freeze({
  TitleCaseTransform
})
