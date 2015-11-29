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
		enum: ['pending', 'active', 'cancelled', 'finished'],
		required: true
	}
});


PickSchema.statics={
	search:function(params, cb){ //en params no meter id, todos los demas datos si
		var query = this.find({});
		
		query.exec(function(err, result){
			var filtred=result;

			cb(null, filtred);
		});
		
	}
};

module.exports = mongoose.model("Pick", PickSchema);