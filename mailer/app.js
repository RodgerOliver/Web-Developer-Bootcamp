var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var flash = require("connect-flash");
var expressSession = require("express-session");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({
	secret: "Parkour si the best sport ever!",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());

app.use(function(req, res, next) {
	res.locals.flashError = req.flash("error");
	res.locals.flashSuccess = req.flash("success");
	next();
});

/* ROUTES */
app.get("/", (req, res) => {
	res.render("home");
});

app.post("/send", (req, res) => {

	if(!req.body.subject || !req.body.content) {
		req.flash("error", "Fill all the fields");
		return res.redirect("/");
	}

	var output = `
		<h2>New Remainder</h2>
		<p>${req.body.content}</p>
	`;

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.stackmail.com",
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: "rodger@rodger.com", // generated ethereal user
			pass: "rodger120201"  // generated ethereal password
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: '"Remainder for you" <rodger@rodger.com>', // sender address
		to: 'timeline.mb@gmail.com', // list of receivers
		subject: req.body.subject, // Subject line
		html: output // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			console.log(error);
			req.flash("error", "Email could not be sent, try again.");
			return res.redirect("/");
		}
		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		req.flash("success", "Remainder Sent successfully!");
		res.redirect("/");
	});
});

var server = app.listen(process.env.PORT || 3000, process.env.IP, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Working on port " + port);
});