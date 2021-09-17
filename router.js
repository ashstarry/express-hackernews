// 路由模块，主要负责路由判断


// 1. 创建一个 router 对象 （router 对象既是一个对象，也是一个函数）
var express = require('express');
// 加载业务模块
var handler = require('./handler.js');
var path = require('path');

var router = express.Router();

// 2. 通过 router 对象设置（挂载）路由


// 首页新闻列表
router.get('/', handler.index);
router.get('/index', handler.index);



// 新闻详情
router.get('/item', handler.item);


// 显示添加新闻页面
router.get('/submit', handler.submit);

// 处理 get 方式添加新闻
router.get('/add', handler.addGet);

// 处理 post 方式提交数据
router.post('/add', handler.addPost);


// 实现对 resources 文件夹下的内容进行静态资源托管
// /resources/css/news.css
router.use('/resources', express.static(path.join(__dirname, 'resources')));


// 3. 返回 router 对象
module.exports = router;