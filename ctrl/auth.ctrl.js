
var Auth = require("../models/auth");

exports.register = function (user, cb) {
	if (!user || !user.username || !user.password) return cb("Fields not Filled");

	var auth = new Auth({
		username: user.username,
		password: user.password
	});

	auth.save(function (err) {
		if (err) return cb(err);
		cb();
	});
}


	exports.login=function (user, cb) {
		
		
		Auth.findOne({ username: user.username }, function (err, user) {
			if(err){return cb(err);}
			
			
			if(!user){return cb(null, false);}
			
			
			user.verifyPassword(user.password, function(err, isMatch){
				if(err){return cb(err);}
				
				if(!isMatch){return cb(null, false);}
				
				return cb(null, user);
			});
			
			cb(null, user);
		});

	};