var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var GeolocationType = require("./customType.js").GeolocationSchema;

var C=require("../../config/config");

var EventSchema = new Schema({
	initDate:{
		type: Date,
		required: true
	},
	endDate:{
		type: Date,
		required: true
	}, 
	name:{
		type: String,
		required: true
	},
	description:{
		type: String
	}
});

var PrepickSchema = new Schema({
	date:{
		type: Date,
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
	}	
});

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
	},
	location:{
		country: String,
		currentLocation: GeolocationType,
		geolocation: [GeolocationType],
	},
	events: [EventSchema],
	prepicks: [PrepickSchema]
});
module.exports = mongoose.model("Customer", CustomerSchema);