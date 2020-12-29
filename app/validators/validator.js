const { LinValidator, Rule } = require('./../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '需要是正整数', { min: 1 })]
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [new Rule('isEmail', '邮箱不符合格式')]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多22个字符', {
        min: 6,
        max: 22,
      }),
      new Rule(
        'matches',
        '密码长度必须在6~22位之间，包含字符、数字和 _ ',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]',
      ),
    ]
    this.password2 = this.password2
    this.nickname = [
      new Rule('isLength', '昵称长度必须在4~32之间', { min: 4, max: 32 }),
    ]
  }
  validatePassword(vals) {
    const { password1, password2 } = vals.body
    if (password1 !== password2) {
      throw new Error('两次输入的密码不一致')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
}
