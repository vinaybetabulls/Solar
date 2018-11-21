var mangoose = require("mongoose");

var express = require('express');
var router = express.Router();
var app = express();

var nodemailer = require('nodemailer');


// var transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   port: 587,
//    secure: true,
//   auth: {
//     user: 'info@digitak.se',
//     pass: '5AWLRCCn0jcY'
//   }
// });
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

		//console.log(estimationdata);
		//usermodal.findByIdAndUpdate(

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
	console.log(estimationdata);

	console.log("-----------------------");

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

	//console.log(estimationdata);
	//usermodal.findByIdAndUpdate(

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
							roof_pitch: estimationdata.roof_pitch
						}
					}
				},
				{ safe: true, upsert: true, new: true },
				function (err, model) {
					if (err) throw err;


					res.json(model)
				}
			);
		} else {
			res.json({ status: 400, "message": "invalid Ligin details" })
		}

	})




})

function mailsend(mail) {

	const output1 = `<body>

	<div style="padding: 30px;background-color:#2a3e58;color: #fff !important">
		<div style="text-align: -webkit-center"><img src="https://www.digitak.se/wp-content/uploads/2018/03/logo1.png" style="margin-bottom:30px;padding-left:100px">
	   <div style="font-size: 20px">Vi ville bara önska dig välkommen!</div>
	
	<div style="padding: 10px;background-color: #fff !important;text-align: left;color: #6f6b6b !important;;border-radius: 1em;margin-top: 20px">
	   <p>Hej ! </p>
	
	   <p> Jag heter Gustav Dafnäs och är din kontaktperson samt en av grundarna till Digitak.se</p>
		
		<p>Jag och mina medgrundare startade Digitak med visionen att förbättra processen för att hitta rätt hantverkare inom tak och solcellsinstallation genom att göra processen transparent, enkel och friktionsfri.
		</p><p>
		Varje fastighet är unik och alla husägare har olika preferenser, därför sköter vi varje uppdrag som att det var vår eget hem och hjälper dig genom hela processen. Vi ser därmed till att din upplevelse av Digitak inte är något annat än exceptionell.
		</p><p>
		Vi kommer i nästa steg att kontakta dig per telefon för att ställa några uppföljande frågor samt svara på eventuella frågor du kan tänkas ha innan en eventuell takomläggning eller installation av solpaneler och soltak.
		</p><p>
		Vår tjänst är helt kostnadsfri men om du trots det inte önskar ett samtal från oss ber vi dig meddela oss detta.
		</p>
		<br>
		<div style="text-align: center"><div style="
			display: inline-block;
			vertical-align: middle;
			margin: 20px;
		" ><img src="http://tak.digitak.se/img/pro_mng.png" style="heigth:150px;width:150px;border-radius: 70px;"></div><div style="
		display: inline-block;
		vertical-align: middle;
		text-align: left;
	"><p><b>Co-Founder</b><br>Gustav Dafnäs</p></div></div>
	   
	</div>
	</div>
	</div>
	
	</body>`;


	const output = `<body style="
    /* width: 50%; */
    background-color: #aaaaaa2b;
">   

	<div style="text-align: -webkit-center;margin: 20px;background: white;margin: 25px auto;width: 60%;border: 1px solid white;">
		<div style="
    padding: 10px;
">
	<img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;" width="200" height="68" src="https://marketing-image-production.s3.amazonaws.com/uploads/aa99de04872b24e46240ee94c7ccdaa704f55231c452244bb93054c46a985e3ef50addb4360c9435cabe27510e381381a14fa7217dbd00ab5d12604aa9063512.png" alt="Logo" data-proportionally-constrained="true">
	</div>
	<div style="padding:20px 0px;   color: black;font-size: 20px;    font-weight: bold;">Välkommen till Digitak!</div>
	
	<div style="text-align: left;">&nbsp;</div>
	<div style="padding: 0 50px 0 50px; color:  black;">
	<div style="text-align: center;"><span id="docs-internal-guid-bd667639-7fff-a5d7-b4e4-4f97f4493f4d" style="font-weight:normal;"><span style="font-size: 11pt; font-family: Arial; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; white-space: pre-wrap;">Mitt namn är Gustav Dafnäs och en av grundarna till Digitak.se</span></span></div>
	
	<div style="text-align: center;">&nbsp;</div>
	
	<div style="text-align: center;"><span style="background-color: transparent; font-family: Arial; font-size: 11pt; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; white-space: pre-wrap;">Tack för att du ger oss och våra samarbetspartners möjlighet att offerera solpaneler, takbyte eller laddstolpar för ditt hem, BRF eller lantbruk.</span></div>
	
	<div style="text-align: center;">&nbsp;</div>
	
	<div style="text-align: center;"><span style="background-color: transparent; font-family: Arial; font-size: 11pt; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; white-space: pre-wrap;">Varje fastighet är unik och alla husägare har olika preferenser, därför sköter vi om varje uppdrag som att det är vårt eget hem och hjälper dig igenom hela processen.</span></div>
	
	<div style="text-align: center;">&nbsp;</div>
	
	<div style="text-align: center;"><span style="font-style: normal; font-variant: normal; font-weight: 400; background-color: transparent; font-size: 11pt; font-family: Arial; white-space: pre-wrap;">Digitak är en totalleverantör med samarbeten runt om i Sverige. </span>
	
	<div style="text-align: center;">&nbsp;</div>
	
	<div style="text-align: center;"><span id="docs-internal-guid-492915ba-7fff-c4ed-7970-968c0205a3d2" style="font-weight:normal;"><span style="font-size: 20px; font-family: Arial; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; white-space: pre-wrap;">Vad händer nu?</span></span><span id="docs-internal-guid-492915ba-7fff-c4ed-7970-968c0205a3d2" style="font-weight:normal;"><span style="font-size: 11pt; font-family: Arial; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; white-space: pre-wrap;"> </span></span></div>
	
	<div style="text-align: center;">&nbsp;</div>
	
	<div style="text-align: center;"><span style="font-weight:normal;"><span style="font-size: 11pt; font-family: Arial; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; white-space: pre-wrap;">Vi återkommer inom 24h med tre olika solcellspaket baserat på förutsättningarna för din fastighet. Därefter väljer du själv om du vill gå vidare med oss och i sånt fall kommer vi erbjuda dig ett kostnadsfritt hembesök.</span></span></div>
	
	<div style="text-align: center;">&nbsp;</div>
	
	<div style="text-align: center;"><span style="font-weight:normal;"><span style="font-size: 11pt; font-family: Arial; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; white-space: pre-wrap;">Vänligen,</span></span></div>
	
	<div style="text-align: center;">
	<div dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 12pt;"><span style="font-weight:normal;"><span style="font-size: 11pt; font-family: Arial; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; white-space: pre-wrap;">Gustav Dafnäs</span></span></div>
	</div>
	</div>
	</div>
	<div style="text-align: -webkit-center; padding: 0 0 64px 0;">
	<img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:30% !important;width:30%;height:auto !important;" src="https://marketing-image-production.s3.amazonaws.com/uploads/b4a97a44f84f8de899f3f3b2aa6d2346b2ba4cb568342e294b4d0a19191c533dae742851617c909e9a771d3c221e884de8927077d8f5cf15cb0b560565004a14.png" alt="" width="180">
	
	
	<a href='https://www.digitak.se/' style="background-color:#152180;border:1px solid #333333;border-color:#152180;border-radius:4px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:8px;padding:15px 75px 15px 75px;text-align:center;text-decoration:none" href="" target="_blank">Gör en ny förfrågan</a>
	</div>
	</div></body>`;
	// create reusable transporter object using the default SMTP transport

	// setup email data with unicode symbols
	let mailOptions = {
		from: 'hej@digitak.se',
		to: mail,
		cc: 'info@digitak.se', // list of receivers
		subject: 'Välkommen till Digitak!', // Subject line
		text: '', // plain text body
		html: output // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}

		return info;


		// res.status(200).send(info);
		transporter.close();
	});

}





/*
maincat.findOne({_id:'5a30f29ffb158119c44e601b'},function(err,resdata)
{
	if(err) throw err
		if(!resdata.subcat)
		{
			res.json({"status":400,"message":"success"})
		}
	
				var subcat=new maincat;
	
				resdata.subcat=[{subcat_title:"subcat",subcat_image:"string"}]
	
		
	
	
				resdata.save(function(err,resdata)
				{
	
						if(err) throw err
	
						res.send(resdata)	
							
				})
	
			})
	




})
*/


router.get("/logout", function (req, res) {
	res.json({
		status: 200,
		message: 'Log out successfully',
		token: "",

	});


})


module.exports = router;
