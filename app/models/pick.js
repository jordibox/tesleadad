var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var PickSchema = new Schema({
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
	observation: String,
	state: {
		type: String, 
		enum: ['pending', 'active', 'cancelled', 'finished']
	}
});

module.exports = mongoose.model("Pick", PickSchema);