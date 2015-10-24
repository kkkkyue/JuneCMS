var koa = require('koa');
var render = require('koa-ejs');
var router = require('./Modules/Router.js');
var koaBody = require('koa-body')();
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

//应用路由配置
router.routes(app);




app.listen(3000);