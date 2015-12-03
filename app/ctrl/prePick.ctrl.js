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

module.exports = Controller;