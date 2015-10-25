"use strict"
var route = require('koa-router')({
    prefix: '/admin'
});
var auth=require('./auth');
var passport = require('koa-passport');
var home= require('./Controllers/home.js');

module.exports = {
    name: "admin",
    init: function (app){
        route.get('/', auth.AllowLogin, home.index);
        //管理员登入
        route.get('/login', home.login);

        route.post('/login', passport.authenticate('local', {
            successRedirect: '/admin',
            failureRedirect: '/login'
        }));
        app.use(route.routes());
    }
}