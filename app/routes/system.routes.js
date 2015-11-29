var Router = require("express").Router;
var CategoryCtrl=require("../ctrl/category.ctrl");
var Response = require("../lib/response");
var router = Router();
router.route("/category")
	.get(function (req, res) {
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
	})
	
	
	
	
	module.exports = router;