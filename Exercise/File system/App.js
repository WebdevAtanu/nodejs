const fs = require("fs"); //importing the file system 

let text = fs.readFileSync("Read file.txt", "utf-8"); // Used for read from file
console.log(text);

// text=text.replace("Read from file","Write into file") //for replacing the text content
let content = "This is write operation by write file javascript";
fs.writeFileSync("Write file.txt", content); // Used for write into file
console.log("write operation done")

let appContent = "this content come from append operation after every run \n"
fs.appendFile("Append file.txt", appContent, () => {
    console.log("File append done");
})