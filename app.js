//Running with heroku
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	flash    = require("connect-flash"),
	passport   = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./models/campgrounds"),
	Comment    = require("./models/comments"),
	User       = require("./models/user"),
	methodOverride = require("method-override"),
	seedDB     = require("./seeds")


//Rewrite required routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index")

// mongodb://localhost:27017/yelp_camp_v12
console.log(process.env.DATABASEURL)
mongoose.connect('mongodb+srv://sriram:sriram@cluster0.3tdpa.mongodb.net/<dbname>?retryWrites=true&w=majority',{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("Connected to DB! "))
.catch( err => console.log(err.message))

	
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public")) // __dirname gives the main directory name
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


//PASSPORT Configuration
app.use(require("express-session")({
	secret: "This the secret key",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

//Adding middle ware to all template(routes)
app.use(function(req,res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error")
	res.locals.success = req.flash("success")
	next();
})

app.use(indexRoutes);
app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comments",commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("server has started")
})