const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
//forming a connection with the database of  mongodb
main().then(()=>{
    console.log("connected to db")})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
};
const initDb=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6847a0c9bb381186283d91e7"}))
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
};
initDb();
