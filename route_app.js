var fs = require('fs');
var express = require("express");
var Images = require("./models/images");

var router = express.Router();

// app.com/app/
router.get("/", function(req, res){
	res.render("app/home");
});

router.get("/images/new", function(req, res){
	res.render("app/images/new");
});

router.get("/images/:id/edit", function(req, res){

});

// REST
router.route("/images/:id")
	  .get(function(req, res){
	  	Images.findById(req.params.id, function(err, imagen){
	  		res.render("app/images/show", {images: imagen});
	  	});
	  })
	  .put(function(req, res){

	  })
	  .delete(function(req, res){

	  });

router.route("/images")
	  .get(function(req, res){
	  	Images.find({}, function(err, imagen){
	  		if(err){
	  			res.redirect("/app"); 
	  			return;
	  		}
	  		res.render("app/images/index", {images: imagen});
	  	});
	  })
	  .post(function(req, res){
	  	console.log(req.body.file);
		var data = {
			title: req.body.title,
			//path: "/public/images/" + req.body.file
		};

		var image = new Images(data);

		image.save(function(err){
			if(!err)
				res.redirect("/app/images/" + image._id);
			else
				res.render(err);
		});
	  })

module.exports = router;