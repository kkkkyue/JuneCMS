"use strict"
var route = require('koa-router')({
    prefix: '/auth'
});
var crypto = require('crypto');
var auth2route = require('koa-router')();
var mount = require('koa-mount');
var auth = require('../../auth.js');
var passport = require('koa-passport');
var home = require('./Controllers/home.js');
var oauthserver = require('koa-oauth-server');

module.exports = function (app){
    
    name: "Auth";
    
    app.oauth = oauthserver({
        model: require('./Models/OAuth.js'),
        grants: ['password', 'authorization_code', 'refresh_token'],
        debug: true
    });

    route.get('/', home.index);
    //登入
    route.get('/login', home.login);
    
    route.post('/login', home.postlogin);
    
    route.use('/logout', home.logout);
    
    app.use(mount('/oauth2', auth2route.middleware()));
    
    // Register `/token` POST path on oauth router (i.e. `/oauth2/token`).
    auth2route.post('/token', app.oauth.grant());
    
    var y=new Buffer("kkkkyue:qweqwe").toString("base64"); 
    app.use(route.routes());
    
    
    
   // app.use(app.oauth.authorise());
    
    //app.use(mount('/oauth2', router.middleware()));
    
    // Register `/token` POST path on oauth router (i.e. `/oauth2/token`).
    //router.post('/token', app.oauth.grant());
    //var ctx = this;

    return function*(next) {
        yield next;
    }


}