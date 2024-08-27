// 连接远程mysql数据库的登录参数
// sequelize 的配置信息
module.exports = {
    host:'localhost',
    user:'root',
    password:'root',
    db:'mydatabase',
    dialect:'mysql',
    pool:{
        max:5, //池中最大连接数
        min:0, 
        acquire:30000, //连接被释放前可以空闲的最长时间，ms
        idle:10000 //最大时间
    }
}