var Router = require("express").Router;
var CustomerCtrl=require("../ctrl/customer.ctrl");
var AuthController = require("../ctrl/auth.ctrl");
var router = Router();
router.route("")
	.post(AuthController.register(1), function(req, res){ //request, responde, siguiente funcion(opcional)
		CustomerCtrl.newUser(req.body, function(err, user){ //contenido del POST, function(error, return de newUser)
			res.json({message:"Register Successfully"});//respuesta para frontEnd, siempre tiene que responder algo
		});
	});
	
	
	
	
	/*.get(function (req, res) {
		res.jsonp({ message: "Do you want register?" });
	})
	.post(function (req, res){
		AuthCtrl.login(req.body.user, function(err, user){
			if(err)return res.jsonp({err:err})
			if(!user)return res.jsonp({err:"Password Not Valid"})
			res.json({message:"Login Successfully"});
		});
	});
	
	router.route("/register")
	.post(function(req, res){
		AuthCtrl.register(req.body.user, function(err){
			if(err)return res.jsonp({err:err})
			res.json({message:"Registration Successfully"});
		})
	});*/
	
	
	
	
	


module.exports = router;