var Router = require("express").Router;
var CompanyCtrl = require("../ctrl/company.ctrl");
var AuthController = require("../ctrl/auth.ctrl");
var Response = require("../lib/response");
var router = Router();

router.route("")
	.post(AuthController.register(2), function(req, res){
		CompanyCtrl.newCompany(req.body, function(err){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "Register Successfully");
		});
	})
	.get(function(req, res){
		CompanyCtrl.search(req.query, function(err, companies){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", companies);
		});
	});
	
	module.exports = router;