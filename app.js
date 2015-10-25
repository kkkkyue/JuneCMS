"use strict"
var koa = require('koa');
var render = require('koa-ejs');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var session = require('koa-generic-session');
var mongoose = require('mongoose');
var mongooseStore = require('koa-session-mongoose');
var path = require('path');
var Module = require('./Module.js');
var config = require('./config.js');

//连接数据库
mongoose.connect(config.Mongodb);

var app = koa();

//模板设置
var filters = {
    format: function (time) {
        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    }
};
render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true,
    filters: filters
});

app.use(bodyParser());

//配置静态服务器
app.use(serve('public'));

//应用模块配置
Module.init(app);


// 设置Sessions
app.keys = ['secret']
app.use(session(app));

var passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())


if (process.env.NODE_ENV === 'test') {
    module.exports = app.callback();
} else {
    app.listen(3000);
    console.log('open http://localhost:3000')
}

app.on('error', function (err) {
    console.log(err.stack)
})