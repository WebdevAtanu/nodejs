const mongoose = require("mongoose"); // the mongoose package imported

// schema defined for creating data model
const jobSchema = new mongoose.Schema({
    name: String,
    role: String
});

// getting data into database
async function insert() {
    await mongoose.connect("mongodb://127.0.0.1:27017/atanu");
    await console.log("Database atanu Connected");
    const jobModel = mongoose.model("datas", jobSchema); // the schema converted into model
    let data = new jobModel({
        name: "Atanu",
        role: "Gamer"
    });
    let result = await data.save(); //data saved in database
    console.log(data);
}
insert(); // insert function called

// updating data into database
async function update() {
    await mongoose.connect("mongodb://127.0.0.1:27017/atanu");
    await console.log("Database atanu Connected");
    const jobModel = mongoose.model("datas", jobSchema);
    let update = await jobModel.updateMany({
        name: "Atanu"
    }, {
        $set: {
            role: "thinker"
        }
    });
    console.log(update);
}
update(); // update function called

// finding data from database
async function find() {
    await mongoose.connect("mongodb://127.0.0.1:27017/atanu");
    await console.log("Database atanu Connected");
    const jobModel = mongoose.model("datas", jobSchema);
    let find = await jobModel.find();
    console.log(find);
}
find(); // find function called