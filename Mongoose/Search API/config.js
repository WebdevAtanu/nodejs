// configuration file of database connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/atanu");
console.log("Database connected");