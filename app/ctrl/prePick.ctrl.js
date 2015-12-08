var C=require("../../config/config");

var CustomerModel = require(C.models+"customer");
var Controller = {};

Controller.calculatePrePicks = function(body, cb){
	CustomerModel.search(body, function(err, customers){
		if(err) return cb(err);

		if(!customers)
			return cb(null, "No users");
		

		for(var customer in customers){
			
			var params={"date":""};
			params.date = new Date();
			params.id_company = "565af07e70dcbd2c25f0ee28";
			params.id_service = 9999;
			CustomerModel.newPrePick(customers[customer].email, params, function(err){
				if(err) return cb(err);
			})
		}
		cb();

	});
}

Controller.search = function(user, body, cb){
	CustomerModel.searchPrePick(user, body, function(err, prePicks){

		if(err) return cb(err);

		if(!prePicks || prePicks.length==0)
			return cb(null, "PrePicks not found");

		cb(null, prePicks);
	})
};

Controller.findById = function(user, id, cb){
	CustomerModel.findPrePickById(user, id, function(err, prePick){
		if(err) return cb(err);		
		cb(null, prePick);
	});
};

Controller.delete = function(user, body, cb){
	if (!body || !body._id) return cb("Fields not Filled");

	CustomerModel.deletePrePick(user, body._id, function(err){
		if(err) return cb(err);		
		cb();
	});
};


module.exports = Controller;