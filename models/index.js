// 初始化 sequelize

const dbConfig = require('../config/db.config.js')

const Sequelize = require('sequelize')
// 创建Sequelize实例
const sequelize = new Sequelize(dbConfig.db,dbConfig.user,dbConfig.password,{
    host:dbConfig.host,
    dialect:dbConfig.dialect,
    // operatorsAliases: false,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


db.userTable = require('./user.model.js')(sequelize,Sequelize)
// db.userTable(sequelize,Sequelize)
module.exports = db