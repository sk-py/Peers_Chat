const mongoose = require("mongoose");
require("dotenv").config();

// const mongoose = require("mongoose");
const requestModel = require("./Models/Requests");
const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("Connection Established With Database!");
});
