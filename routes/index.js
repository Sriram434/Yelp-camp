var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");


//router routes
router.get("/",function(req,res){
	res.render("landing")
})

//AUTH ROUTES
//Sign Up route
router.get("/register",function(req,res){
	res.render("register")
})
//REGISTER ROUTE
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message)
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to the campground " + user.username)
			res.redirect("/campground")
		})
	})
})

//Show login form
router.get("/login",function(req,res){
	res.render("login")
})

//Handiling login form
router.post("/login", passport.authenticate("local",
	{
	successRedirect: "/campground",
	failureRedirect: "login"
	}), function(req,res){
})

//Logout Form
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success", "logged out successfully")
	res.redirect("/campground")
})

module.exports = router;