//configuration file of collection model
const mongoose = require("mongoose");
let schema = new mongoose.Schema({
    name: String,
    role: String
});
module.exports = mongoose.model("datas", schema);