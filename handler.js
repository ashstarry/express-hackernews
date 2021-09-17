// 业务模块

var path = require('path');
var mongodb = require('mongodb');
var config = require('./config.js');




// 处理新闻列表 index
module.exports.index = function (req, res) {


  // 1. 读取 mongodb 中的新闻数据
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.connStr, function (err, db) {
    if (err) {
      throw err;
    }

    // 执行查询操作
    db.collection('news').find().toArray(function (err, docs) {
      if (err) {
        throw err;
      }
      // 关闭数据库连接
      db.close();

      // 2. 调用 res.render() 通过模板引擎实现读取 index.html 文件并替换模板代码，同时渲染给浏览器
      res.render('index', {list: docs});
    });
  });

  

  // // sendFile() 方法虽然可以读取对应的文件并返回，但是我们不使用 sendFile() 方法
  // // 原因是：将来我们要对 index.html 中的模板代码进行执行并替换替换
  // // res.sendFile(path.join(__dirname, 'views', 'index.html'));
  // // 默认 render 方法是不能使用的，需要为 express 配置一个模板引擎，然后才可以使用
  // // res.render(path.join(__dirname, 'views', 'index.html'));
  // res.render('test', {title: '这是一个模板引擎测试', message: '你好 HTML engine.'});
};


// 处理新闻详情
module.exports.item = function (req, res) {

  // 0. 获取用户要查询的新闻的 id
  // req.query._id -> 59d8878027c080cb0692d089
  // 把 req.query._id 转换为数据库中的 ObjectID 类型
  var objId = new mongodb.ObjectID(req.query._id);

  // 1. 从 mongodb 中读取这条新闻的数据
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.connStr, function (err, db) {
    if (err) {
      throw err;
    }

    db.collection('news').findOne({_id: objId}, function (err, doc) {
      db.close();
      if (err) {
        throw err;
      }
      // 2. 调用 res.render() 渲染
      if (doc) {
        res.render('details', {item: doc});
      } else {
        res.send('no such item.');
      }
      
    });
  });
};


// 处理显示添加新闻页面
module.exports.submit = function (req, res) {
  res.render('submit');
};


// 处理 get 方式添加新闻
module.exports.addGet = function (req, res) {

  // 1. 获取用户 get 提交的新闻数据
  // req.query
  var doc = {
    title: req.query.title,
    url: req.query.url,
    content: req.query.text
  };

  // 2. 将新闻数据插入到mongodb 数据库中
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.connStr, function (err, db) {
    if (err) {
      throw err;
    }

    db.collection('news').insertOne(doc, function (err, result) {
      if (err) {
        throw err;
      }
      db.close();

      // 3. 重定向
      res.redirect('/');
    });
  });
};


// 处理 post 方式提交数据
module.exports.addPost = function (req, res) {
  // express 已经为 req 对象扩展了一个 body 属性（req.body）
  // 但是默认 req.body 不能用
  // 要想使用 req.body 必须配合一个 body-parser 插件（中间件）才可以让 req.body 可用
  // 类似于 res.render() 函数，虽然有但是不能用，需要先配置一个模板引擎
  // console.log(req.body);

  // 1. 获取用户 get 提交的新闻数据
  // req.query
  var doc = {
    title: req.body.title,
    url: req.body.url,
    content: req.body.text
  };

  // 2. 将新闻数据插入到mongodb 数据库中
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.connStr, function (err, db) {
    if (err) {
      throw err;
    }

    db.collection('news').insertOne(doc, function (err, result) {
      if (err) {
        throw err;
      }
      db.close();

      // 3. 重定向
      res.redirect('/');
    });
  });
};

