const Listing = require('./Models/Listing.js');
const ExpressError = require("./utils/ExpressError.js");
const {listingschema,reviewschema}=require("./schema.js")
const Review = require('./Models/Review.js');


module.exports.isloggedin=(req,res,next)=>{
     if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl
      req.flash("error","Please Login First")
      return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl=(req,res,next)=>{
     if(req.session.redirectUrl){
      res.locals.redirectUrl=req.session.redirectUrl
     }
    next()
}

module.exports.isOwner= async (req,res,next)=>{
  let {id}=req.params
     let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentuser._id)){
      req.flash("error","You are not the owner of this listing")
     return res.redirect(`/listings/${id}`);
    }
    next()
}

module.exports.isAuthor= async (req,res,next)=>{
  let {id,reviewId}=req.params
     let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currentuser._id)){
      req.flash("error","You are not the author of this review")
     return res.redirect(`/listings/${id}`);
    }
    next()
}


     module.exports.validateListing =(req,res,next)=>{
  let {error}=listingschema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",")
  throw new ExpressError(400,errMsg);
}else{
  next();
}
}

  module.exports. validatereview =(req,res,next)=>{
  let {error}=reviewschema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",")
  throw new ExpressError(400,errMsg);
}else{
  next();
}
}





