const Sequelize = require('sequelize')
const {
  dbName,
  user,
  password,
  host,
  port,
} = require('./../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  timezone: '+08:00',
  logging: true,
  define: {
    timestamps: true,
  },
})

sequelize.sync({
  force: false,
})

module.exports = {
  sequelize,
}
