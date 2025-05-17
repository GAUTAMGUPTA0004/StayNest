if(process.env.NODE_ENV != "production") {
    require('dotenv').config()
}


const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const ejsMate = require('ejs-mate');
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter= require("./routes/listing.js")
const reviewsRouter=require("./routes/review.js")
const usersRouter=require("./routes/user.js")
const session = require('express-session')
const flash = require("connect-flash")
const passport=require("passport")
const LocalStrategy=require("passport-local");
const User = require('./Models/user.js');
const MongoStore = require('connect-mongo');







app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error")
  res.locals.currUser=req.user
  
  next();
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const mongoose = require('mongoose');

 const dbUrl = process.env.ATLASDB_URL;


 const store =  MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET, 
      },
      touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in MONGODB SESSION", err);
});


const sessionOptions={
  store,
   
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httponly:true

  }
};

app.use(session(sessionOptions));
app.use(flash());


main()
    .then(()=>{
        console.log("connection successful")

    })
    .catch((err)=>console.log(err));

    async function main() {
    await mongoose.connect(dbUrl);
}





app.use("/listings",listingsRouter);
app.use("/listings",reviewsRouter);
app.use("/",usersRouter);

    





 

// any page handling middleware
 app.all("/{*any}", (req, res,next) => {
  next(new ExpressError(404, "Page Not Found !!!"));
 });

 // error handling middleware
  app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("listings/error.ejs",{message});
 });

 


      app.listen(8080, () => {
        console.log("server is listening to port 8080");
      });      


