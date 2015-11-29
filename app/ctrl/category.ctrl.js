
var C=require("../../config/config");

var CategoryModel = require(C.models+"category");
var Controller = {};

Controller.newCategory = function (body, cb) {
	if (!body || !body.name) return cb("Fields not Filled");
	
	var category = new CategoryModel(body);
	category.save(function (err) {
		if (err) return cb(err);
		cb();
	});
};

Controller.search = function(query, cb){
	CategoryModel.search(query, function(err, categories){
		if(err) return cb(err);

		if(!categories)
			return cb(null, "No categories");
		
		return cb(null, categories);

	});
};
	
module.exports = Controller;