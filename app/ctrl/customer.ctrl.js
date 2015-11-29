
var C=require("../../config/config");

var CustomerModel = require(C.models+"customer");
var Controller = {};

Controller.newUser = function (body, cb) { //datos del body, callback

	if (!body || !body.email || !body.name || !body.surname || !body.birthDate) return cb("Fields not Filled");

	var customer = new CustomerModel(body);

	customer.save(function (err) {
		if (err) return cb(err);
		//cb("Error","usuario creado");
		cb();//Retorno de la funcion newUser
	});
};

Controller.search = function(query, cb){
	CustomerModel.search(query, function(err, customers){
		if(err) return cb(err);

		if(!customers)
			return cb(null, "No users");
		
		return cb(null, customers);

	});
};
	
Controller.delete = function(query, cb){

	if (!query || !query._id) return cb("Fields not Filled");

	CustomerModel.findByIdAndRemove(query._id, function (err,customer){

    	if(err) return cb(err);

		if(!customer)
			return cb(null, "No customer deleted");
		
		return cb(null, "Customer deleted");

	})
}

module.exports = Controller;