const mongo = require("mongoose");

const url = "mongodb://localhost:27017/todo";

const connectDB = async () => {
  try {
    await mongo.connect(url);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e.message);
  }
};

module.exports = connectDB;
