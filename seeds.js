var mongoose = require("mongoose");
var Campground = require("./models/campgrounds")
var Comment = require("./models/comments")

mongoose.set('useFindAndModify', false);

var seeds = [
	{
		name: "Firey Woods",
		image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Curabitur in facilisis massa, interdum tempor mauris. Mauris tempus sem et felis porttitor interdum. In feugiat lectus vel lacus aliquam, bibendum tempus velit blandit. Sed porta volutpat justo ac rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc eget faucibus sapien, mattis euismod libero."
	},
	{
		name: "Hilly Top",
		image: "https://images.unsplash.com/photo-1533374623577-57317aa0efa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Curabitur in facilisis massa, interdum tempor mauris. Mauris tempus sem et felis porttitor interdum. In feugiat lectus vel lacus aliquam, bibendum tempus velit blandit. Sed porta volutpat justo ac rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc eget faucibus sapien, mattis euismod libero."
	},
	{
		name: "Smogy Chill",
		image: "https://images.unsplash.com/photo-1507777767380-68bdac55c642?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Curabitur in facilisis massa, interdum tempor mauris. Mauris tempus sem et felis porttitor interdum. In feugiat lectus vel lacus aliquam, bibendum tempus velit blandit. Sed porta volutpat justo ac rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc eget faucibus sapien, mattis euismod libero."
	},
	{
		name: "Heat Wood",
		image: "https://images.unsplash.com/photo-1535793874963-3032edda9cf7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Curabitur in facilisis massa, interdum tempor mauris. Mauris tempus sem et felis porttitor interdum. In feugiat lectus vel lacus aliquam, bibendum tempus velit blandit. Sed porta volutpat justo ac rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc eget faucibus sapien, mattis euismod libero."
	},
	{
		name: "Smogy Chill",
		image: "https://images.unsplash.com/photo-1507777767380-68bdac55c642?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Curabitur in facilisis massa, interdum tempor mauris. Mauris tempus sem et felis porttitor interdum. In feugiat lectus vel lacus aliquam, bibendum tempus velit blandit. Sed porta volutpat justo ac rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc eget faucibus sapien, mattis euismod libero."
	}
	
];

async function seedDB(){
	try{
		await Campground.deleteMany({});
		console.log("Campgrounds removed")
		await Comment.deleteMany({});
		console.log("Comments removed")

		for(const seed of seeds){
			let campground = await Campground.create(seed);
			console.log("campgrounds created")
			let comment = await Comment.create(
				{
					text: "Best campgrounds to vist in a life time",
					author: "Robin Hood"
				}
			)
			console.log("comments created")
			campground.comments.push(comment)
			campground.save()
			console.log("comments added to the campgrounds")
		}
	}
	catch(err){
		console.log(err.message)
	}
}

// function seedDB(){
// 	Campground.deleteMany({},function(err){
// 		if(err){
// 			console.log(err)
// 		}
// 		console.log("removed successfully")
// 		// Adding Campground
// 		data.forEach(function(seed){
// 			Campground.create(seed, function(err,campground){
// 				if(err){
// 					console.log(err)
// 				}else{
// 					console.log("added campground")
// 					//Creating comments
// 					Comment.create(
// 						{
// 							text: "Best campgrounds to vist in a life time",
// 							author: "Robin Hood"
// 						},function(err,comment){
// 							if(err){
// 								console.log(err)
// 							}else{
// 								//Pushing comment to the campground comments 
// 								campground.comments.push(comment)
// 								campground.save();
// 								console.log("comments done")
// 							}	
// 						})
// 				}
// 			})
			
// 		})
// 	})
// }

module.exports = seedDB;