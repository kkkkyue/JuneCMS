"use strict"

module.exports = {
    index: function*(next)
    {
        yield this.render('admin/Index', {layout:"admin/template"});
    },
    login: function*(next) {
        
    }
} 