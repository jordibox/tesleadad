
var C=require("../../config/config");

var ServiceNameModel = require(C.models+"service_name");
var CompanyModel = require(C.models+"company");
var Controller = {};

Controller.newServiceName= function (body, cb) {
	if (!body || !body.name) return cb("Fields not Filled");
	
	var service = new ServiceNameModel(body);
	service.save(function (err) {
		if (err) return cb(err);
		cb();
	});
};

Controller.searchServiceName = function(query, cb){
	ServiceNameModel.search(query, function(err, services){
		if(err) return cb(err);

		if(!services)
			return cb(null, "No services");
		
		return cb(null, services);

	});
};

Controller.newService= function(user, body, cb){
	if (!body || !body.id_name || !body.price) return cb("Fields not Filled");

	CompanyModel.newService(user, body, function(err){
		if(err) return (err);
		cb();
	});
};

Controller.search = function(user, query, cb){

	CompanyModel.searchService(user, query, function(err, services){
		if(err) return cb(err);

		if(!services)
			return cb(null, "Services not found");
		
		cb(null, services);
	})
};

Controller.findById = function(user, id, cb){
	CompanyModel.findServiceById(user, id, function(err, service){
		if(err) return cb(err);		
		cb(null, service);
	});
};
	
Controller.modify = function(user, id, body, cb){
	if(!body || !id )
		return cb("Fields not filled");

	CompanyModel.modifyService(user, id, body, function(err){
		if(err) return cb(err);		
		cb();
	});
};

Controller.delete = function(user, body, cb){
	if (!body || !body._id) return cb("Fields not Filled");

	CompanyModel.deleteService(user, body._id, function(err){
		if(err) return cb(err);		
		cb();
	});
};
module.exports = Controller;