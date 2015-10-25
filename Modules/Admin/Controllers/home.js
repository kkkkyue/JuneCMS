"use strict"

module.exports = {
    index: function*(next)
    {
        var ctx = this;
        yield this.render('admin/Index',{layout:"admin/template"});
    },
    login: function*(next) {
        yield this.render('admin/login', { layout: "admin/template" });
    }
} 