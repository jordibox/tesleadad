var Router = require("express").Router;
var C = require("../../config/config");
var AuthController = require(C.ctrl+"auth.ctrl");
var SystemCtrl = require(C.ctrl+"system.ctrl");
var Response = require("../lib/response");
var router = Router();
router.route("/category")
	.get(AuthController.checkAccess(0), function (req, res) {
		SystemCtrl.searchCategory(req.query, function(err, categories){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "categories", categories);
		} );
	})
	.post(AuthController.checkAccess(0), function (req, res){
		SystemCtrl.newCategory(req.body, function(err){ 
		if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "categories", "Create Category Successfully");

		});
	})
	.delete(AuthController.checkAccess(0), function (req, res) {
		SystemCtrl.deleteCategory(req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "categories", "Category deleted");
		})
	});

router.route("/prePick")
	.post(AuthController.checkAccess(0), function(req, res){
		SystemCtrl.calculatePrePicks(req.body, function(err){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "PrepIcks created");
		})
	})
	.get(AuthController.checkAccess(0),function(req, res){
		SystemCtrl.searchPrePick(req.query, function(err, prePicks){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", prePicks);
		})
	})

router.route("/pick")
	.get(AuthController.checkAccess(0), function (req, res) {
		SystemCtrl.searchPick(req.query, function (err, picks) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", picks);
		});
	})

	
router.route("/service")
	.get(AuthController.checkAccess(0),function(req, res){
		SystemCtrl.searchService(req.query, function(err, services){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", services);
		})
	})

router.route("/serviceName")
	.get(AuthController.checkAccess(0),function(req, res){
		SystemCtrl.searchServiceName(req.query, function(err, serviceNames){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", serviceNames);
		})
	})
	.post(AuthController.checkAccess(0), function(req, res){
		SystemCtrl.newServiceName(req.body, function(err){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "Service name created");
		})
	})
	.delete(AuthController.checkAccess(0), function (req, res) {
		SystemCtrl.deleteServiceName(req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Service name deleted");
		})
	});

router.route("/serviceName/:id")
	.put(AuthController.checkAccess(0), function (req, res) {
		SystemCtrl.modifyServiceName(req.params.id, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Service name modified");
		});
	})
	.get(AuthController.checkAccess(0), function (req, res) {
		SystemCtrl.getServiceNameById(req.params.id, function (err, pick) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", pick);
		});
	});

router.route("/pick/:id")
	.get(AuthController.checkAccess(0), function (req, res) {
		SystemCtrl.getPickById(req.params.id, function (err, pick) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", pick);
		});
	});
	
router.route("/category/:id")
	.put(AuthController.checkAccess(0), function (req, res) {
		SystemCtrl.modifyCategory(req.params.id, req.body, function (err) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", "Category modified");
		});
	})
	.get(AuthController.checkAccess(0), function (req, res) {
		SystemCtrl.getCategoryById(req.params.id, function (err, category) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", category);
		});
	});
	
module.exports = router;