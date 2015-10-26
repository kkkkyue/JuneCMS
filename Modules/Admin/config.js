"use strict"
var route = require('koa-router')({
    prefix: '/admin'
});
var auth=require('../../auth.js');
var passport = require('koa-passport');
var home= require('./Controllers/home.js');

module.exports = function (app) {
    route.get('/', auth.AllowLogin ,home.index);

    app.use(route.routes());

    return function*(next){
        yield next;
    }

}