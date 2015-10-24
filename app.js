var koa = require('koa');
var router = require('./Modules/Router.js');
var koaBody = require('koa-body')();
var app = koa();

//应用路由配置
router.routes(app);
//app.use(function*() {
//    this.body = 'Hello World';
//});



app.listen(3000);