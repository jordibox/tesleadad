var Router = require("express").Router;
var C = require("../../config/config");
var AuthCtrl=require(C.ctrl+"auth.ctrl");
var Response = require(C.lib+"response");
var router = Router();
router.route("")
	.get(function (req, res) {
		res.jsonp({ message: "Do you want register?" });
	})
	.post(function (req, res){
		AuthCtrl.login(req.body, function(err, user){
			if(err) 
				Response.printError(res, err);
			else
				Response.printSuccess(res, "data", user);
		});
	});
	
router.route("/access")
	.get(AuthCtrl.checkAccess(2), function(req, res){
		Response.printSuccess(res, "data", "Have Access");
	})

module.exports = router;