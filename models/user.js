var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var gender = ["M", "F"];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "enter a valid email"];
var password_validation = {
	validator: function(p){
		return this.password_confirmation == p
	},
	message: "passwords are not the same"
};

/* tipos de datos: {String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array}*/
var user_schema = new Schema({
	name: String,
	username: {
		type: String, 
		required: true, 
		maxlength: [50, "username max. 50 characters"]
	},
	password: {
		type: String, 
		required: true, 
		minlength: [8, "password min. 8 characters"],
		validate: password_validation
	},
	age: {
		type: Number, 
		min: [5, "age min. 5"],
		max: [100, "age max. 100"]
	},
	email: {
		type: String, 
		required: "email required", 
		match: email_match
	},
	date_of_birth: Date,
	sex: {
		type: String, 
		enum: {
			values: gender, 
			message: "invalid option"
		}
	}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.password_confirm;
}).set(function(password){
	this.password_confirm = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;