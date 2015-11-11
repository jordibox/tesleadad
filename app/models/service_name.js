var mongoose = require("mongoose");
var Schema = mongoose.Schema;


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

module.exports = mongoose.model("Service_Name", Service_NameSchema);