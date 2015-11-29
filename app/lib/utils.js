var Utils = {};

Utils.validatePresenceOf=function(value){
	return value && value.length; 
};

Utils.like=function(value){
	return new RegExp('^'+value+'$', "i")
}






module.exports = Utils;