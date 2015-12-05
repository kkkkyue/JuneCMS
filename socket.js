"use strict"
var socket = require('koa-socket');
var mongooseStore = require('koa-session-mongoose');
var cookiejs= require('cookie-js');

module.exports = function (app, sessionStore){
    socket.start(app);

    socket.on('connection', function (socket) {
        socket.emit('news',"hello");
        //console.log(data);
    });

    socket.on('my other event', function (data) {
        console.log(data);
    });
    socket.on('disconnect', function () {
        //io.emit('user disconnected');
    });

    socket.on('event', function (packet) {
        console.log(packet.id);
        console.log(this.id);
    });

    socket.use(function*(next) {
        var cookie = this.socket.handshake.headers.cookie;
        
        cookie = cookiejs.parse(cookie);
        this.user = cookie;
        yield next;

    });

    
}