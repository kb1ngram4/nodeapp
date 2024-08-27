### express 使用的中间件
```
body-parser: 处理接口请求体

multer：处理文件上传
```
###  Sequelize 
```
基于Promise的Node.jsORM框架,用于简化数据库交互，支持多种数据库
```
### 后端服务器架构
```
    config 
        -> db.config.js
    controllers 业务逻辑层
        -> user.controller.js    user业务逻辑
    models 
        -> index.js 包含mysql数据库的配置信息
        ->user.model.js 包含sequelize的数据模型
    node_modules
    package.json
    index.js
```