const Listing = require("../models/listing");

module.exports.index=async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}; 
    module.exports.renderNewForm = (req,res)=>{
        res.render("listings/new.ejs");
    };
     module.exports.showListing=async(req,res)=>{
        let {id} = req.params;
        const listing =await Listing.findById(id).populate({
            path:"reviews",
            populate:{
                path:"author",
            },
        }).populate("owner");
         console.log("OWNER:", listing.owner);
        if(!listing){
            req.flash("error","listing you requested does not exist");
             return res.redirect("/listings");

        }
        //console.log(listing);
        res.render("listings/show.ejs",{listing});
    
    };
   module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    await newListing.save();
    req.flash("success", "New listing is created!");
    res.redirect("/listings");
};

    module.exports.renderEditForm =async(req,res)=>{
        let {id} =req.params;
        const listing=await Listing.findById(id);
         if(!listing){
            req.flash("error","listing you requested does not exist");
             return res.redirect("/listings");
        }
        let originalImageUrl = listing.image.url;
        originalImageUrl=originalImageUrl.replace("/upload","/upload/ar_1.0,c_fill,h_250/bo_5px_solid_lightblue")
        res.render("listings/edit.ejs",{listing, originalImageUrl});
    };
    module.exports.updateListing=async(req,res)=>{
        let{id}=req.params;
        let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
        if(typeof req.file!=="undefined"){
            let url = req.file.path;
            let filename =req.file.filename;
            listing.image={url,filename};
            await listing.save();
        }
        
        res.redirect("/listings");
    };
    module.exports.destroyListing=async(req,res)=>{
    let{id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
    };