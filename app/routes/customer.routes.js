var Router = require("express").Router;
var C = require("../../config/config");
var CustomerCtrl=require(C.ctrl+"customer.ctrl");
var AuthController = require(C.ctrl+"auth.ctrl");
var PickCtrl = require(C.ctrl+"pick.ctrl");
var EventCtrl = require(C.ctrl+"event.ctrl");
var Response = require(C.lib+"response");
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
		});
	})
	.delete(function(req, res){
		CustomerCtrl.delete(req.body, function(err, customer){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", customer);

		});		
	});


router.route("/pick")
	.post(function(req, res){

		PickCtrl.new(req.body, function(err){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "Pick created");
		});
	})
	
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

router.route("/event")
	.post(AuthController.checkAccess(1), function(req, res){		
		EventCtrl.newEvent(req.user, req.body, function(err){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "Event created");
		})
	})

	.get(AuthController.checkAccess(1),function(req, res){
		EventCtrl.search(req.user, req.query, function(err, events){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", events);
		})
	})


router.route("/pick/:id")
	.get(function(req, res){
		PickCtrl.findById(req.params.id, function(err, pick){
			if(err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", pick);
		} );
	});

router.route("/:id")
	.get(function(req, res){
		CustomerCtrl.findById(req.params.id, function(err, customer){
			if(err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", customer);
		});
	});

module.exports = router;