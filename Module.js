"use strict"
var fs = require('fs');
var path = require('path');

var init = function (app) {
    var modulesPath = path.join(__dirname, 'Modules');
    fs.readdir(modulesPath, function (err, files) {
        if (err) {
            console.log('read dir error');
        } else {
            files.forEach(function (item) {
                var tmpPath = modulesPath + '/' + item;
                fs.stat(tmpPath, function (err1, stats) {
                    if (err1) {
                        console.log('stat error');
                    } else {
                        if (stats.isDirectory()) {
                            var tmpConfigPath = tmpPath + '/' + "config.js";
                            var module = require(tmpConfigPath);
                            module.init(app);

                        } else {

                        }
                    }
                })  
            }); 
        }
    });

};

module.exports.init = init;
