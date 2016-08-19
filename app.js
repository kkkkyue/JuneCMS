"use strict"
var koa = require('koa');
var render = require('koa-swig');// require('koa-ejs');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var error = require('koa-error');
var session = require('koa-generic-session');
var mongoose = require('mongoose');
var mongooseStore = require('koa-session-mongoose');
var path = require('path');
var Module = require('./Module.js');
var config = require('./config.js');
var socket = require('./socket.js');


//连接数据库
//mongoose.connect(config.Mongodb);

var app = koa();

//var ctx = this;


//模板设置
var filters = {
    format: function (time) {
        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    }
};

app.context.render = render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html'
});

app.use(bodyParser());

//配置静态服务器
app.use(serve('public'));

//应用模块配置
Module.init(app);

var sessionStore= mongooseStore.create()
// 设置Sessions
app.keys = ['secret']
app.use(session({
    store: sessionStore ,
    key: 'koa.sid',
    secret:'secret'
}));

var passport = require('koa-passport')
app.use(passport.initialize())

app.use(passport.session())

//设置错误提示
app.use(error());

//配置SOCKET.IO
socket(app, sessionStore);


if (process.env.NODE_ENV === 'test') {
    module.exports = app.callback();
} else {
    app.server.listen(config.Port);
    console.log('open http://localhost:3000')
}

app.on('error', function (err) {
    console.log(err.stack)
})