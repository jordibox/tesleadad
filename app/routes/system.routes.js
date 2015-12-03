var Router = require("express").Router;
var C = require("../../config/config");
var AuthController = require(C.ctrl+"auth.ctrl");
var CategoryCtrl = require(C.ctrl+"category.ctrl");
var PrePickCtrl = require(C.ctrl+"prePick.ctrl");
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
	

	
	
module.exports = router;