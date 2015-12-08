var Router = require("express").Router;
var C = require("../../config/config");
var AuthController = require(C.ctrl+"auth.ctrl");
var CategoryCtrl = require(C.ctrl+"category.ctrl");
var PrePickCtrl = require(C.ctrl+"prePick.ctrl");
var PickCtrl = require(C.ctrl+"pick.ctrl");
var ServiceCtrl = require(C.ctrl+"service.ctrl");
var PromotionCtrl = require(C.ctrl+"promotion.ctrl");
var Response = require("../lib/response");
var router = Router();
router.route("/category")
	.get(AuthController.checkAccess(0), function (req, res) {
		CategoryCtrl.search(req.query, function(err, categories){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", categories);
		} );
	})
	
	.post(function (req, res){
		CategoryCtrl.newCategory(req.body, function(err){ 
		if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "Create Category Successfully");

		});
	});

router.route("/prePick")
	.post(AuthController.checkAccess(0), function(req, res){
		PrePickCtrl.calculatePrePicks(req.body, function(err){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "PrepIcks created");
		})
	});

router.route("/pick")
	.get(AuthController.checkAccess(0), function (req, res) {
		PickCtrl.search(req.query, function (err, picks) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", picks);
		});
	})


router.route("/prePick")
	.get(AuthController.checkAccess(0),function(req, res){
		PrePickCtrl.search(0, req.query, function(err, prePicks){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", prePicks);
		})
	})
	
router.route("/service")
	.get(AuthController.checkAccess(0),function(req, res){
		ServiceCtrl.search(0, req.query, function(err, services){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", services);
		})
	})

router.route("/pick/:id")
	.get(AuthController.checkAccess(0), function (req, res) {
		PickCtrl.findById(req.params.id, function (err, pick) {
			if (err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", pick);
		});
	});
	
	
module.exports = router;