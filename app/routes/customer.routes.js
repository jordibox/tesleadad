var Router = require("express").Router;
var C = require("../../config/config");

var CustomerCtrl=require(C.ctrl+"customer.ctrl");
var AuthController = require(C.ctrl+"auth.ctrl");

var EventCtrl = require(C.ctrl+"event.ctrl");
var CategoryCtrl = require(C.ctrl+"category.ctrl");
var PrePickCtrl = require(C.ctrl+"prePick.ctrl");
var CompanyCtrl = require(C.ctrl+"company.ctrl");
var Response = require(C.lib+"response");
var router = Router();

router.route("")
	.post(function (req, res, next) { //function(request, responde, [siguiente funcion]), es como un array de funciones,con next pasas a la siguiente
		CustomerCtrl.newUser(req.body, function (err, user) { //contenido del POST, function(error, return de newUser)
			if (err) Response.printError(res, err);
			else {
				req.user = user._id;
				next();
			}

		});
	}, function (req, res) {
		AuthController.register(1, req.body, req.user, function (err) {
			if (err) {
				CustomerCtrl.rollback(req.user);
				Response.printError(res, err)
			}
			else
				Response.printSuccess(res, "data", "Register Successfully");
		});
	}
		)
	.get(AuthController.checkAccess(0), function (req, res) {
		CustomerCtrl.search(req.query, function (err, customers) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", customers);
		});
	})

	.delete(function (req, res) {
		CustomerCtrl.delete(req.body, function (err, customer) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", customer);

		});
	});

router.route("/profile")
	.get(AuthController.checkAccess(1), function (req, res) {
		CustomerCtrl.findById(req.user, function (err, customer) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", customer);
		});
	});


router.route("/pick")
	.post(AuthController.checkAccess(1), function (req, res) {
		req.body["id_customer"] = req.user;
		PickCtrl.new(req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Pick created");
		});
	})
	.get(AuthController.checkAccess(1), function (req, res) {
		req.query["id_customer"] = req.user;	
		PickCtrl.search(req.query, function (err, picks) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", picks);
		});
	})

	.delete(AuthController.checkAccess(1), function (req, res) {
		PickCtrl.delete(req.body, function (err, pick) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", pick);

		});
	});

router.route("/event")
	.post(AuthController.checkAccess(1), function (req, res) {
		EventCtrl.newEvent(req.user, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Event created");
		})
	})

	.get(AuthController.checkAccess(1), function (req, res) {
		EventCtrl.search(req.user, req.query, function (err, events) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", events);
		})
	})
	.delete(AuthController.checkAccess(1), function (req, res) {
		EventCtrl.delete(req.user, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Event deleted");
		})
	});

router.route("/prePick")
	.get(AuthController.checkAccess(1),function(req, res){
		PrePickCtrl.search(req.user, req.query, function(err, events){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", events);
		})
	})
	.delete(AuthController.checkAccess(1), function (req, res) {
		PrePickCtrl.delete(req.user, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "PrePick deleted");
		})
	});

router.route("/reviewCompany")
	.post(AuthController.checkAccess(1), function (req, res) {
		CompanyCtrl.newReview(req.user, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Review created");
		})
	})

router.route("/rateService")
	.post(AuthController.checkAccess(1), function (req, res) {
		CompanyCtrl.newRateService(req.user, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Service rated");
		})
	})

router.route("/category")
	.get(AuthController.checkAccess(1), function (req, res) {
		CategoryCtrl.search(req.query, function(err, categories){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", categories);
		} );
	})

router.route("/event/:id")
	.get(AuthController.checkAccess(1), function (req, res) {
		EventCtrl.findById(req.user, req.params.id, function (err, event) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", event);
		});
	})
	.put(AuthController.checkAccess(1), function (req, res) {
		EventCtrl.modify(req.user, req.params.id, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Event modified");
		});
	})

router.route("/prePick/:id")
	.get(AuthController.checkAccess(1), function (req, res) {
		PrePickCtrl.findById(req.user, req.params.id, function (err, prePick) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", prePick);
		});
	})


router.route("/pick/:id")
	.get(AuthController.checkAccess(1), function (req, res) {
		PickCtrl.findById(req.params.id, function (err, pick) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", pick);
		});
	});

router.route("/:id")
	.get(AuthController.checkAccess(0), function (req, res) {
		CustomerCtrl.findById(req.params.id, function (err, customer) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", customer);
		});
	});

module.exports = router;