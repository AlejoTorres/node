var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/fotos");

var images_schema = new Schema({
	title: {
		type: String, 
		required: true
	}, 
	/*path:{
		type: String
		required: true
	} */
});

var Images = mongoose.model("Images", images_schema);

module.exports = Images;