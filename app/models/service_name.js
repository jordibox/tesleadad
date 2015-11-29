var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var C = require("../../config/config");

var Utils = require(C.lib+"utils");



var Service_NameSchema = new Schema({
	name : {
		type: String,
		unique: true,
		required: true
	},
	duration: Number,
	keywords: [String],
	description: String
});

Service_NameSchema.statics={
	search:function(params, cb){ //en params no meter id, todos los demas datos si
		var query = this.find({});
		for(var key in params){
			query.where(key).equals(Utils.like(params[key]));
		}
		
		query.exec(cb);
		
	}

};

module.exports = mongoose.model("Service_Name", Service_NameSchema);