var mongoose = require("mongoose");

var C = require("../../config/config");

var Utils = require(C.lib+"utils");

var Schema = mongoose.Schema;
var CustomType = require("./customType.js");
var GeolocationType = CustomType.GeolocationSchema;

var C=require("../../config/config");

var RatingSchema = new Schema({
	id_customer: {
		type: Schema.ObjectId, 
		ref: "Customer",
		unique: true,
		required: true
	},
	rating: Number
});

var ReviewSchema = new Schema({
	id_customer: {
		type: Schema.ObjectId, 
		ref: "Customer",
		unique: true,
		required: true
	},
	rating: Number,
	description: String,
	date: Date
});

var PromotionSchema = new Schema({
	name: String,
	initDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	photos: [String],
	useLimit: Number,
	description: String,
	timesUsed: Number,
	ownCustomers: Boolean
});

var ServiceSchema = new Schema({
	id_name: { 
		type: Schema.ObjectId, 
		ref: "Service_name"
	},
	description: String,
	duration: Number,
	price: Number,
	rating: [RatingSchema],
	dateCreated: Date
});


var CompanySchema = new Schema({
	cif:{
		type: String,
		unique: true,
		required: true
	},
	email:{
		type: String,
		unique: true,
		required: true
	},
	emailSecond:[String],
	name:{
		type: String,
		required: true
	}, 
	description: String,
	photos: [String],
	phone: [String],
	keywords: [String],
	locations:[{
		country: String,
		province: String,
		city: String,
		zipcode: String,
		address: String,
		geolocation: GeolocationType
	}],
	category:{
		type: Schema.ObjectId, 
		ref: "Category",
		required: true
	},
	services: [ServiceSchema],
	review: [ReviewSchema],
	customers: [{type: Schema.ObjectId, ref: "Customer"}],
	registerDate: Date,
	lastAccess: Date,
	lastUpdate: Date
	

});

CompanySchema.statics={
	search:function(params, cb){ //en params no meter id, todos los demas datos si
		var query = this.find({});
		for(var key in params){
			query.where(key).equals(Utils.like(params[key]));
		}
		
		query.exec(cb);
		
	}

};
module.exports = mongoose.model("Company", CompanySchema);