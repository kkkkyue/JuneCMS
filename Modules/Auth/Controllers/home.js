"use strict"
var User = require('../Models/user.js');
var passport = require("koa-passport");

module.exports = {
    index: function*(next)
    {
        var ctx = this;
        user.create({ username:"kkkkyue",email:"123@3213.com" }, function (err, small) {
            if (err) return handleError(err);
        })
        yield this.render('admin/Index',{layout:"admin/template"});
    },
    login: function*(next) {
        yield this.render('admin/login', { layout: "admin/template" });
    },
    //登入
    postlogin: function*(next) {
        var _this = this;
        yield* passport.authenticate("local", function*(err, user, info) {
           if (err) {
              throw err;
           }
           if (user === false) {
             _this.status = 401;
           } else {
             yield _this.login(user);
             _this.body = { user: user };
           }
         }).call(this);
    },
    //登出
    logout: function*(next){
        this.logout();
        this.session = null;
        this.status = 204;
    },
    //注册
    postRegister: function*(next){
        if (!this.request.body) {
            this.throw("The body is empty", 400);
        }
        
        if (!this.request.body.username) {
            this.throw("Missing username", 400);
        }
        if (!this.request.body.password) {
            this.throw("Missing password", 400);
        }
        
        var User = require("mongoose").model("User");
        
        try {
            var user = new User({ username: this.request.body.username, password: this.request.body.password });
            user = yield user.save();
            yield this.login(user);
        } catch (err) {
            this.throw(err);
        }
        
        this.status = 200;
        this.body = { user: this.passport.user };
    }

} 