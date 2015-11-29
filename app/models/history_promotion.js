var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var C=require("../../config/config");

var HistoryPromotionSchema = new Schema({
	name: String,
	initDate: Date,
	endDate:Date,
	deletedDate: Date,
	photos: [String],
	useLimit: Number,
	description: String,
	timesUsed: Number,
	ownCustomers: Boolean,
	id_company: Schema.ObjectId

});

module.exports = mongoose.model("HistoryPromotion", HistoryPromotionSchema);