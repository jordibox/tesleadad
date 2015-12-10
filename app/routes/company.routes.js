var Router = require("express").Router;
var C = require("../../config/config");
var CompanyCtrl = require(C.ctrl+"company.ctrl");
var AuthController = require(C.ctrl+"auth.ctrl");
var ServiceCtrl = require(C.ctrl+"service.ctrl");
var PromotionCtrl = require(C.ctrl+"promotion.ctrl");
var PickCtrl = require(C.ctrl+"pick.ctrl");
var CategoryCtrl = require(C.ctrl+"category.ctrl");
var Response = require("../lib/response");
var router = Router();

router.route("")
	.post(function (req, res, next) { //function(request, responde, [siguiente funcion]), es como un array de funciones,con next pasas a la siguiente
		CompanyCtrl.newCompany(req.body, function (err, user) { //contenido del POST, function(error, return de newUser)
			if (err) Response.printError(res, err);
			else {
				req.user = user._id;
				next();
			}

		});
	}, function (req, res) {
		AuthController.register(2, req.body, req.user, function (err) {
			if (err) {
				CompanyCtrl.rollback(req.user);
				Response.printError(res, err)
			}
			else
				Response.printSuccess(res, "data", "Register Successfully");
		})
	}
		)
	.get(AuthController.checkAccess(0), function(req, res){
		CompanyCtrl.search(req.query, function(err, companies){
			if(err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", companies);
		});
	});


router.route("/profile")
	.get(AuthController.checkAccess(2), function (req, res) {
		CompanyCtrl.findById(req.user, function (err, company) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", company);
		});
	});

router.route("/pick")
	.get(AuthController.checkAccess(2), function (req, res) {
		req.query["company.id_company"] = req.user;	
		PickCtrl.search(req.query, function (err, picks) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", picks);
		});
	})
	.delete(AuthController.checkAccess(2), function (req, res) {
		PickCtrl.delete(req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Pick deleted");
		})
	});

router.route("/serviceName")
	.get(AuthController.checkAccess(2),function(req, res){
		ServiceCtrl.searchServiceName(req.query, function(err, serviceNames){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", serviceNames);
		})
	})

	
router.route("/service")
	.post(AuthController.checkAccess(2), function(req, res){
		ServiceCtrl.newService(req.user, req.body, function(err){
			if(err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Service created");
		});
	})
	.get(AuthController.checkAccess(2), function(req, res){
		ServiceCtrl.search(req.user, req.query, function(err, services){
			if(err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", services);
		});
	})
	.delete(AuthController.checkAccess(2), function (req, res) {
		ServiceCtrl.delete(req.user, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Service deleted");
		})
	});

router.route("/promotion")
	.post(AuthController.checkAccess(2), function(req, res){
		PromotionCtrl.new(req.user, req.body, function(err){
			if(err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Promotion created");
		});
	})
	.get(AuthController.checkAccess(2), function(req, res){
		PromotionCtrl.search(req.user, req.query, function(err, promotions){
			if(err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", promotions);
		});
	})
	.delete(AuthController.checkAccess(2), function (req, res) {
		PromotionCtrl.delete(req.user, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Promotion deleted");
		})
	});
router.route("/category")
	.get(AuthController.checkAccess(2), function (req, res) {
		CategoryCtrl.search(req.query, function(err, categories){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", categories);
		} );
	})

router.route("/pick/:id")
	.get(AuthController.checkAccess(2), function (req, res) {
		PickCtrl.findById(req.params.id, function (err, service) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", service);
		});
	})
	
router.route("/service/:id")
	.get(AuthController.checkAccess(2), function (req, res) {
		ServiceCtrl.findById(req.user, req.params.id, function (err, service) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", service);
		});
	})
	.put(AuthController.checkAccess(2), function (req, res) {
		ServiceCtrl.modify(req.user, req.params.id, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Service modified");
		});
	})	

router.route("/promotion/:id")
	.get(AuthController.checkAccess(2), function (req, res) {
		PromotionCtrl.findById(req.user, req.params.id, function (err, promotion) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", promotion);
		});
	})
	.put(AuthController.checkAccess(2), function (req, res) {
		PromotionCtrl.modify(req.user, req.params.id, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Promotion modified");
		});
	})	

router.route("/:id")
	.get(AuthController.checkAccess(0), function(req, res){
		CompanyCtrl.findById(req.params.id, function(err, company){
			if(err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", company);
		} );
	});


	
	module.exports = router;