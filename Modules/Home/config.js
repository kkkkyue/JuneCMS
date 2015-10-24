"use strict"
var route = require('koa-router')({
    prefix: '/'
});

var home= require('./Controllers/home.js');

module.exports = {
    name: "home",
    init: function (app){
        route.get('/', home.index);
        app.use(route.routes());
    }
}