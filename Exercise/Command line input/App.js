const fs = require("fs");
const input = process.argv;
if (input[2] == "add") {
    fs.writeFileSync(input[3], input[4]);
    console.log("File created");
} else if (input[2] == "remove") {
    fs.unlinkSync(input[3]);
    console.log("File deleted");
} else {
    console.log("Wrong operation");
}

// run- node App.js add/remove text.txt "The text string"