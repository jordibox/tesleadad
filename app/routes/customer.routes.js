var Router = require("express").Router;
var CustomerCtrl=require("../ctrl/customer.ctrl");
var AuthController = require("../ctrl/auth.ctrl");
var Response = require("../lib/response");
var router = Router();
router.route("")
	.post(AuthController.register(1), function(req, res){ //request, responde, siguiente funcion(opcional)
		CustomerCtrl.newUser(req.body, function(err){ //contenido del POST, function(error, return de newUser)
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "Register Successfully");//respuesta para frontEnd, siempre tiene que responder algo	

		});
	})
	.get(function(req, res){
		CustomerCtrl.search(req.query, function(err, customers){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", customers);
		} );
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