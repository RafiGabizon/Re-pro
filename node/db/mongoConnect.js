const mongoose = require('mongoose');
require("dotenv").config();

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

module.exports = connectToMongo;