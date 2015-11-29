
var C=require("../../config/config");

var AuthModel = require(C.models + "auth").Auth;
var async = require("async");
var AuthController = {};


AuthController.register = function (role) {
	return function (req, res, next) {
		var user = req.body;

		if (!user || !user.email || !user.password) return res.send("Fields not Filled");

		var auth = new AuthModel({
			email: user.email,
			password: user.password,
			role: role
		});

		auth.save(function (err) {
			if (err) return res.jsonp(err);
			next();
		});

	}
}





AuthController.login = function (u, cb) {

	async.waterfall([
		function (next) {
			AuthModel.findOne({ email: u.email }, function (err, user) {
				if (err) { return next(err); }

				if (!user) { return next("No users", false); }

				u.role = user.role;

				next(null, user);
			});
		},
		function (user, next) {
			user.authenticate(u, function(err, token){
				user.token.push(token);
				next(err, user, token);
			});
		},
		function(user, token, next){
			user.save(function(err){
				next(err, token, user.role);
			});
		}
	], function(err, token, role) {
		if(err) return cb(err);
		cb(false, {token:token, role:role});
	});

};

AuthController.checkAccess=function(role){
	
}


module.exports = AuthController;