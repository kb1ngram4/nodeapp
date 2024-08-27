// user 数据访问层

const db = require("../db")
// 查询usertable
exports.getUserInfo = (req,res)=>{
    const {username,age,role} = req.body
    let sql = `select * from userTable where username like'%${username}%'and age like '%${age}%' and role like '%${role}%'`
    console.dir(sql);
    db.query(sql,(err,data)=>{
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
// 新增user数据
exports.addUser = (req,res)=>{
    const {username,sex,age,address,status,role,phone} = req.body
    let querySql = `select * from userTable where username='${username}'`
    db.query(querySql,(err,data)=>{
        if(data.length>0){
            res.send({
                code:400,
                msg:'当前用户已存在'
            })
        }else{
            let sql = 'insert into userTable set ?'
            const params = {
                username,sex,age,address,status,role,phone
            }
            db.query(sql,params,(err,data)=>{
                // console.log(data);
                if(err){
                    res.send({
                        status:400,
                        msg:err.message
                    })
                }else if(data.affectedRows !==1){
                    res.send({
                        status:400,msg:'数据写入失败'
                    })
                }else{
                    res.send({
                        status:200,
                        msg:'新增成功'
                    })
                }
            })
        }
    })
}