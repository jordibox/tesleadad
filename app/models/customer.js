var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var GeolocationType = require("./customType.js").GeolocationSchema;

var C=require("../../config/config");

var Utils=require(C.lib+"utils");

var EventSchema = new Schema({
	initDate:{
		type: Date
	},
	endDate:{
		type: Date
	}, 
	name:{
		type: String
	},
	description:{
		type: String
	},
	dateCreated: Date
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
	},
	dateCreated: Date
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
		
	}, 
	surname:{
		type: String,
		
	},	
	birthDate:{
		type:Date,
		
	},
	location:{
		country: String,
		currentLocation: GeolocationType,
		geolocation: [GeolocationType],
	},
	events: [EventSchema],
	prepicks: [PrepickSchema],
	registerDate: Date,
	lastAccess: Date,
	lastUpdate: Date
});


CustomerSchema.statics={
	search:function(params, cb){ //en params no meter id, todos los demas datos si
		var query = this.find({});
		for(var key in params){
			
			switch(key){
				case 'beforeBirthDate':
					query.where('birthDate').lt(params[key]);
					break;
				case 'afterBirthDate':
					query.where('birthDate').gt(params[key]);
					break; 

				case 'beforeRegister':
					query.where('registerDate').lt(params[key]);
					break;
				case 'afterRegister':
					query.where('registerDate').gt(params[key]);
					break; 

				case 'beforeLastUpdate':
					query.where('lastUpdate').lt(params[key]);
					break;
				case 'afterLastUpdate':
					query.where('lastUpdate').gt(params[key]);
					break; 
					
				case 'beforeAccess':
					query.where('lastAccess').lt(params[key]);
					break;
				case 'afterAccess':
					query.where('lastAccess').gt(params[key]);
					break;
				default:query.where(key).equals(Utils.like(params[key]));

			}

		}	
		query.exec(cb);
		
	},

	newEvent:function(user, params, cb){		
		this.findOneAndUpdate({email: user.email},{$push:{"events":{}}}, {safe:true, upsert:true, new:true}, function(err, customer){
			if(err)return cb(err);
			if(!customer)return cb(null, "User not found");
			var event = customer.events[customer.events.length-1];
			event.name = params.name;
			event.initDate = params.initDate;
			event.endDate = params.endDate;
			event.description = params.description;
			event.dateCreated = new Date();
			customer.save(function(err){
				if(err) return cb(err);				
				cb();
			});

			
		});
	},

	searchEvent:function(user, params, cb){
		
		var query = this.aggregate([{$unwind:"$events"},{$match: {email: user.email}}]);
		
		for(var key in params){
			switch(key){
				case 'beforeInitDate': 
					query.match({'events.initDate': {'$lte': new Date(params[key]) }}); //en agregate para trabajar con las fechas pide un objeto date,no es como find		
					break;
				case 'afterInitDate':
					var date = new Date(params[key]);
					query.match({'events.initDate':   { '$gte':  new Date(params[key])}});
					break; 
				case 'beforeEndDate':
					query.match({'events.endDate': {'$lte': new Date(params[key])}});
					break;
				case 'afterEndDate':
					query.match({'events.endDate': {'$gte': new Date(params[key])}});
					break;
				case 'beforeDateCreated':
					query.match({'events.dateCreated': {'$lte': new Date(params[key])}});
					break;
				case 'afterDateCreated':
					query.match({'events.dateCreated': {'$gte': new Date(params[key])}});
					break;
				default : 
					var field = "events."+key;

				query.match({'events.'+key: Utils.like(params[key])});
				break;

			}
		}

		query.exec(cb);


/*
		this.findOne({email: user.email}, function(err, user){
			if(err) return cb(err);
			if(!user) return cb(null, "User not found");

			var filtred = user.events.filter(function(event){
				
				return true;
			});
			cb(null, filtred);
		});

*/
	},

	findEventById: function(user, id, cb){

		this.findOne({email: user.email}, function(err, customer){
			if(err) return cb(err);

		    if(!customer)
				return cb("Customer not found");

			var event = customer.events.id(id);
			if(!event)
				return cb("Event not found");
			cb(null, event);

		})
	},

	modifyEvent: function(user, id, params, cb){
		this.findOne({email: user.email}, function(err, customer){
			if(err) return cb(err);

		    if(!customer)
				return cb("Customer not found");
			var event = customer.events.id(id);
			if(!event)
				return cb("Event not found");
			for(var key in params){
				event[key] = params[key];
			}

			customer.save(function(err){
				if(err) return cb(err);				
				cb();
			});

		});
	},

	deleteEvent: function(user, id, cb){
		this.findOne({email: user.email}, function(err, customer){
			if(err) return cb(err);

		    if(!customer)
				return cb("Customer not found");

			;
			if(!customer.events.id(id))
				return cb("Event not found");
			customer.events.id(id).remove();
			customer.save(function(err){
				if(err) return cb(err);
				cb();
			})
		})
	}

}




module.exports = mongoose.model("Customer", CustomerSchema);