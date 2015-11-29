var Router = require("express").Router;
var CompanyCtrl = require("../ctrl/company.ctrl");
var AuthController = require("../ctrl/auth.ctrl");
var ServiceCtrl = require("../ctrl/service.ctrl")
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

router.route("/:id")
	.get(function(req, res){
		CompanyCtrl.findById(req.params.id, function(err, company){
			if(err) Response.printError(res, err);
			else
				Response.printSuccess(res, "data", company);
		} );
	});

	
router.route("/service")
	.post(function(req, res){
		ServiceCtrl.newService(req.body, function(err){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", "Service created");
		});
	})
	.get(function(req, res){
		ServiceCtrl.search(req.query, function(err, services){
			if(err) Response.printError(res, err);
				else
			Response.printSuccess(res, "data", services);
		});
	});
	

	
	module.exports = router;