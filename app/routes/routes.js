var express=require("express");

module.exports = function (app) {

	app.get('/', function (req, res) {
		res.jsonp({ message: "Welcome to PickYourDay!!" });
	});


	var router = express.Router();

	router.route("")
		.get(function (req, res) {
			res.jsonp({ message: "Welcome to PickYourDay API!!" });
		});

	

	router.use("/oauth", require("./auth.routes.js"));


	app.use("/api", router);
}