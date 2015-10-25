"use strict"
var user = require('../Models/user.js');

module.exports = {
    index: function*(next)
    {
        var ctx = this;
        user.User.create({ username:"kkkkyue",email:"123@3213.com" }, function (err, small) {
            if (err) return handleError(err);
        })
        yield this.render('admin/Index',{layout:"admin/template"});
    },
    login: function*(next) {
        yield this.render('admin/login', { layout: "admin/template" });
    }
} 