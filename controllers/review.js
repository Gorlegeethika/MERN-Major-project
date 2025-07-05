const Listing = require("../models/listing.js");
const Review= require("../models/reviews.js");
//posting review
module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
     newReview.author=req.user._id;
     console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save()
    await listing.save()
   // console.log("reviews are saved");
   //going back to the same show page after submittimg the reviews
    res.redirect(`/listings/${listing._id}`);

};
//delete review
module.exports.destroyReview=async(req,res)=>{
let{id,reviewId}=req.params;
await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
await Review.findByIdAndDelete(reviewId);
res.redirect(`/listings/${id}`)
};