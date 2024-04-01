const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    hotelId:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    ratings: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    facility: {
        type: [String], 
        required: true 
    }
});

module.exports = mongoose.model("Hotel", hotelSchema);
