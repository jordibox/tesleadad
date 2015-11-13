var C = require("../../config/config.js");
var mongoose = require('mongoose');
var async = require("async");

var customerModel = require(C.models + "customer.js");
var companyModel = require(C.models + "company.js");
var pickModel = require(C.models + "pick.js");
var service_nameModel = require(C.models + "service_name.js");
var categoryModel = require(C.models + "category.js");



describe("Mongodb", function () {

	it("Available connection", function () {
		require(C.config + "database.js")();
	});

	describe("Models test", function () {
		var category, company, customer, pick;

		describe("Creating Models", function () {
			category = new categoryModel({
				name: 'Peluqueria'
			});

			customer = new customerModel({
				name: 'Claudia', email: 'pepo@hotmail.com', surname: 'Pascual', birthDate: new Date()
			});
			customer.location = { country: 'España' };
			company = new companyModel({
				cif: '000', name: 'Pi'
			});
			company.customers.push(customer._id);
			company.category = category._id;

			pick = new pickModel({
				company: { id_service: 1 },
				initDate: new Date()
			});
			pick.id_customer = customer._id;
			pick.company.id_company = company._id;


			it("Category created", function () {
				expect(category).not.toEqual(undefined);
				expect(category).not.toEqual(null);
			})

			it("Customer created", function () {
				expect(customer).not.toEqual(undefined);
				expect(customer).not.toEqual(null);
			})
			it("Company created", function () {
				expect(company).not.toEqual(undefined);
				expect(company).not.toEqual(null);
			})
			it("Pick created", function () {
				expect(pick).not.toEqual(undefined);
				expect(pick).not.toEqual(null);
			})


		});
		describe("Saving Models", function () {


			async.parallel({
				category: function (cb) {

					category.save(function (err, result) {

						cb(err, result);
					});

				},
				customer: function (cb) {

					customer.save(function (err, result) {
						expect(result).toEqual(customer);
						done();
						cb(err, result);
					});

				},
				company: function (cb) {

					company.save(function (err, result) {

						cb(err, result);
					});

				},
				pick: function (cb) {

					pick.save(function (err, result) {

						cb(err, result);
					});

				}

			}, function (err, result) {
			
				if (err) { console.log(err) };

				
					async.each(Object.keys(result), function rollback(key, next) {
						if (result[key]) {
							result[key].remove(function (err) {
								next();
							});
						} else {
							next();
						}

					}, function () {
					
						finish();
					})
				
				

			});
		});




	});




});


function finish() {
	it("Close connection", function () {

		mongoose.connection.close();

	})
}