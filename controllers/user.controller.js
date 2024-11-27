// user 数据访问层

const db = require("../db")
// 查询usertable
exports.getUserList = (req, res) => {
    const { username, age, role, page, pageSize } = req.body
    let sql = `select * from userTable where username like'%${username}%'and age like '%${age}%' and role like '%${role}%'`
    db.query(sql, (err, data) => {
        console.log(err);

        if (err) {
            return res.send('错误' + err.msg)
        }
        const total = data.length
        res.send({
            code: 200,
            msg: 'success',
            total,
            totalPages: Math.ceil(data.length / pageSize),
            currentPage: page,
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
            username, sex, age, address, status, role, phone, id
        }
        db.query(sql, params, (err, data) => {
            if (err) {
                return res.send({
                    code: 400,
                    msg: err.message
                })
            }
            // res.code(200).json({ message: 'Data updated successfully', affectedRows: results.affectedRows });
            res.send({
                code: 200,
                msg: '修改成功'
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
// get获取级联选择器树形结构
const data = {
    parents: [
        // { parentId: '0', id: '1', name: 'Parent 1', children: null },
        // { parentId: '0', id: '2', name: 'Parent 2', children: null }
        { id: 'all', name: '全部', children: [] }
    ],
    children: [
        { parentId: 'all', id: '1', name: 'Parent 1', children: null },
        { parentId: 'all', id: '2', name: 'Parent 2', children: null },
        { parentId: '1', id: '1-1', name: 'Child 1-1', children: null },
        { parentId: '1', id: '1-2', name: 'Child 1-2', children: null },
        { parentId: '1-1', id: '2-1', name: 'Child 2-1', children: null },
        { parentId: '2-1', id: '3-1', name: 'Child 3-1', children: null },
        { parentId: '2-1', id: '3-2', name: 'Child 3-2', children: null },
        { parentId: '3-1', id: '4-1', name: 'Child 4-1' },
        { parentId: '2', id: '2-1-1', name: 'Child 2-1-1', children: null },
    ]
};
exports.getParentTree = (req, res) => {

    res.json(data.parents);
}

exports.getChildren = (req, res) => {
    console.log(req.params);

    const parentId = req.params.parentId;
    const children = [];
    data.children.forEach((item) => {
        if (item.parentId === parentId) {
            children.push(item);
        }
    })
    res.json(children);
};