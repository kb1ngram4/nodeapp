// user 数据访问层

const db = require("../db")
// 查询usertable
exports.getUserList = (req, res) => {
    const { username, age, role } = req.body
    let sql = `select * from userTable where username like'%${username}%'and age like '%${age}%' and role like '%${role}%'`
    db.query(sql, (err, data) => {
        console.log(err);
        
        if (err) {
            return res.send('错误' + err.msg)
        }
        res.send({
            code: 200,
            msg: 'success',
            data
        })
    })
}
// 新增user数据
exports.addUser = (req, res) => {
    const { id, username, sex, age, address, status, role, phone } = req.body
    if (id) {
        // 更新现有数据
        let sql = `update userTable set ? where id=${id} `
        const params = {
            username, sex, age, address, status, role, phone,id
        }
        db.query(sql,params,(err,data)=>{
            if(err){
               return res.send({
                    code:400,
                    msg:err.message
                })
            }
            // res.code(200).json({ message: 'Data updated successfully', affectedRows: results.affectedRows });
            res.send({
                code:200,
                msg:'修改成功'
            })

        })
    } else {
        let querySql = `select * from userTable where username='${username}'`
        db.query(querySql, (err, data) => {
            console.log(err);
            if (data.length > 0) {
                res.send({
                    code: 400,
                    msg: '当前用户已存在'
                })
            } else {
                let sql = 'insert into userTable set ?'
                const params = {
                    username, sex, age, address, status, role, phone
                }
                db.query(sql, params, (err, data) => {
                    // console.log(data);
                    if (err) {
                        res.send({
                            code: 400,
                            msg: err.message
                        })
                    } else if (data.affectedRows !== 1) {
                        res.send({
                            code: 400, msg: '数据写入失败'
                        })
                    } else {
                        res.send({
                            code: 200,
                            msg: '新增成功'
                        })
                    }
                })
            }
        })
    }
}
// user 详情
exports.getUserInfo = (req, res) => {
    console.log(req);
    const { id } = req.query
    let sql = `select * from userTable where id= '${id}'  `
    db.query(sql, id, (err, data) => {
        console.log(data[0]);
        res.send({
            code: 200,
            msg: '查询成功',
            data: data[0]
        })
    })
}

// 删除
exports.delUser = (req, res) => {
    const { id } = req.body
    let sql = `delete  from userTable where id = ${id}`
    db.query(sql, id, (err, data) => {
        if (err) {
            res.send({
                code: 400,
                msg: '数据删除失败'
            })
        } else if (data.affectedRows !== 1) {
            res.send({
                code: 400,
                msg: '数据删除失败'
            })
        } else {
            res.send({
                code: 200,
                msg: '数据删除成功'
            })
        }
    })
}