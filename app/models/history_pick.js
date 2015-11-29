var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var C=require("../../config/config");

var HistoryPickSchema = new Schema({
	id_customer: { 
		type: Schema.ObjectId, 
		ref: "Customer",
		required: true
	},
	company: {
		id_company:{
			type: Schema.ObjectId,
			ref: "Company",
			required: true
		},
		id_service: Number
	},
	initDate: Date,
	deletedDate: Date,
	observation: String,
	state: {
		type: String, 
		enum: ['pending', 'active', 'cancelled', 'finished'],
		required: true
	}	
});

module.exports = mongoose.model("HistoryPick", HistoryPickSchema);