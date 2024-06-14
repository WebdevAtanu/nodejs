const express = require("express");
require("./config");
const model = require("./model");
const app = express();
app.listen(3333);
app.use(express.json());

// search api method
app.get("/search/:key", async(req, res) => {
    let data = await model.find({
        "$or": [{
            "name": {
                $regex: req.params.key
            }
        }]

    });
    res.send(data);
})