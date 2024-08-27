const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes')
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
app.use(cors())
app.use(router)
const upload = multer({
    dest:'uploads/'
})

app.listen(port,()=>{
    console.log(`example app listening on port ${port} `);
})
