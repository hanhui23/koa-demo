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
    paranoid: true,
    createAt: 'create_at',
    updateAt: 'update_at',
    deleteAt: 'delete_at',
    underscored: true,
    freezeTableName: true,
  },
})

sequelize.sync({
  force: false,
})

module.exports = {
  sequelize,
}
