
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



Controller.delete = function(query, cb){


	/*
	if (!query || !query._id) return cb("Fields not Filled");

	PickModel.findOne({ _id : query._id} ,  function (err, pick){

	    if(err) return cb(err);

	    if(!pick)
			return cb(null, "No pick");

	      pick.remove( function(err){
	        if(err) return cb(err);	 
	        	cb(null, "Pick deleted");      
	      });



	});
	*/

	if (!query || !query._id) return cb("Fields not Filled");

	PickModel.findByIdAndRemove(query._id, function (err,pick){

    	if(err) return cb(err);

		if(!pick)
			return cb(null, "No picks deleted");
		
		return cb(null, "Pick deleted");

	})



}

module.exports = Controller;