const express = require("express");
require("./config");
const model = require("./model");
const app = express();
app.listen(3333);
app.use(express.json());

// get api method
app.get("/", async(req, res) => {
    let data = await model.find();
    res.send(data);
})