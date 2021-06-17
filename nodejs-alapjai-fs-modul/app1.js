const { createFileInDir } = require('./utils1')

const filesToMake = [
  ['controllers', 'site.controller.js', '// CONTROLLER'],
  ['routers', 'site.router.js', '// ROUTERS'],
  ['views', 'index.html', '<!-- INDEX -->'],
  ['.', 'app.js', '// APPLICATION']
]

filesToMake.forEach(arr => createFileInDir(arr[0], arr[1], arr[2]))
