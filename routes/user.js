const express = require('express');
const router= express.Router();
const wrapasync = require("../utils/WrapAsync.js");
const passport=require("passport")
const {saveRedirectUrl}=require("../middlewares.js");
const userController = require('../controllers/users.js');

// Sign Up Page Route and Create Route using router.route ↓
router
 .route("/signup")
 .get( userController.renderSignupForm)
 .post( wrapasync( userController.signup ));

 // Log In Page Route and Post Route using router.route ↓
router
 .route("/login")
 .get( userController.renderLoginForm )
 .post( saveRedirectUrl, passport.authenticate('local',
      { failureRedirect: '/login', failureFlash : true} ),  // Authenticate Middleware
        userController.login
    );

// Log Out Get Route ↓
router.get("/logout",userController.logout)


module.exports=router;