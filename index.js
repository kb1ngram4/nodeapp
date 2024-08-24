const express = require('express')
const cors = require('cors')
const app = express()
// let corsOptions = {origin:'*'}
// app.use(cors(corsOptions))
const port = 3000
// post 请求
// 中间件 body-parser
const bodyParser = require('body-parser')
// 处理文件上传的中间件
const multer = require('multer')

const path = require('path')
// 静态文件服务
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
const db = require('./db')
const upload = multer({
    dest:'uploads/'
})
// 处理urlencoded
// app.use(bodyParser.urlencoded({extended:false}))
const urlencodedParser = bodyParser.urlencoded({extended:true})
// 处理json
// app.use(bodyParser.json())
const jsonParser = bodyParser.json()
// 路由参数
app.get('/profile/:id',(req,res)=>{
    res.send('you requested paarmasId with '+req.params.id)
})
// 查询字符串
app.get('/',(req,res)=>{
    res.send('comn')
})

// post请求 npm i body-parser --save
// 查询数据
app.post('/api/userInfo', urlencodedParser, (req,res)=>{
    const {id,userName,age} = req.body
    // 构建查询语句
    let sql = 'select * from userTable'
    db.query(sql,(error,results,fields)=>{
        if(error){
            return res.status(500).json({error:error.message})
        }
        const data = results
        res.send({
            code:200,
            msg:'成功',
            data
        })
    })

})
app.post('/api/userJson',jsonParser,(req,res)=>{
    console.dir(req.body)
    if (!req.body) return res.sendStatus(400)
    res.send({
        code:200,
        msg:'成功'
    })
})

// 文件上传 Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
app.post('/api/file/upload',upload.single('file'),(req,res)=>{
    console.dir(req.file)
    const file = req.file
    const data = {
        value:file.buffer
    }
    const sql = 'INSERT INTO TESTFILE SET ?'
    db.query(sql,data,(err,results)=>{
        if(err){
            return console.log(err.message);
        }
    })
    res.send({
        code:200,
        msg:'上传成功'
    })

})
// 获取文件

app.get('/api/getFile',(req,res)=>{
    const sql = 'SELECT * FORM TESTFILE'
    db.query(sql,(err,results)=>{
        if(err){
            return res.send(err.message)
        }
        res.set({
            'Content-Type':'image/jpeg',
            'Accept-Ranges':'bytes',
            'Content-Disposition': 'attachment; filename="filename.jpg"'

        })
        res.send(results[0].value)
    })
})

app.listen(port,()=>{
    console.log(`example app listening on port ${port} `);
})