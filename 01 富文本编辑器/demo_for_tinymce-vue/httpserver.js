//练习使用nodejs，编写静态服务器，
//获取http模块
const http = require('http');
//为了能读取某个路径下需要访问的资源文件，使用fs模块和path模块,解析url模块
const fs = require('fs');
const path= require('path');
const url = require('url');
const express = require('express');
var address = '/Users/frankthy/workSpace/demo/dist';
// /Users/czx/workspace/parcel/dist
//1、使用express框架
var app = express();
//根路径请求，返回hellp wolrd
app.get('/',function(req,res){
    res.send('hello wolrd!') ;
})
// 使用express提供的内置中间件，express.static来设置静态文件
app.use(express.static(address));
//服务注册，并监听在8081端口
var server = app.listen('80',function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
//2、使用nodejs的http模块
// 引入fs模块后，需要读写dist下的html文件访问使用指南页面
// var server = http.createServer(function(request,response){
//     // response.setHeader('Content-type','text/html;charset=utf-8');
//     // response.write('<h1>你好！</h1>');
//     //从request中获取请求资源对象
//     var pathObj = url.parse(request.url,true);
//     //使用path 获取dist下的文件
//     // 1、获取dist目录路径,使用path.resolve获取请求文件的绝对路径
//     var distPath = path.resolve('dist');
//     //拼接获取fs要读取的文件,使用path.join()方法
//     var filePath = path.join(distPath,pathObj.pathname);
//     //屏蔽浏览器对favicon.ico的请求
//     if(pathObj.pathname.indexOf('favicon.ico') === -1){
//         console.log(filePath);
//         //使用fs 模块读取文件，并通过response返回到浏览器
//         //使用同步读取方法
//         var fileContent = fs.readFileSync(filePath);
//         response.write(fileContent);
//     }

//     response.end();
// });
// server.listen(8888);
// console.log('静态服务已启动，端口监听在8888');
