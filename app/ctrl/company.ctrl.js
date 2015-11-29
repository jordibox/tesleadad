
var C=require("../../config/config");

var CompanyModel = require(C.models+"company");
var Controller = {};

Controller.newCompany = function (body, cb) {
	if (!body || !body.cif || !body.name || !body.category) return cb("Fields not Filled");
	var company = new CompanyModel(body);

	company.save(function (err) {
		if (err) return cb(err);
		cb();
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

module.exports = Controller;