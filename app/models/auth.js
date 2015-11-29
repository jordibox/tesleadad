var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var crypto=require("crypto")
var C=require("../../config/config");

var Utils=require(C.lib+"utils");

var AuthSchema = new Schema({

	email: {
		type: String,
		unique: true,
		required: true
	},

	hashed_password: {
		type: String,
		required: true
	},
	salt:String,
	role: Number
	//user: {type: Schema.Types.ObjectId}
});

AuthSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

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
		return this.encryptPassword(plainText)===this.hashed_password;
	},
	
	makeSalt:function(){
		return Math.round((new Date().valueOf()*Math.random()))+"";
	},
	
	encryptPassword:function(password){
		if(!password) return "";
		return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
	}
}

module.exports.Auth = mongoose.model("Auth", AuthSchema);
