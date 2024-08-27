// user 数据访问层

const db = require("../db")

exports.getUserInfo = (req,res)=>{
    const {username,age,status} = req.body
    let sql = 'select * from userTable'
    db.query(sql,(err,data)=>{
        console.log(data);
        if(err){
            return res.send('错误'+err.msg)
        }
        res.send({
            code:200,
            msg:'success',
            data
        })
    })
}