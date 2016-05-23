var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var app = express();

app.use("public", express.static("public"));
app.use(bodyParser.json()); // para peticiones application/json 
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: "123asdqwe456ñlkpoi",
	resave: false,
	saveUninitialized: false
}));

app.set("view engine", "jade");

app.get("/", function(req, res){
	console.log(req.session.user_id);
	res.render("index");
});

app.get("/signup", function(req, res){
	User.find(function(err, doc){
		console.log(doc);
		res.render("signup");
	});	
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/users", function(req, res){
	//console.log("email: " + req.body.email);
	//console.log("password: " + req.body.password);

	var user = new User({
		email: req.body.email, 
		password: req.body.password,
		password_confirmation: req.body.password_confirm,
		username: req.body.username
	}); 

	// promise
	user.save().then(function(us){
		res.send("Ok!!!");
	},function(err){
		if(err){
			console.log(String(err));
			res.send("Fail!!!");
		}
	});

	/*user.save(function(err, user, records){
		if(err){
			console.log(String(err));
		}
		res.send("Ok!!!");
	});*/
});

app.post("/sessions", function(req, res){
	User.findOne({
		email: req.body.email, 
		password: req.body.password
	}, 
	"username email", 
	function(err, user){
		req.session.user_id = user._id;
		//console.log(docs);
		res.send("=>");
	});

	/*User.find({
		email: req.body.email, 
		password: req.body.password
	}, 
	"username email", 
	function(err,docs){
		console.log(docs);
		res.send("=>");
	});*/
});

app.listen(8000);