var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var crypto = require("crypto")
var C = require("../../config/config");

var Utils = require(C.lib + "utils");

var AuthSchema = new Schema({

	email: {
		type: String,
		unique: true,
		required: true
	},

	hashed_password: {
		type: String,
		required: true
	},
	salt: String,
	role: Number,
	token: [String]

});
AuthSchema.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function () {
    return this._password;
});

AuthSchema.pre("save", function (next) {
	if (!this.isNew) return next();

	if (!Utils.validatePresenceOf(this.password)) {
		next(new Error("Invalid password"));
	} else {
		next();
	}
});

AuthSchema.methods = {
	checkPassword: function (pass) {
		return this.encryptPassword(pass) === this.hashed_password;
	},
	authenticate: function (u, cb) {
		
		if (!this.checkPassword(u.password)){
			return cb("Password not Valid");
		}
		
		var token =this.sign({
            email: u.email,
            role:u.role
        });
		cb(null, token);

	},


	makeSalt: function () {
		return Math.round((new Date().valueOf() * Math.random())) + "";
	},

	encryptPassword: function (password) {
		if (!password) return "";
		return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
	},
	sign: function (data) {
		data.created = new Date().getTime();
		return jwt.sign(data, C.secret);
	},

	verify: function (data) {
		return jwt.verify(data, C.secret);
	}



}

module.exports.Auth = mongoose.model("Auth", AuthSchema);
