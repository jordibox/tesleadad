var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var C=require("../../config/config");

var HistoryPickSchema = new Schema({
	initDate: Date,
	endDate: Date,
	deletedDate: Date,
	name:String,
	description: String,
	dateCreated: Date,
	id_customer: Scheme.ObjectId
});