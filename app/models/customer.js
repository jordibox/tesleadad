var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var GeolocationType = require("./customType.js").GeolocationSchema;

var C=require("../../config/config");

var Utils=require(C.lib+"utils");

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
		
	}
	
	//getById //otra funcion para buscar por id
};




module.exports = mongoose.model("Customer", CustomerSchema);