const siteController = require('../controller/site.controller')

module.exports = Object.freeze({
  '/': res => siteController.index(res),
  '/about': res => siteController.about(res),
  '/contact': res => siteController.contact(res),
  '/404': res => siteController.error404(res)
})
