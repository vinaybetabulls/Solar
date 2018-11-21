var mangoose = require("mongoose");

var express = require('express');
var router = express.Router();
var app = express();

var usermodal = require("../models/usermodal");
var adminmodal = require("../models/adminmodel");

var tokenverify = require("./tokenauth");

var datetime = new Date();
var config = require("../../config.json");

var jwt = require('jsonwebtoken');

router.post("/register", function (req, res, next) {



	var reqdata =req.body;
	var estdata = [];
	if (reqdata.estdet != "") {

		estdata = reqdata.estdet;

	}
	var adminsave = new adminmodal({
		name: reqdata.name,
		phone: reqdata.phone,
		password: reqdata.password,
		email: reqdata.email,		
		updateon: datetime	
	
	})



	adminmodal.findOne({ email: reqdata.email }, function (err, data) {
		if (err) throw err;

		if (data) {
			res.status(200).json({ "status": 400, "message": "Email already used" });

		} else {
			adminsave.save(function (err, data) {
				if (err) throw err


				const payload = {
					userid: data.userid,
					email: data.email,
					phone: data.phone,
					name: data.name,
				
				};
				var token = jwt.sign(payload,config.secrettoken);	

				// var token = jwt.sign(payload, app.get('superSecret'), {   expiresInMinutes: 1440 // expires in 24 hours         });

				res.status(200).json({
					status: 200,
					message: 'Enjoy your token!',
					token: token,
					data: payload
				});




			})


		}
	})



})



router.post("/adminLogin", function (req, res) {
	var requestdata = JSON.parse(req.body.json);
	console.log(requestdata);
	fields = {
		name: 1,
	
		email: 1,
		
	}
	

	adminmodal.findOne({}, function (err, data) {
		if (err) throw err;
		if (!data) {
			res.json({ "status": 400, message: 'Invalid Email or Password' });

		} else if (data) {

			const payload = {
			
				email: data.email,
			
				name: data.name,
				
			};
				var token = jwt.sign(payload,config.secrettoken);	

			// var token = jwt.sign(payload, app.get('superSecret'), {   expiresInMinutes: 1440 // expires in 24 hours         });

			res.json({
				status: 200,
				message: 'Enjoy your token!',
				token: token,
				data: payload
			});

		}

	})


})
router.get("/users", function (req, res, next) {
    usermodal.find({type:"USER"
    }).sort({cratedon:-1}).exec( function (err, data) {
		if (err) {
			res.json({ "sta0tus": 400, "message": "something went wrong please try aganin" })
		} else {
			res.json({ "status": 200, "message": "success", "data": data });
		}
	})

})

router.get("/users", function (req, res, next) {
    usermodal.find({type:"USER"
    }).sort({cratedon:-1}).exec( function (err, data) {
		if (err) {
			res.json({ "sta0tus": 400, "message": "something went wrong please try aganin" })
		} else {
			res.json({ "status": 200, "message": "success", "data": data });
		}
	})

})

router.get("/contractor", function (req, res, next) {
    usermodal.find({type:"CONTRACTOR"
    }, function (err, data) {
		if (err) {
			res.send({ "sta0tus": 400, "message": "something went wrong please try aganin" })
		} else {
			res.json({ "status": 200, "message": "success", "data": data });
		}
	})

})


module.exports = router;
