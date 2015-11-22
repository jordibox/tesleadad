var Router = require("express").Router;
var AuthCtrl=require("../ctrl/auth.ctrl");
var router = Router();
router.route("")
	.get(function (req, res) {
		res.jsonp({ message: "Do you want register?" });
	})
	.post(function (req, res){
		AuthCtrl.login(req.body, function(err, user){
			if(err)return res.jsonp({err:err})
			if(!user)return res.jsonp({err:"Password Not Valid"})
			res.json({message:"Login Successfully"});
		});
	});
	
	
	
	
	


module.exports = router;