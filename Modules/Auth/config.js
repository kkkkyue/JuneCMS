"use strict"
var route = require('koa-router')({
    prefix: '/auth'
});
var auth = require('../../auth.js');
var passport = require('koa-passport');
var home = require('./Controllers/home.js');

module.exports = {
    name: "admin",
    init: function (app) {
        route.get('/', home.index);
        //管理员登入
        route.get('/login', home.login);
        
        route.post('/login', home.postlogin);
        app.use(route.routes());
    }
}