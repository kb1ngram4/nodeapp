module.exports = {
    HOST:'localhost',
    USER:'root',
    PASSWORD:'root',
    DB:'mydatabase',
    dialect:'mysql',
    pool:{
        max:5, //池中最大连接数
        min:0, 
        acquire:30000, //连接被释放前可以空闲的最长时间，ms
        idle:10000 //最大时间
    }
}