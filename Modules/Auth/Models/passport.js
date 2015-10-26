"use strict"
var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var passportSchema = new Schema({
    password: String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

passportSchema.methods.hashPassword = function (cb) {
    var md5 = crypto.createHash('md5');
    md5.update(this.password);
}

var Passport = mongoose.model('Passport', passportSchema);


module.exports = Passport;