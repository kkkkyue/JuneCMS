"use strict"

module.exports = {
    index: function*(next)
    {
        yield this.render('admin/Index');
    },
    user: function*(next) {
        
    }
} 