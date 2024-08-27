const mysql = require('mysql')
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'mydatabase',
    port:'3306'
})

module.exports = db