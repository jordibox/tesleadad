var C=require("../../config/config");

var CustomerModel = require(C.models+"customer");
var Controller = {};

Controller.newEvent = function(user, body, cb){
	if(!body || !body.initDate || !body.endDate || !body.name )
		return cb("Fields not filled");

	CustomerModel.newEvent(user, body, function(err){
		if(err) return cb(err);
		cb();
	});

};

Controller.search = function(user, body, cb){
	CustomerModel.searchEvent(user, body, function(err, events){
		
		if(err) return cb(err);

		if(!events)
			return cb(null, "Events not found");


		cb(null, events);
	})
};

Controller.findById = function(user, id, cb){

	CustomerModel.findEventById(user, id, function(err, event){
		if(err) return cb(err);		
		cb(null, event);
	});
};

Controller.delete = function(user, body, cb){
	if (!body || !body._id) return cb("Fields not Filled");

	CustomerModel.deleteEvent(user, body._id, function(err){
		if(err) return cb(err);		
		cb();
	});
};

Controller.modify = function(user, id, body,cb){
	if(!body || !id )
		return cb("Fields not filled");

	CustomerModel.modifyEvent(user, id, body, function(err){
		if(err) return cb(err);		
		cb();
	});
};


module.exports = Controller;