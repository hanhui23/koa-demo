// 异常基类
class HttpException extends Error {
  constructor(msg='服务器异常', error_code=10000, code=400) {
    super()
    this.msg = msg
    this.error_code = error_code
    this.code = code
  }
}

// 参数错误
class ParameterException extends HttpException {
  constructor(msg, error_code) {
    super()
    this.msg = msg || '参数错误'
    this.error_code = error_code || 10000
    this.code = 400
  }
}

module.exports = {
  HttpException,
  ParameterException
}