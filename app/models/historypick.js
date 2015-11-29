var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var C=require("../../config/config");
var Utils=require(C.lib+"utils");

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
		id_service:{		
			type: Number,
			required: true
		}
	},
	initDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	observation: String,
	state: {
		type: String, 
		enum: ['pending', 'active', 'cancelled', 'finished'],
		required: true
	}	
});

module.exports = mongoose.model("HistoryPick", HistoryPickSchema);