
var C=require("../../config/config");
var async = require("async");
var PickModel = require(C.models+"pick");
var CompanyModel = require(C.models+"company");
var CustomerModel = require(C.models+"customer");
var ServiceNameModel = require(C.models+"service_name");
var CategoryModel = require(C.models+"category");
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
							var pObj=pick.toObject();
							pObj.id_customer =customer;
							callback(null, pObj);
						});
					},
					function(p, callback){
						CompanyModel.findById(p.company.id_company, 'cif email name category promotions locations phone photos ',function(err, company){
							if(err) return callback(err);
							var c=company.toObject();
							p.company.id_company =c;
							callback(null, p);
						});
					},
					function(p, callback){
						CompanyModel.findServiceById(p.company.id_company, p.company.id_service, function(err, service){
							if(err) return callback(err);
							var s =service.toObject();
							p.company.id_service = s;
							callback(null, p);
						})
					}, 
					function(p, callback){
						ServiceNameModel.findById(p.company.id_service.id_name)
						.select('name duration keywords description')
						.exec(function(err, service_name){
							if(err) return callback(err);
							p.company.id_service.id_name = service_name;

							callback(null, p);
						});
					},
					function(p, callback){
						CategoryModel.findById(p.company.id_company.category)
						.select('name description')
						.exec(function(err, category){
							if(err) return callback(err);

							p.company.id_company.category = category;
							callback(null, p);
						});
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