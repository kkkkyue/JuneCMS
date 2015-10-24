var route = require('koa-router')();
var home = require('../Controllers/home.js');
var router = function (app) {
    
    route.get('/', home.index);
    
    route.get('/user', home.user);

    app.use(route.routes());
};

module.exports.routes = router;
