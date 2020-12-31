const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    InitManager.initLoadRouters(app)
    InitManager.loadConfig()
    InitManager.loadHeepException()
  }

  static initLoadRouters(app) {
    requireDirectory(module, './../app/api', {
      visit: whenLoadModule,
    })
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        app.use(obj.routes())
      }
    }
  }

  static loadConfig(path) {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static loadHeepException() {
    const HttpException = require('./http-exception')
    global.errs = HttpException
  }
}

module.exports = InitManager
