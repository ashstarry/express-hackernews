// app.js 模块职责： 负责启动服务

// 1. 加载 express 模块
var express = require('express');
// 加载 config.js 模块
var config = require('./config.js');
// 加载路由模块
var router = require('./router.js');
var path = require('path');

// 1. 加载 body-parser 模块
var bodyParser = require('body-parser');

// 2. 创建 app 对象
var app = express();



// 配置使用 ejs 模板引擎
// // 为  express 集成 ejs 模板引擎（配置 express 使用 ejs 模板引擎）
// // 配置完毕以后，res.render() 函数就可以使用了
// // 配置模板引擎的代码要放到正式处理请求之前，否则可能不能用
// // 当使用 ejs 模板引擎的时候，模板文件的后缀必须是 .ejs
// // 1. 安装 ejs 模块
// // 2. 配置 express 使用 ejs 模板引擎
// //  - 告诉 express，模板文件的存放路径
// //  - 告诉 express，要使用的模板引擎

// // 设置所有模板文件的存放路径
// app.set('views', path.join(__dirname, 'htmls'));
// // 设置要使用 ejs 模板引擎
// app.set('view engine', 'ejs');





// 配置使用 ejs 模板引擎，修改默认查找的模板文件后缀为 html
// 1. 设置模板文件的存放路径
app.set('views', path.join(__dirname, 'htmls'));
// 2. 创建一个自己的模板引擎，用来识别后缀是 html 的模板文件
app.engine('html', require('ejs').renderFile);
// 3. 使用刚才自己创建的这个模板引擎
app.set('view engine', 'html');




// 配置 body-parser 插件（挂载 body-parser 中间件）
// 一定要在正式处理请求之前设置body-parser
// req.body
// 如果参数 extended: false，表示在bodyparser内部，使用node.js内置的 querystring 模块把 用户post提交的查询字符串转换为 json 对象
// 如果参数 extended: true，表示在bodyparser内使用第三方的 qs 模块把 用户post提交的查询字符串转换为 json 对象
app.use(bodyParser.urlencoded({extended: false}));

// querystring
// qs




// 3. 注册路由
// 设置app 与 router 相关联
// app.use('/', router);
app.use(router);

// 4. 启动服务
app.listen(config.port, function () {
  console.log('http://localhost:' + config.port);
});