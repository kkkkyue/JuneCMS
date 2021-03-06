﻿"use strict"
var passport = require('koa-passport');

var user = { id: 1, username: 'test' };

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    done(null, user)
})

var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(function (username, password, done) {
    // retrieve user ...
    if (username === 'test' && password === 'test') {
        done(null, user)
    } else {
        done(null, false)
    }
}))

module.exports = {
    AllowLogin: function*(next) {
        if (!this.passport.user) {
            yield next;
            this.session["return"] = this.url;
            this.redirect('/auth/login?callback='+this.url);
        }
        else {
            yield next;
        }
    }
}