const dbConfig = require("../config/dbConfig");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user')(sequelize, Sequelize);

db.sequelize.sync({ force: true })
.then(() => {
    console.log('yes re-sync done!')
});


module.exports = db;