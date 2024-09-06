const mysql = require('mysql2')
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'basketball',
    port:'3306'
})

module.exports = db