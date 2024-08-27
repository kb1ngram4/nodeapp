let express = require('express')
let router = express.Router()

const { urlencoded } = require("body-parser")
const { getUserInfo } = require("../controllers/user.controller")
const urlencodedParser = urlencoded({extended:false})

// 获取用户信息

router.post('/api/userInfo',urlencodedParser,getUserInfo)

module.exports = router