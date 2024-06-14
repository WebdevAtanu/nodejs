const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/atanu');
    await console.log("Connection successful");
}
main().catch(err => console.log(err));
const myschema = new mongoose.Schema({
    name: String,
    Hobby: String
})
const mydata = mongoose.model("mydata", myschema);
var myname = new mydata({
    name: "Atanu",
    Hobby: "Coding"
});
myname.save();

// const showdata=mydata.find({name:"Atanu"});
// console.log(showdata);