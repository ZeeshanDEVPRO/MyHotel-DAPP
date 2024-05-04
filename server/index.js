require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
const Hotel = require('./db/Hotel');
require('./db/config');
const app = express();
const PORT = process.env.PORT || 5000;

// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));


app.post('/upload', async (req, res) => {
    const file = req.files.photo;
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        const hotel = new Hotel({
            name: req.body.name,
            price: req.body.price,
            address: req.body.address,
            city: req.body.city,
            ratings: req.body.ratings,
            discount: req.body.discount,
            photo: result.url,
            hotelId: req.body.hotelId,
            facility: req.body.facility //array only
        });
        await hotel.save();
        res.status(200).send({ message: "Image uploaded and hotel added successfully" });
    }
    catch (error) {
        console.error("Error uploading image and adding hotel:", error);
        res.status(500).send({ error: error.message || "Something went wrong" });
    }
});

app.get("/allproducts", async (req, res) => {
    try {
        let hotels = await Hotel.find();
        if (hotels.length > 0) {
            res.send(hotels);
        } else {
            res.send({ result: "No hotels found" });
        }
    } catch (error) {
        console.error("Error fetching hotels:", error);
        res.status(500).send({ error: error.message || "Something went wrong" });
    }
});

app.get("/search/:key", async (req, res) => {
    const key = req.params.key;
    const keys = parseFloat(key); // parse key as float

    try {
        // Check if the key is a valid number
        const isNumber = !isNaN(keys) && isFinite(keys);

        let result;
        if (isNumber) {
            // If the key is a valid number, search by price as a number
            result = await Hotel.find({ price: keys });
        } else {
            // If the key is not a number, search by other fields
            result = await Hotel.find({
                "$or": [
                    { name: { $regex: key, $options: 'i' } },
                    { ratings: { $regex: key } },
                    { address: { $regex: key, $options: 'i' } },
                    { city: { $regex: key, $options: 'i' } },
                    { facility: { $regex: key, $options: 'i' } }
                ]
            });
        }

        res.send(result);
    } catch (error) {
        console.error("Error searching hotels:", error);
        res.status(500).send({ error: error.message || "Something went wrong" });
    }
});



//search by hotelId
app.get("/searchByHotelId/:key", async (req, res) => {
    try {
        let result = await Hotel.find({
            "$or": [
                { hotelId: { $regex: req.params.key, $options: 'i' } }
            ]
        });
        res.send(result);
    } catch (error) {
        console.error("Error searching hotels:", error);
        res.status(500).send({ error: error.message || "Something went wrong" });
    }
});

//price search api
app.get("/searchByPrice/:minPrice/:maxPrice", async (req, res) => {
    try {
        const minPrice = parseInt(req.params.minPrice);
        const maxPrice = parseInt(req.params.maxPrice);
        const hotels = await Hotel.find({
            price: {
                $gte: minPrice,
                $lte: maxPrice
            }
        });
        res.status(200).json(hotels);
    } catch (error) {
        console.error("Error searching the price:", error);
        res.status(500).send({ error: error.message || "Something went wrong" });
    }
});

//search by facility
app.post("/searchByFacility", async (req, res) => {
    try {
        const selectedFacilities = req.body.selectedFacilities;
        const result = await Hotel.find({ facility: { $in: selectedFacilities } });

        res.send(result);
    } catch (error) {
        console.error("Error searching hotels by facility:", error);
        res.status(500).send({ error: error.message || "Something went wrong" });
    }
});


app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT);
