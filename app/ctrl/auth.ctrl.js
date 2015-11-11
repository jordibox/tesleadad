
var C=require("../../config/config");

var Auth = require(C.models+"auth").Auth;

exports.register = function (user, cb) {
	if (!user || !user.email || !user.password) return cb("Fields not Filled");

	var auth = new Auth({
		email: user.email,
		password: user.password
	});

	auth.save(function (err) {
		if (err) return cb(err);
		cb();
	});
}


	exports.login=function (u, cb) {
		
		
		Auth.findOne({ email: u.email }, function (err, user) {
			if(err){return cb(err);}
			
			
			if(!user){ console.log("no user"); return cb(null, false);}
			
			
			if(user.authenticate(u.password))return cb(null, user);
			else {console.log("no auth");return cb(null, false)};
			
	
		});

	};