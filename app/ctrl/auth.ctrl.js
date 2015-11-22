
var C=require("../../config/config");

var Auth = require(C.models+"auth").Auth;
var AuthController = {};


AuthController.register = function(role){
	return function(req, res, next){
			var user = req.body;
			
			if (!user || !user.email || !user.password) return res.send("Fields not Filled");

			var auth = new Auth({
				email: user.email,
				password: user.password,
				role:role
			});

			auth.save(function (err) {
				if (err) return res.jsonp(err);
				next();
			});
		
	}
}





	AuthController.login=function (u, cb) {
		
		
		Auth.findOne({ email: u.email }, function (err, user) {
			if(err){return cb(err);}
			
			
			if(!user){ console.log("no user"); return cb(null, false);}
			
			
			if(user.authenticate(u.password))return cb(null, user);
			else {console.log("no auth");return cb(null, false)};
			
	
		});

	};
	
module.exports = AuthController;