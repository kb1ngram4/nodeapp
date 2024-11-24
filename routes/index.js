let express = require('express')
let router = express.Router()

const { urlencoded } = require("body-parser")
const { getUserInfo, addUser, getUserList, delUser, getParentTree, getChildren } = require("../controllers/user.controller")
const urlencodedParser = urlencoded({ extended: false })

// 获取用户信息

router.post('/api/userInfo', urlencodedParser, getUserList)

router.post('/api/addUser', urlencodedParser, addUser)

router.get('/api/userInfo', urlencodedParser, getUserInfo)

router.post('/api/deleteUser', urlencodedParser, delUser)

router.get('/api/getParent', urlencodedParser, getParentTree)

router.get('/api/children/:parentId', urlencodedParser, getChildren)

module.exports = router