var customerModel = require(C.models +"customer.js");
var companyModel = require(C.models +"company.js");
var pickModel = require(C.models +"pick.js");
var service_nameModel = require(C.models +"service_name.js");
var categoryModel = require(C.models +"category.js");

var category = new categoryModel({
	name: 'Peluqueria'
});

companyModel.find({}, function(error, companies){
	if(error)
		return console.log(error);

	console.log(companies);

	var comp = companies[0];

	comp.category = category._id;

	category.save(function(error, cat){

		if(error)
			return console.log(error);

		comp.save(function(error, co){

			if(error)
				return console.log(error);

			customerModel.find().exec(function(error, cu){

				if(error)
					return console.log(error);

				var pick = new pickModel({
					id_customer : cu[0]._id,
					company: {id_company: co._id, id_service: 1},
					initDate: new Date()
				});

				pick.save(function(error, pi){
					if(error)
						return console.log(error);

					console.log(pi);
				});


			});

		});

	});
});

/*
var company = new companyModel({
	cif: '000', name: 'Pi'
});
var customer = new customerModel({
	name: 'Claudia', email: 'pepo@hotmail.com', surname: 'Pascual', birthDate: new Date()
});

customer.location = {country: 'España'};

customer.save(function(error, cus){
	
	if(error)
		return console.log(error);

	console.log(cus);

	company.customers.push(cus._id);
	company.category = category._id;

	company.save(function(error, com){
		if(error)
			return console.log(error);

		console.log(com);
	});

});
*/