//服务器nodejs网页端口配置（nodejs版本）
const express = require("express"); //引入express文件
const app = express(); //把express的方法定义为一个变量，直接调用这个变量就就可以调用express的方法

app.use(express.static('./dist'));

const server = app.listen(3000, function () {
let host = server.address().address;
let port = server.address().port
})