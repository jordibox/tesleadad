
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
	
module.exports = Controller;