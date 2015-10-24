"use strict"
var koa = require('koa');
var render = require('koa-ejs');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var path = require('path');
var router = require('./Router.js');
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

//应用路由配置
router.routes(app);




if (process.env.NODE_ENV === 'test') {
    module.exports = app.callback();
} else {
    app.listen(3000);
    console.log('open http://localhost:3000')
}

app.on('error', function (err) {
    console.log(err.stack)
})