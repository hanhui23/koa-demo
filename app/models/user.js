const bcrypt = require('bcryptjs')
const { sequelize } = require('./../../core/db')
const { DataTypes, Model } = require('sequelize')

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email,
      },
    })
    if (!user) {
      throw new global.errs.NotFound('用户不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING(128),
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      },
    },
    openid: {
      type: DataTypes.STRING(64),
      unique: true,
    },
  },
  { sequelize, tableName: 'user' },
)

module.exports = {
  User,
}
