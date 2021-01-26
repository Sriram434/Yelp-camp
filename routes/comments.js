var express = require("express");
var	router = express.Router({mergeParams: true}); // Gets the parents parms id to the child
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middlewareObj = require("../middleware"); //index.js is not required as express automatically detects and take the index.js file
	
// COMMENTS ROUTES
//Comments new
router.get("/new",middlewareObj.isLoggedIn,function(req,res){
	console.log(req.params.id);
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new",{campground:campground})
		}
	})	
})
//Comments create
router.post("/",middlewareObj.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			req.flash("error", "Something went wrong")
			res.redirect("/campground")
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err)
				}else{
					//Add Username and id to the comments
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					// Save comment
					comment.save();
					campground.comments.push(comment)
					campground.save()
					req.flash("success", "Sucessfully added comment")
					res.redirect("/campground/" + campground._id)
				}
			})
		}
	})
})

//Edit comments
router.get("/:comment_id/edit",middlewareObj.checkCommentOwenership ,function(req,res){
	//Adding Campground.findById to check if the campground is there in comment/edit or not
	// if not we will flash the user with error message
	Campground.findById(req.params.id, function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found")
			res.redirect("back")
		}
		//Moving Comment.findById inside the Campground.findById function to verify the correct campground
		Comment.findById(req.params.comment_id,function(err, foundComment){
			if(err){
				res.redirect("back")
			}else{
				res.render("comments/edit", {campground_id: req.params.id, comment:foundComment})
			}
		})	
	})	
})
//Comment Update
router.put("/:comment_id",middlewareObj.checkCommentOwenership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, update){
		if(err){
			res.redire("back")
		}else{
			res.redirect("/campground/" + req.params.id)
		}
	})
})

//Delete Comment
router.delete("/:comment_id",middlewareObj.checkCommentOwenership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back")
		}else{
			req.flash("success", "Comment delted")
			res.redirect("/campground/" + req.params.id)
		}
	})
})



module.exports = router;