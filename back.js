var express = require("express"); //引入express文件
var app = express(); //把express的方法定义为一个变量，直接调用这个变量就就可以调用express的方法
var bodyParser = require("body-parser"); //引入body-parser处理前端POST接口返回的数据
// 用于支持 Request Payload 数据的接收
app.use(
  bodyParser.json({
    limit: "1mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//“/test”是一个后缀，表示在监听的域名后面加上这个后缀就会调用这个函数
app.get("/test", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*"); //允许全网跨域访问
  //这是一个回调函数
  res.send("test success!");
});

//监听666端口
var server = app.listen(666, function() {});
