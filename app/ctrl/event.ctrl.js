var C=require("../../config/config");

var CustomerModel = require(C.models+"event");
var Controller = {};

Controller.newEvent = function(user, body, cb){
	if(!body || !body.initDate || !body.endDate || !body.name )
		return cb("Fields not filled");

	CustomerModel.newEvent(user, body, function(err){
		if(err) return cb(err);
		cb();
	});

};

Controller.searchEvent = function(user, body, cb){
	CustomerModel.search(user, body, function(err, events){
		if(err) return cb(err);

		if(!events)
			return cb(null, "Events not found");

		cb(null, events);
	})
};


module.exports = Controller;