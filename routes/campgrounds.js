var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middlewareObj = require("../middleware"); //index.js is not required as express automatically detects and take the index.js file

// INDEX - Show all campgrounds
router.get("/",function(req,res){	
	Campground.find({},function(err, allCampground){
		if(err){
			console.log("Error while search")
			console.log(err)
		} else{
			res.render("campgrounds/index",{campgrounds:allCampground})
		}
	})	
})

// CREATE - Add new campgrounds in DB
router.post("/",middlewareObj.isLoggedIn,function(req,res){
	var name = req.body.name
	var image = req.body.image
	var price = req.body.price
	var desc = req.body.description
	var author = {
		id: req.user._id,
		username : req.user.username
	}
	var newCampground = {name:name, image:image, price: price, description:desc, author: author}
	
	Campground.create(newCampground,function(err, newlyCreated){
		if(err){
			console.log(err)
		}else{
			console.log(newlyCreated)
			res.redirect("/campground")
		}
	})	
})

//NEW - Show form to create new campground
router.get("/new",middlewareObj.isLoggedIn,function(req,res){	
	res.render("campgrounds/new")
})

// SHOW - Gives more info about campground
router.get("/:id",function(req,res){
	//Find the campground with the provided ID and render that campground
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found")
			res.redirect("back")
		}else{
			res.render("campgrounds/show",{campground:foundCampground})
		}
	})
})

//EDIT Campground Route
router.get("/:id/edit", middlewareObj.checkCampgroundOwenership ,function(req,res){	
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground})
	})
})

//Update Campground Route
router.put("/:id", middlewareObj.checkCampgroundOwenership ,function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground , function(err, update){
		if(err){
			res.redirect("/campground")
		}else{
			res.redirect("/campground/" + req.params.id)	
		}
	})
})

//Destroy Campground
router.delete("/:id", middlewareObj.checkCampgroundOwenership,function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campground")
		}else{
			res.redirect("/campground")
		}
	})
	
})


module.exports = router;