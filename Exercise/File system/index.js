const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "Path"); //it will create the file in Path folder
const file = `${folder}/CRUD.txt`;
fs.writeFileSync(file, "This is created by node js for creating a file into a folder");