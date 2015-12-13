
var C=require("../../config/config");

var CompanyModel = require(C.models+"company");
var ServiceCtrl = require(C.ctrl+"service.ctrl");
var PromotionCtrl = require(C.ctrl+"promotion.ctrl");
var PickCtrl = require(C.ctrl+"pick.ctrl");
var CategoryCtrl = require(C.ctrl+"category.ctrl");
var ServiceNameModel = require(C.models+"service_name");
var CategoryModel = require(C.models+"category");
var async = require("async");
var Controller = {};

Controller.newCompany = function (body, cb) {
	if (!body || !body.cif || !body.name || !body.category || !body.email) return cb("Fields not Filled");
	var company = new CompanyModel(body);

	company.save(function (err, result) {
		if (err) return cb(err);
		cb(null, result);
	});
};

Controller.search = function(query, cb){
	CompanyModel.search(query, function(err, companies){
		if(err) return cb(err);

		if(!companies || companies.length==0 )
			return cb(null, "No companies");
		
		async.map(companies, function(companie, next){	
			async.waterfall([
				function(callback){
					var c=companie.toObject();
					async.map(c.services, function(service, next){
						ServiceNameModel.findById(service["id_name"])
						.select('name duration keywords description')
						.exec(function(err, service_name){
							if(err) return next(err);	
							service["id_name"]=service_name;				
							next(null, service);
						});
					},function(err, result){
						if(err) return cb(err);	
						c.services = result;
						callback(null, c);
					});
				},
				function(comp, callback){
					CategoryModel.findById(comp.category)
					.select('name description')
					.exec(function(err, category){
						if(err) return callback(err);
						comp.category = category;
						callback(null, comp);
					});
				}
			],function(err, result){
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
	CompanyModel.findById(id, function(err, company){
		if(err) return cb(err);

		if(!company)
			return cb("No company found");
		
		async.waterfall([
			function(callback){
				company=company.toObject();
				async.map(company.services, function(service, next){
					ServiceNameModel.findById(service["id_name"])
					.select('name duration keywords description')
					.exec(function(err, service_name){
						if(err) return next(err);	
						service["id_name"]=service_name;				
						next(null, service);
					});
				},function(err, result){
					if(err) return cb(err);	
					company.services = result;
					callback(null, company);
				});
			},
			function(comp, callback){
				CategoryModel.findById(comp.category)
				.select('name description')
				.exec(function(err, category){
					if(err) return callback(err);
					comp.category = category;
					callback(null, comp);
				});
			}
		],function(err, result){
			if(err) return next(err);
			cb(null, result);
		});



		
	});
};

Controller.newReview = function(user, body, cb){
	if (!body || !body.company_id || !body.rating ) return cb("Fields not Filled");
	
	CompanyModel.newReview(user, body, function(err){
		if(err) return cb(err);
		cb();
	})
};

Controller.newRateService = function(user, body, cb){
	if (!body || !body.service_id || !body.company_id || !body.rating ) return cb("Fields not Filled");
	
	CompanyModel.newRateService(user, body, function(err){
		if(err) return cb(err);
		cb();
	})
};


//*********************PICKS
Controller.searchPick=function(company, params, cb){
	params["company.id_company"] = company;
	PickCtrl.search(params, cb);
}

Controller.deletePick=function(params, cb){
	PickCtrl.delete(params, cb);
}

Controller.getPickById=function(id, cb){
	PickCtrl.findById(id, cb);
}

//***********************SERVICES
Controller.searchServiceName=function(params, cb){
	ServiceCtrl.searchServiceName(params, cb);
}

Controller.searchService=function(company, params, cb){
	ServiceCtrl.search(company, params, cb);
}

Controller.newService=function(company, params, cb){

	ServiceCtrl.new(company, params, cb);
}

Controller.modifyService = function(company, params, cb){
	ServiceCtrl.modify(company, params, cb);
}

Controller.deleteService=function(company, params, cb){
	ServiceCtrl.delete(company, params, cb);
}

Controller.getServiceById=function(id, cb){
	ServiceCtrl.findById(id, cb);
}

//***********************PROMOTIONS
Controller.searchPromotion=function(company, params, cb){
	PromotionCtrl.search(company, params, cb);
}

Controller.newPromotion=function(company, params, cb){
	PromotionCtrl.new(params, cb);
}

Controller.modifyPromotion = function(company, params, cb){
	PromotionCtrl.modify(company, params, cb);
}

Controller.deletePromotion=function(company, params, cb){
	PromotionCtrl.delete(company, params, cb);
}

Controller.getPromotionById=function(id, cb){
	PromotionCtrl.findById(id, cb);
}

//*******************CATEGORY
Controller.searchCategory=function(params, cb){
	CategoryCtrl.search(params, cb);
}





Controller.rollback=function(id){
	CompanyModel.findById(id,function(err, company){
		company.remove();
	});
}

module.exports = Controller;