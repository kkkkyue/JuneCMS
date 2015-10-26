"use strict"
var route = require('koa-router')({
    prefix: '/auth'
});
var auth = require('../../auth.js');
var passport = require('koa-passport');
var home = require('./Controllers/home.js');

module.exports = function (app){
    
    name: "admin";


    route.get('/', home.index);
    //登入
    route.get('/login', home.login);
    
    route.post('/login', home.postlogin);
    
    route.use('/logout', home.logout);
    
    app.use(route.routes());
    
    //var ctx = this;

    return function*(next) {
        yield next;
    }


}