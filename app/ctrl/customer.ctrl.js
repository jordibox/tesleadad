
var C=require("../../config/config");
var PickCtrl = require(C.ctrl+"pick.ctrl");
var EventCtrl = require(C.ctrl+"event.ctrl");
var PrePickCtrl = require(C.ctrl+"prePick.ctrl");
var CompanyCtrl = require(C.ctrl+"company.ctrl");
var ServiceCtrl = require(C.ctrl+"service.ctrl");
var CategoryCtrl = require(C.ctrl+"category.ctrl");
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

//****************PICKS
Controller.searchPick=function(customer, params, cb){
	params["id_customer"] = customer;
	PickCtrl.search(params, cb);
}

Controller.newPick=function(customer, params, cb){
	params["id_customer"] =customer;
	PickCtrl.new(params, cb);
}

Controller.deletePick=function(params, cb){
	PickCtrl.delete(params, cb);
}

Controller.getPickById=function(id, cb){
	PickCtrl.findById(id, cb);
}

//***************EVENTS
Controller.searchEvent=function(customer, params, cb){
	EventCtrl.search(customer, params, cb);
}

Controller.newEvent=function(customer, params, cb){
	EventCtrl.new(customer, params, cb);
}

Controller.modifyEvent = function(customer, params, cb){
	EventCtrl.modify(customer, params, cb);
}

Controller.deleteEvent=function(customer, params, cb){
	EventCtrl.delete(customer, params, cb);
}

Controller.getEventById=function(customer, id, cb){
	EventCtrl.findById(customer, id, cb);
}

//******************PREPICKS
Controller.searchPrePick=function(customer, params, cb){
	PrePickCtrl.search(customer, params, cb);
}

Controller.deletePrePick=function(customer, params, cb){
	PrePickCtrl.delete(customer, params, cb);
}

Controller.getPrePickById=function(customer, id, cb){
	PrePickCtrl.findById(customer, id, cb);
}


//******************REVIEW
Controller.newReviewCompany=function(customer, params, cb){
	CompanyCtrl.newReview(customer, params, cb); 
}

Controller.newRateService=function(customer, params, cb){
	CompanyCtrl.newRateService(customer, params, cb);
}


//*******************CATEGORY
Controller.searchCategory=function(params, cb){
	CategoryCtrl.search(params, cb);
}


Controller.rollback=function(id){
	CustomerModel.findById(id,function(err, customer){
		customer.remove();
	});
}


//******************SEARCH
Controller.searchService = function(params, cb){
	if(!params.id_company)
		ServiceCtrl.search(0, params, cb);
	else
		ServiceCtrl.search(params.id_company, params, cb);
}

Controller.searchCompany = function(params, cb){
	CompanyCtrl.search(params, cb);
}





module.exports = Controller;