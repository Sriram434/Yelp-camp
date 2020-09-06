// all the middleware goes here

var middlewareObj = {}
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

//checkCampgroundOwenership checking middle ware
middlewareObj.checkCampgroundOwenership = function(req, res, next){
	if(req.isAuthenticated()){	
		Campground.findById(req.params.id, function(err, foundCampground){
			//Adding !foundCampground inside the if loop as 
			// Flashing the user if campground is not found 
			if(err || !foundCampground){
				req.flash("error", "campground not found")
				res.redirect("back")
			}else{
				//Does the user own the campgrounds
				if(foundCampground.author.id.equals(req.user._id)){
					next()
				}else{
					req,flash("error", "You don't have permission to do")
					res.redirect("back")
				}	
			}
		})	
	//Else(USER is not logged in)
	}else{
		req.flash("error", "Need to Logon to do that")
		res.redirect("back")
	}
}

//checkCommentOwenership checking middle ware
middlewareObj.checkCommentOwenership = function(req, res, next){
	if(req.isAuthenticated()){
		
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error", "Comment not found")
				res.redirect("back")
			}else{
				//Does the user own the comments
				if(foundComment.author.id.equals(req.user._id)){
					next()
				}else{
					req.flash("error", "You don't have permission to do")
					res.redirect("back")
				}	
			}
		})	
	//Else(USER is not logged in)
	}else{
		res.redirect("back")
	}
}

//User logged in middle ware
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	req.flash("error", "user need to login")
	res.redirect("/login")
}


module.exports = middlewareObj;