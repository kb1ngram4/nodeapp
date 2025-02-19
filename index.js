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
// 启用 websocket 服务 与nodejs 通信 与本地服务不兼容
// npm i ws
// const WebSocket = require("ws");

// // 创建 WebSocket 服务器，监听端口 8080
// const wss = new WebSocket.Server({ port: 3000 });

// // 监听客户端连接
// wss.on("connection", (ws) => {
//   console.log("客户端已连接");

//   // 监听客户端发送的消息
//   ws.on("message", (message) => {
//     console.log("收到客户端消息:", message);

//     // 向客户端发送回复
//     ws.send(`服务器回复: ${message}`);
//   });

//   // 发送一条欢迎消息给客户端
//   ws.send("欢迎连接 WebSocket 服务器");
// });

// 打印服务器地址
// console.log("WebSocket 服务器已启动: ws://localhost:8080");



app.listen(port,()=>{
    console.log(`example app listening on port ${port} `);
})
