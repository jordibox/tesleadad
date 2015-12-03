
var C=require("../../config/config");

var CompanyModel = require(C.models+"company");
var async = require("async");
var Controller = {};

Controller.newCompany = function (body, cb) {
	if (!body || !body.cif || !body.name || !body.category) return cb("Fields not Filled");
	var company = new CompanyModel(body);

	company.save(function (err, result) {
		if (err) return cb(err);
		cb(null, result);
	});
};

Controller.search = function(query, cb){
	CompanyModel.search(query, function(err, companies){
		if(err) return cb(err);

		if(!companies)
			return cb(null, "No companies");
		
		return cb(null, companies);
	});
};



Controller.findById = function(id, cb){

	CompanyModel.findById(id, function(err, company){
		if(err) return cb(err);

		if(!company)
			return cb("No company found");
		
		return cb(null, company);
	});
};


Controller.rollback=function(id){
	CompanyModel.findByIdAndRemove(id);
}

module.exports = Controller;