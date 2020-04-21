var express = require("express"); //引入express文件
var app = express(); //把express的方法定义为一个变量，直接调用这个变量就就可以调用express的方法
var bodyParser = require("body-parser"); //引入body-parser处理前端POST接口返回的数据
var mysql = require("mysql"); //引入mysql文件
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

app.all("*", function(req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200);
  //让options尝试请求快速结束
  else next();
});

//“/test”是一个后缀，表示在监听的域名后面加上这个后缀就会调用这个函数
app.get("/test", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*"); //允许全网跨域访问
  //这是一个回调函数
  var sql = "select * from userInfo;";
  getinfo(sql, function(result) {
    res.send(result);
  });
});

app.post("/test2", function(req, res) {
  res.send("post success!");
});

//监听666端口
var server = app.listen(666, function() {});

//mysql封装函数测试
function getinfo(sql, next) {
  //连接数据库
  var connection = mysql.createConnection({
    host: "118.24.179.175", //数据库域名，localhost表示同域名，也就是同一台服务器
    user: "root", //数据库用户名
    password: "123456", //数据库密码
    port: "3306", //数据库域名监听的端口
    database: "cloundlisten", //调用的数据库中具体的库
  });
  connection.connect(); //链接数据库
  //获取当前库中表的名称
  connection.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      console.log("error!");
      next("error!");
    } else {
      console.log("获取数据库返回数据");
      console.log(result);
      next(result);
    }
  });
}
