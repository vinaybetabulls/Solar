var express = require('express');
var app = express();



// node mailer


var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'versatilemobitech@gmail.com',
    pass: 'Password@august2018'
  }
});




app.get("/send",function(req,res)
{

	var html_res='Hej Mahesh!<br>';
	html_res+='<p>Jag heter Gustav Dafnäs och är din kontaktperson samt en av grundarna till Digitak.se</p>'
	html_res+='<p>Jag och mina medgrundare startade Digitak med visionen att förbättra processen för att hitta rätt hantverkare inom tak och solcellsinstallation genom att göra processen transparent, enkel och friktionsfri.</p>';
	html_res+='<p>Varje fastighet är unik och alla husägare har olika preferenser, därför sköter vi varje uppdrag som att det var vår eget hem och hjälper dig genom hela processen. Vi ser därmed till att din upplevelse av Digitak inte är något annat än exceptionell.</p>';
	html_res+='<p>Vi kommer i nästa steg att kontakta dig per telefon för att ställa några uppföljande frågor samt svara på eventuella frågor du kan tänkas ha innan en eventuell takomläggning eller installation av solpaneler och soltak.</p><p>Vår tjänst är helt kostnadsfri men om du trots det inte önskar ett samtal från oss ber vi dig meddela oss detta</p>';
	html_res+='<br><p>Vänligen,</p>';
	html_res+='<p>Gustav Dafnäs</p>';

	var mailOptions = {
		from: 'mahesh111557@gmail.com',
		to: 'maheshs.versatilemobitech@gmail.com',
		subject: 'Välkommen till Digitak!',
		text: 'That was easy!',
		html:html_res
	  };
    
    transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
	  res.send("Email sent");
    console.log('Email sent: ' + info.response);
  }
  
  
});
})


// end node mailer

//mailer = require('express-mailer');
;
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require("./config.json");
var swig = require('swig');
var cons = require('consolidate');
//const MONGO_URI = 'mongodb://VENKYSONU:VENKYSONU@ds121268.mlab.com:21268/digitak';

var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var multer = require('multer');
const path = require('path');
var users = require("./app/routes/user");
var admin = require("./app/routes/admin");

var usermodal = require("./app/models/usermodal");
var roofers = require("./app/models/roofers");

var session = require('express-session');
//const nodemailer = require('nodemailer');
var datetime = new Date();
var port = process.env.PORT || 80;
/*/mongoose.connect(MONGO_URI,{useMongoClient: true}).then(({db:digitak }) => console.log(`Connected to digitak`))
  .catch(err => console.error(err));*/
mongoose.connect(config.mongoconn);

app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' }));
app.use(bodyParser.json());
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set('superSecret', config.secrettoken);


app.engine('.html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/../example/dist');
app.use('/', express.static(__dirname + '/../example/dist'));
var smtpTransport = require('nodemailer-smtp-transport');


app.use(morgan('dev'));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//user registration 
/*
app.use(session({
    secret: config.secrettoken,
    resave: true,
    saveUninitialized: true,
     rolling: true,
     name: 'session1'
}));
*/

// let transporter = nodemailer.createTransport(smtpTransport({
// 	service: 'gmail',
// 	port:534,
// 	host: 'smtp.gmail.com',
// 	secure: false,
// 	auth: {
// 		user: 'maheshs.versatilemobitech@gmail.com', // generated ethereal user
// 		pass: 'mahesh3215'  // generated ethereal password
// 	},
// 	tls: {
// 		rejectUnauthorized: false
// 	}
// }));

app.use(function (req, res, next) {


	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headders', 'Origin,X-Requested-Width,Content-Type,Token,Accept');
	next();
}
)

app.post("/saveroofer",function(req,res){

	var deatils=new roofers(req.body);
	deatils.save(function(err,data)
   {
       res.send(data);
   })


})

app.post('/send', (req, res) => {
	const output = `<body>

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
	"><p>Co-Founder<br>Gustav Dafnäs</p></div></div>
	   
	</div>
	</div>
	</div>
	
	</body>`;

	// create reusable transporter object using the default SMTP transport

	// setup email data with unicode symbols
	let mailOptions = {
		from: 'mahesh111557@gmail.com',
		to: 'maheshs.versatilemobitech@gmail.com', // list of receivers
		subject: 'Node Contact Request', // Subject line
		text: 'Hello world?', // plain text body
		html: output // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		res.json({
			msg: 'mail sent'
		})

		// res.status(200).send(info);
		// transporter.close();
	});
}); 

app.post("/users", function (req, res, next) {
	usermodal.find({}, function (err, data) {
		if (err) {
			res.send({ "status": 400, "message": "something went wrong please try aganin" })
		} else {
			res.json({ "status": 200, "message": "success", "data": data });
		}
	})

})

