const express = require('express');
const router= express.Router();
const wrapasync = require("../utils/WrapAsync.js");
const{validatereview,isloggedin,isOwner}=require("../middlewares.js");
const reviewController = require('../controllers/reviews.js');

//reviews post route
router.post("/:id/reviews",isloggedin,validatereview,wrapasync(reviewController.createReview));

//Delete review Route
  router.delete("/:id/reviews/:reviewId",isOwner, wrapasync(reviewController.destroyReview));


module.exports=router;