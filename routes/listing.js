const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const Review = require("../models/reviews.js");
const {isLoggedIn,isOwner ,validateListing,isReviewAuthor} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer=require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({storage});


//routesss
//index route
router.route("/")
.get(wrapAsync(listingController.index))
//posting the create route form
.post(isLoggedIn,upload.single("listing[image][url]"),validateListing,wrapAsync(listingController.createListing));
//New route
 router.get("/new",isLoggedIn,listingController.renderNewForm);
//show route
router.route("/:id")
.get(isLoggedIn,wrapAsync(listingController.showListing))
//update route
.put(isLoggedIn,isOwner,upload.single("listing[image][url]"),validateListing,wrapAsync(listingController.updateListing))
//delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));








module.exports = router;