app.post("/forgotpass", function (req, res, next) {
	var estimationdata = JSON.parse(req.body.json);
		usermodal.findOne({ email: estimationdata.email,type:estimationdata.type }, function (err, data) {
		if (err) {

		} else if (data) {

			
res.json({ "status": 200, "message": "success","data":data});
		
		} else {
			res.json({ status: 400, "message": "invalid Email details" })
		}

	})
})
app.post("/mailcheck", function (req, res, next) {



	/*app.mailer.send('email-request-sent', {
	   to: "mahesh111557@gmail.com", // REQUIRED. This can be a comma delimited string just like a normal email to field.
	   subject: 'Thankyou for you message to', // REQUIRED.
	   otherProperty: contactMessage // All additional properties are also passed to the template as local variables.
   }, function(err) {
	   if (err) {
		   // handle error
		   console.log(err);
		   res.send('There was an error sending the email');
		   return;
	   }
	   res.render("contact-success");
   });*/
})
app.get("/getcat", function (req, res) {

	var randomNumber = Math.random().toString();
	randomNumber = randomNumber.substring(2, randomNumber.length);
	res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
	console.log('cookie created successfully');



})

app.post("/users/registeruser", function (req, res, next) {



	var reqdata = JSON.parse(req.body.json);
	var estdata = [];
	if (reqdata.estdet != "") {

		estdata = reqdata.estdet;

	}
	var usersave = new usermodal({
		name: reqdata.name,

		phone: reqdata.phone,
		Password: reqdata.password,
		email: reqdata.email,
		profilepic: String,
		cratedon: datetime,
		updateon: datetime,
		businessname: reqdata.businessname,
		website: reqdata.website,
		address: reqdata.address,
		organization_number: reqdata.organization_number,
		type: reqdata.type,
		estdet: estdata

	})



	usermodal.findOne({ email: reqdata.email }, function (err, data) {
		if (err) throw err;

		if (data) {
			res.status(200).json({ "status": 400, "message": "Email already used" });

		} else {
			usersave.save(function (err, data) {
				if (err) throw err


				const payload = {
					userid: data.userid,
					email: data.email,
					phone: data.phone,
					name: data.name
				};
				var token = jwt.sign(payload, app.get('superSecret'));

				// var token = jwt.sign(payload, app.get('superSecret'), {   expiresInMinutes: 1440 // expires in 24 hours         });

				res.status(200).json({
					status: 200,
					message: 'Enjoy your token!',
					token: token,
					data: data
				});




			})


		}
	})



})



app.post("/forgotpassword", function (req, res, next) {
	if (req.body.email = "" || req.body.email == undefined) {
		req.json({ "status": 400, "message": "please provide email" });
	} else {

		usermodal.findOne({ email: req.body.email }, function (err, data) {


			if (err) {
				req.json({ "status": 400, "message": "something went wrong please try again" })
			} else {




			}

		})


	}
})


app.post("/users/userLogin", function (req, res) {
	var requestdata = JSON.parse(req.body.json);
	console.log(requestdata);
	fields = {
		name: 1,
		phone: 1,
		Password: 1,
		email: 1,
		profilepic: 1,
		cratedon: 1,
		updateon: 1,
		businessname: 1,
		website: 1,
		address: 1,
		organization_number: 1,
		type: 1,
		estdet: 1
	}
	if (requestdata.type == 'USER') {
		fields.website = fields.businessname = fields.address = fields.organization_number = 0;


	} else if (requestdata.type == 'CONTRACTOR') {
		fields.estdet = 0;
	}

	usermodal.findOne({ email: requestdata.email, type: requestdata.type,phone:requestdata.phone}, function (err, data) {
		if (err) throw err;
		if (!data) {
		//	res.json({ "status": 400, message: 'Invalid Email Or Password' });


		if (requestdata.estdet != "") {

			estdata = requestdata.estdet;
	
		}
		var usersave = new usermodal({
			
			email: requestdata.email,
			phone: requestdata.phone,		
			type: requestdata.type,
			estdet: estdata
	
		})

		usersave.save(function (err, data) {
			if (err) throw err

			console.log(data);
			const payload = {
				userid: data.userid,
				email: data.email,
				phone: data.phone,
				name: data.name
			};
			var token = jwt.sign(payload, app.get('superSecret'));

			// var token = jwt.sign(payload, app.get('superSecret'), {   expiresInMinutes: 1440 // expires in 24 hours         });

			res.status(200).json({
				status: 200,
				message: 'Enjoy your token!',
				token: token,
				data: data
			});




		})

		} else if (data) {

			const payload = {
				userid: data.userid,
				email: data.email,
				phone: data.phone,
				name: data.name
			};
			var token = jwt.sign(payload, app.get('superSecret'));

			// var token = jwt.sign(payload, app.get('superSecret'), {   expiresInMinutes: 1440 // expires in 24 hours         });

			res.json({
				status: 200,
				message: 'Enjoy your token!',
				token: token,
				data: data
			});

		}

	})


})
/*
app.use(function (req, res, next) {


	console.log(req.body);
	console.log("headers",req.headers)

	var token = req.body.token || req.query.token || req.headers['token'];

	jwt.verify(token, app.get('superSecret'), function (err, decod) {


		if (err) {
			res.json({ "status": 400, "message": "invalid token" })
		} else {

			console.log(decod);


			next();
		}

	})
})*/
app.use("/users", users);

app.use("/admin", admin);

app.get('/*', function (req, res) {
	res.render('index.html');
})
app.listen(port);

console.log("it is run on port" + port); 
