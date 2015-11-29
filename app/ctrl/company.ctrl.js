
var C=require("../../config/config");

var CompanyModel = require(C.models+"company");
var async = require("async");
var Controller = {};

Controller.newCompany = function (body, cb) {
	if (!body || !body.cif || !body.name || !body.category) return cb("Fields not Filled");
	var company = new CompanyModel(body);

	company.save(function (err) {
		if (err) return cb(err);
		cb();
	});
};

Controller.search = function(query, cb){
	CompanyModel.search(query, function(err, companies){
		if(err) return cb(err);

		if(!companies)
			return cb(null, "No companies");
		
		return cb(null, companies);
	});
};

Controller.login = function (u, cb) {

	async.waterfall([
		function (next) {
			CompanyModel.findOne({ email: u.email }, function (err, user) {
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

Controller.checkAccess=function(role){
	
}

module.exports = Controller;