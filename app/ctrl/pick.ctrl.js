
var C=require("../../config/config");

var PickModel = require(C.models+"pick");
var Controller = {};

Controller.new = function(body, cb){
	if(!body || !body.id_customer || !body.company  || !body.initDate  || !body.state)
		return cb("Fields not filled");

	var pick = new PickModel(body);

	pick.save(function(err){
		if(err) return cb(err);
		cb();
 
	});
};

Controller.search = function(query, cb){

	PickModel.search(query, function(err, picks){
		if(err) return cb(err);

		if(!picks)
			return cb(null, "No picks");
		
		return cb(null, picks);

	});
};

module.exports = Controller;