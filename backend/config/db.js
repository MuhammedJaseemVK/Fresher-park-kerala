const mongoose = require("mongoose");

const dbURL = process.env.NODE_ENV ==="production" ? process.env.PROD_MONGODB_URL : process.env.DEV_MONGODB_URL ;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log(`Mongodb connected ${mongoose.connection.host}`);
    }
    catch (error) {
        console.log(`Mongodb Server Issue ${error}`);
    }
}

module.exports = connectDB;