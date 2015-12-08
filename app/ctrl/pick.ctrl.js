
var C=require("../../config/config");
var async = require("async");
var PickModel = require(C.models+"pick");
var CompanyModel = require(C.models+"company");
var CustomerModel = require(C.models+"customer");
var Controller = {};

Controller.new = function(body, cb){
	if(!body || !body.id_customer || !body.company  || !body.initDate  || !body.state)
		return cb("Fields not filled");

	var pick = new PickModel(body);
	pick.dateCreated = new Date();

	pick.save(function(err){
		if(err) return cb(err);
		cb();
 
	});
};

Controller.search = function(query, cb){
	PickModel.search(query, function(err, picks){

		if(err) return cb(err);

		if(!picks || picks.length == 0)
			return cb("Picks not found");

		async.map(picks, function(pick, next){
			async.waterfall([
					function(callback){
						CustomerModel.findById(pick.id_customer, 'name surname email location',function(err, customer){
							if(err) return callback(err);
							console.log(pick);
							pick.id_customer =customer;
							callback(null, pick);
						});
					},
					function(p, callback){
						CompanyModel.findById(p.company.id_company, 'cif email name category promotions locations phone photos ',function(err, company){
							if(err) return callback(err);
							p.company.id_company =company;
							callback(null, p);
						});
					},
					function(p, callback){
						CompanyModel.findServiceById(p.company.id_company, p.company.id_service, function(err, service){
							if(err) return callback(err);
							var pickData = [];
							pickData.push(p);
							pickData.push({"serviceData": service});
							callback(null, pickData);

						})
					}

				], function(err, result){
					if(err) return next(err);
					next(null, result);
				});


		}, function(err, result){
			if(err) return cb(err);
			cb(null, result);
		});		
	});
};

Controller.findById = function(id, cb){
	PickModel.findById(id, function(err, pick){
		if(err) return cb(err);

		if(!pick )
			return cb("No pick found");

		CustomerModel.findById(pick.id_customer, 'name surname email location',function(err, customer){
			if(err) return cb(err);
			pick.id_customer =customer;
			CompanyModel.findById(pick.company.id_company, 'cif email name category promotions locations phone photos ',function(err, company){
				if(err) return cb(err);
				pick.company.id_company =company;
				CompanyModel.findServiceById(pick.company.id_company, pick.company.id_service, function(err, service){
					if(err) return cb(err);
					var pickData = [];
					pickData.push(pick);
					pickData.push({"serviceData": service});
					cb(null, pickData);
				})				
			});			
		});				
	});
};

Controller.delete = function(query, cb){

	if (!query || !query._id) return cb("Fields not Filled");

	PickModel.findByIdAndRemove(query._id, function (err,pick){
    	if(err) return cb(err);

		if(!pick)
			return cb("No pick deleted");	
		cb();
	})

}

module.exports = Controller;