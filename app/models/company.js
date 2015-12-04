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
		unique: true
	},
	rating: Number
});

var ReviewSchema = new Schema({
	id_customer: {
		type: Schema.ObjectId, 
		ref: "Customer",
		unique: true
	},
	rating: Number,
	description: String,
	date: Date
});

var PromotionSchema = new Schema({
	name: String,
	initDate: {
		type: Date
	},
	endDate: {
		type: Date
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
	promotions: [PromotionSchema],
	services: [ServiceSchema],
	review: [ReviewSchema],
	customers: [{type: Schema.ObjectId, ref: "Customer"}],
	registerDate: Date,
	lastAccess: Date,
	lastUpdate: Date
	

});

CompanySchema.statics={
	search:function(params, cb){ 
		var query = this.find({});
		for(var key in params){
			query.where(key).equals(Utils.like(params[key]));
		}
		
		query.exec(cb);	
	},

	newReview: function(user, params, cb){
		//{$addToSet: {'review.id_customer': user}},
		this.findOneAndUpdate({_id: params.company_id},  {$addToSet:{review:{id_customer: user}}}, {safe:true, upsert:true, new:true},  function(err, company){
			if(err)return cb(err);
			if(!company)return cb("Company not found");

			var review = company.review[company.review.length-1];
			//review.id_customer = user;
			review.rating = params.rating;
			review.description = params.description;
			review.date = new Date();

			company.save(function(err){
				if(err) return cb(err);				
				cb();
			});
		});
	}

};
module.exports = mongoose.model("Company", CompanySchema);

