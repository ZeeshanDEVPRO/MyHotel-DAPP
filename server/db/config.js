const mongoose = require('mongoose');
require("dotenv").config()

const URI = "mongodb+srv://professionalid2003:123@cluster0.2sfjllp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('Failed to connect to MongoDB:');
        process.exit(1);
    }
};

connectDB();
