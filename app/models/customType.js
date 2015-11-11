var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GeolocationSchema = new Schema({
	longitude: Number,
	latitude: Number,
	name: String
});

module.exports.GeolocationSchema = GeolocationSchema;