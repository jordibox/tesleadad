
var C=require("../../config/config");

var ServiceModel = require(C.models+"service_name");
var Controller = {};

Controller.newService= function (body, cb) {
	if (!body || !body.name) return cb("Fields not Filled");
	
	var service = new ServiceModel(body);
	service.save(function (err) {
		if (err) return cb(err);
		cb();
	});
};

Controller.search = function(query, cb){
	ServiceModel.search(query, function(err, services){
		if(err) return cb(err);

		if(!services)
			return cb(null, "No services");
		
		return cb(null, services);

	});
};
	
module.exports = Controller;