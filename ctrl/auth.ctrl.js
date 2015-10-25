
var C=require("../config/config");

var Auth = require(C.models+"auth").Auth;

exports.register = function (user, cb) {
	if (!user || !user.username || !user.password) return cb("Fields not Filled");

	var auth = new Auth({
		email: user.email,
		password: user.password
	});

	auth.save(function (err) {
		if (err) return cb(err);
		cb();
	});
}


	exports.login=function (user, cb) {
		
		
		Auth.findOne({ email: user.email }, function (err, user) {
			if(err){return cb(err);}
			
			
			if(!user){return cb(null, false);}
			
			
			if(user.authenticate(user.password))return cb(null, user);
			else return cb(null, false);
			
	
		});

	};