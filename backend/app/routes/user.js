var mongoose = require("mongoose");

var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer'),
	Mailer = require('../uilities/sendGrid');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'hej@digitak.se',
		pass: 'BZJpNf0Z0o9A'
	}
});
var usermodal = require("../models/usermodal");
var rooferdata = require("../models/roofers");
var tokenverify = require("./tokenauth");
var datetime = new Date();
var fields = {
	name: 1,
	phone: 1,
	Password: 1,
	email: 1,
	profilepic: 1,
	cratedon: 1,
	updateon: 1,
	businessname: 0,
	website: 0,
	address: 0,
	organization_number: 0,
	type: 1,
	estdet: 1
}

router.get("/", function (req, res, next) {
	usermodal.find({}, fields, function (err, data) {
		if (err) {
			res.send({ "sta0tus": 400, "message": "something went wrong please try aganin" })
		} else {
			res.json({ "status": 200, "message": "success", "data": data });
		}
	})
})

router.post("/connecttimes", function (req, res, next) {
	var estimationdata = JSON.parse(req.body.json);
	rooferdata.
		usermodal.findOne({ email: estimationdata.email }, function (err, data) {
			if (err) {

			} else if (data) {
				usermodal.findByIdAndUpdate(
					data._id,
					{
						$push: {
							"connecttime": {
								date: estimationdata.valdate,
								time: estimationdata.valtime,
							}
						}
					},
					{ safe: true, upsert: true, new: true },
					function (err, model) {
						if (err) throw err;
						res.json({ "status": 200, "message": "Thank you for provide timings,We will reach you soon", "data": model })
					}
				);
			} else {
				res.json({ status: 400, "message": "invalid Ligin details" })
			}
		})
})

router.post("/roofers_data", function (req, res, next) {
	var estimationdata = JSON.parse(req.body.json);
	rooferdata.findOne({ rooferid: estimationdata.rooferid }, function (err, data) {
		if (err) {

		} else if (data) {
			rooferdata.findByIdAndUpdate(
				data._id,
				{
					$push: {
						"users_data": {
							name: estimationdata.name,
							email: estimationdata.email,
							phone: estimationdata.phone,
							area: estimationdata.area,
							coordinates: estimationdata.coordinates,
							slope: estimationdata.slope,
							estimatedamount: estimationdata.estimatedamount,
							material: estimationdata.material,
							slopecost: estimationdata.estimatedamount,
							materialcost: estimationdata.materialcost,
							labour: estimationdata.labour,
							address: estimationdata.address
						}
					}
				},
				{ safe: true, upsert: true, new: true },
				function (err, model) {
					if (err) throw err;
					mailsend(data.email);
					res.json({ "status": 200, "message": "Your request placed succesfully", "data": model })
				}
			);
		} else {
			res.json({ status: 400, "message": "invalid Login details" })
		}
	})
})

router.post("/estimation", function (req, res, next) {
	var estimationdata = JSON.parse(req.body.json);
	usermodal.findOne({ email: estimationdata.email }, function (err, data) {
		if (err) {
			res.json({ status: 400, "message": "Something went wrong" })
		} else if (data) {
			usermodal.findByIdAndUpdate(
				data._id,
				{
					$push: {
						"estdet": {
							area: estimationdata.area,
							coordinates: estimationdata.coordinates,
							slope: estimationdata.slope,
							estimatedamount: estimationdata.estimatedamount,
							material: estimationdata.material,
							slopecost: estimationdata.estimatedamount,
							materialcost: estimationdata.materialcost,
							labour: estimationdata.labour,
							address: estimationdata.address,
							property_type: estimationdata.property_type,
							floors: estimationdata.floors,
							roof_pitch: estimationdata.roof_pitch,
							power: estimationdata.power,
							e_consumption: estimationdata.e_consumption,
							panel: estimationdata.panel,
							battery: estimationdata.battery,
							panelsCount: estimationdata.panelsCount,
							solar_installation_cost: estimationdata.solar_installation_cost,
							supervisor_commission: estimationdata.supervisor_commission,
							digisolar_commission: estimationdata.digisolar_commission,
							solar_installation_With_commission: estimationdata.solar_installation_With_commission,
							solar_installation_after_tax: estimationdata.solar_installation_after_tax,
							display_cost: estimationdata.display_cost,
							solar_incentives: estimationdata.solar_incentives,
							battery_cost: estimationdata.battery_cost,
							battery_cost_after_tax: estimationdata.battery_cost_after_tax,
							battery_incentives: estimationdata.battery_incentives,
							solar_intallation_after_commission: estimationdata.solar_intallation_after_commission,
							battery_after_incentives: estimationdata.battery_after_incentives,
							final_cost: estimationdata.final_cost
						}
					}
				},
				{ safe: true, upsert: true, new: true },
				function (err, model) {
					if (err) throw err;
					if(!data.estdet.length) mailsend(estimationdata.email)
					res.json(model)
				}
			);
		} else {
			res.json({ status: 400, "message": "invalid Login details" })
		}
	})
})

function mailsend(mail) {
	Mailer.send('d-ffaa5868b96342e693da8ef81f88a9a9', mail, {
		name: ''
	}).then(() => console.log('sent an email successfully!')).catch(err => console.log(err));
}

router.get("/logout", function (req, res) {
	res.json({
		status: 200,
		message: 'Log out successfully',
		token: "",
	});
})

module.exports = router;
