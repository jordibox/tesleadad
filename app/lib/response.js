var Response = {};

Response.printSuccess = function(res, key, data){
	var keyData = {};
	keyData[key] = data;
	res.jsonp(keyData);
};

Response.printError = function(res, err){
	res.send({error:err});
};


module.exports = Response;