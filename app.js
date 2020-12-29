const Koa = require('koa')
const app = new Koa()
const parser = require('koa-bodyparser')
const exception = require('./middlewares/excepion')
const InitManager = require('./core/init')

require('./app/models/user')

app.use(exception)
app.use(parser())
InitManager.initCore(app)

app.listen(3000)
