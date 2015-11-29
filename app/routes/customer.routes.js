var Router = require("express").Router;
var CustomerCtrl=require("../ctrl/customer.ctrl");
var AuthController = require("../ctrl/auth.ctrl");
var PickCtrl = require("../ctrl/pick.ctrl");
var Response = require("../lib/response");
var router = Router();

router.route("")
	.post(AuthController.register(1), function(req, res){ //function(request, responde, [siguiente funcion]), es como un array de funciones,con next pasas a la siguiente
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

router.route("/newpick")
	.post(function(req, res){
		PickCtrl.new(req.body, function(err){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "Pick created");
		});
	});


router.route("/pick")
	.get(function(req, res){
		PickCtrl.search(req.query, function(err, picks){
			if(err) Response.printError(res, err);
			else if(picks.length == 0)
				Response.printError(res, "No picks");
			else
				Response.printSuccess(res, "data", picks);
		} );
	})

	.delete(function(req, res){
		PickCtrl.delete(req.body, function(err, pick){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", pick);

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