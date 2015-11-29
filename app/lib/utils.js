var Utils = {};
var jwt = require('jsonwebtoken');
var C = require("../../config/config");
Utils.validatePresenceOf = function (value) {
	return value && value.length;
};

Utils.like = function (value) {
	return new RegExp('^' + value + '$', "i")
}

Utils.sign = function (data) {
	data.created = new Date().getTime();
	return jwt.sign(data, C.secret);
}

Utils.verify = function (data) {
	return jwt.verify(data, C.secret);
}




module.exports = Utils;