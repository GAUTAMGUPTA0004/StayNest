const express = require('express');
const router= express.Router();
const wrapasync = require("../utils/WrapAsync.js");
const multer  = require('multer')
const { storage } = require('../cloudConfig.js');
const upload = multer({  storage  })
const{isloggedin,isOwner,validateListing}=require("../middlewares.js");
const listingController = require('../controllers/listings.js');

// Index Route and Create Post Route using (router.route) ↓
router
 .route("/")
 .get( wrapasync( listingController.index ))
 .post( isloggedin,upload.single('listing[image]'),validateListing, wrapasync ( listingController.createListing ));


// Create New Page Route ↓
router.get("/new", isloggedin, listingController.renderNewForm );


// Listing Show with Reviews, Listing Update and Listing Delete Route using (router.route) ↓
router
 .route("/:id")
 .get( wrapasync( listingController.showListing ))
 .put( isloggedin, isOwner,upload.single('listing[image]'), wrapasync( listingController.updateListing ))
 .delete( isloggedin, isOwner,  wrapasync( listingController.destroyListing ));


// Edit Page Route ↓
router.get("/edit/:id", isloggedin, isOwner, wrapasync( listingController.renderEditForm ));



module.exports=router;
