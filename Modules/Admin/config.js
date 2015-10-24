"use strict"
var route = require('koa-router')({
    prefix: '/admin'
});

var home= require('./Controllers/home.js');

module.exports = {
    name: "admin",
    init: function (app){
        route.get('/', home.index);
        app.use(route.routes());
    }
}