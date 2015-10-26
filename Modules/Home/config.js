"use strict"
var route = require('koa-router')({
    prefix: '/'
});

var home= require('./Controllers/home.js');

module.exports = function (app) {
    name: "home";
    
    route.get('/', home.index);

    app.use(route.routes());

    return function*(next) {
        yield next;
    }

}