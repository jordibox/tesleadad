
var C=require("../../config/config");
var PickCtrl = require(C.ctrl+"pick.ctrl");
var CustomerModel = require(C.models+"customer");
var Controller = {};

Controller.newUser = function (body, cb) { //datos del body, callback

	if (!body || !body.email || !body.name || !body.surname || !body.birthDate) return cb("Fields not Filled");
	
	var customer = new CustomerModel(body);

	customer.save(function (err, result) {
		if (err) return cb(err);
		
		cb(null, result);
	});
};

Controller.search = function(query, cb){
	CustomerModel.search(query, function(err, customers){
		if(err) return cb(err);

		if(!customers)
			return cb(null, "No users");
		
		cb(null, customers);

	});
};

Controller.findById = function(id, cb){
	CustomerModel.findById(id, function(err, customer){
		if(err)return cb(err);

		if(!customer)
			return cb(null, "No user");

		return cb(null, customer);
	});
}
	
Controller.delete = function(query, cb){

	if (!query || !query._id) return cb("Fields not Filled");

	CustomerModel.findByIdAndRemove(query._id, function (err,customer){

    	if(err) return cb(err);

		if(!customer)
			return cb(null, "No customer deleted");
		
		return cb(null, "Customer deleted");

	})
}

Controller.getPick=function(customer, cb){
			PickCtrl.search({id_customer:customer}, cb);
	
}

Controller.createPick=function(params, customer, cb){
	params.id_customer=customer;
	PickCtrl.new(params, cb);
}

Controller.deletePick(params, customer, cb){
	params.id_customer=customer;
	PickCtrl.delete(params, cb);
}

Controller.rollback=function(id){
	CustomerModel.findById(id,function(err, customer){
		customer.remove();
	});
}

module.exports = Controller;