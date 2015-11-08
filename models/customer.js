var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var C=require("../config/config");

var CustomerSchema = new Schema({
	preferences:{

	},
	email:{
		type: String,
		unique: true,
		required: true
	},
	name:{
		type: String,
		required: true
	}, 
	surname:{
		type: String,
		required: true
	},
	birthDate:{
		type:Date,
		required: true
	}
});
module.exports = mongoose.model("Customer", CustomerSchema);