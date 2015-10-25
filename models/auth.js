var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var crypto=require("crypto")
var C=require("../config/config");

var Utils=require(C.lib+"utils");

var AuthSchema = new Schema({

	email: {
		type: String,
		unique: true,
		required: true
	},

	password: {
		type: String,
		required: true
	},
	salt:String

});/*
AuthSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});*/

AuthSchema.pre("save", function(next){
	if(!this.isNew) return next();
	
	if(!Utils.validatePresenceOf(this.password)){
		next(new Error("Invalid password"));
	}else{
		next();
	}
});

AuthSchema.methods={
	
	authenticate:function(plainText){
		return this.encryptPassword(plainText)===this.password;
	},
	
	makeSalt:function(){
		return Math.round((new Date().valueOf()*Math.random()))+"";
	},
	
	encryptPassword:function(password){
		if(!password) return "";
		return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
	}
}



var OAuthClientSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: String,
	clientKey: String,
	clientSecret: String

});

OAuthClientSchema.statics = {
	load: function (id, cb) {
		this.findOne({
			_id: id
		}).exec(cb);
	}
}

OAuthClientSchema.pre("save", function (next) {
	if (!this.isNew) return next();
	this.clientKey = Utils.uid(16);
	this.clientSecret = Utils.uid(32);
	next();
});


var RequestTokenSchema= new Schema({
	created:{
		type:Date,
		default:Date.now
	},
	code:String,
	redirectUri:String,
	user:{
		type: Schema.ObjectId,
		ref: 'Auth'
	},
	client: {
		type:Schema.ObjectId,
		ref:"OAuthClient"
	}
});

RequestTokenSchema.statics={
	load: function(id, cb){
		this.findOne({
				_id:id
		}).exec(cb);
	}	
};

var AccessTokenSchema= new Schema({
	created:{
		type:Date,
		default:Date.now
	},
	token:String, 
	user:{
		type:Schema.ObjectId,
		ref:"Auth"
	},
	client:{
		type: Schema.ObjectId,
		ref: "OAuthClient"
	}
	
	
});

AccessTokenSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};


module.exports.Auth = mongoose.model("Auth", AuthSchema);
module.exports.OAuthClient=mongoose.model("OAuthClient", OAuthClientSchema);
module.exports.RequestToken=mongoose.model("RequestToken", RequestTokenSchema);
module.exports.AccessToken=mongoose.model('AccessToken', AccessTokenSchema);