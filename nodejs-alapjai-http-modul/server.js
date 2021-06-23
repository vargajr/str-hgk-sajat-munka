const http = require('http')
const siteRouter = require('./router/site.router')
const port = 8080

const requestLogger = (url, method) => {
  console.log(`Date: ${new Date().toLocaleString('hu')}, Url: ${url}, Metod: ${method}`)
}

http.createServer(({ url }, res) => {
  siteRouter[url]
    ? siteRouter[url](res)
    : siteRouter['/404'](res)
})
  .on('request', ({ url, method }) => requestLogger(url, method))
  .on('error', (err) => console.log(err.message))
  .on('listening', () => console.log(`Server works at http://127.0.0.1:${port}`))
  .listen(port)
