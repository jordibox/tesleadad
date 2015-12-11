
var C=require("../../config/config");
var CategoryCtrl = require(C.ctrl+"category.ctrl");
var PrePickCtrl = require(C.ctrl+"prePick.ctrl");
var PickCtrl = require(C.ctrl+"pick.ctrl");
var ServiceCtrl = require(C.ctrl+"service.ctrl");
var PromotionCtrl = require(C.ctrl+"promotion.ctrl");
var Controller = {};

//***************CATEGORIES
Controller.searchCategory=function(params, cb){
	CategoryCtrl.search(params, cb);
}

Controller.newCategory=function(params, cb){
	CategoryCtrl.new(params, cb);
}

Controller.modifyCategory = function(id, params, cb){
	CategoryCtrl.modify(id, params, cb);
}

Controller.deleteCategory=function(params, cb){
	CategoryCtrl.delete(params, cb);
}

Controller.getCategoryById=function(id, cb){
	CategoryCtrl.findById(id, cb);
}

//******************PREPICKS
Controller.calculatePrePicks=function(params, cb){
	PrePickCtrl.calculatePrePicks(params, cb);
}

Controller.searchPrePick=function(params, cb){
	PrePickCtrl.search(0, params, cb);
}

Controller.searchPick=function(params, cb){
	PickCtrl.search(params, cb);
}

Controller.getPickById=function(id, cb){
	PickCtrl.findById(id, cb);
}


//******************SERVICES
Controller.searchService=function(params, cb){
	ServiceCtrl.search(0, params, cb);
}

Controller.searchServiceName=function(params, cb){
	ServiceCtrl.searchServiceName(params, cb);
}

Controller.newServiceName=function(params, cb){
	ServiceCtrl.newServiceName(params, cb);
}

Controller.modifyServiceName = function(id, params, cb){
	ServiceCtrl.modifyServiceName(id, params, cb);
}

Controller.deleteServiceName=function(params, cb){
	ServiceCtrl.deleteServiceName(params, cb);
}

Controller.getServiceNameById=function(id, cb){
	ServiceCtrl.findServiceNameById(id, cb);
}

