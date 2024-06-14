const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`server running on 127.0.0.1:${port}`);
})
app.get("/", (req, res) => {
    res.sendFile('home.html', {
        root: __dirname
    });
    // app.use(express.static(__dirname)); //second method must use .html extension.
})
app.get("/about", (req, res) => {
    res.send(`<h1>This is about page</h1>
		<input type="text" value="${req.query.name}">`); //inline html
})
app.get("/contact", (req, res) => {
    // res.sendFile('contact.html',{root: __dirname })
    console.log("req send by browser ", req.query);
    res.send("welcome " + req.query.name);
})
app.get("*", (_, res) => {
    res.sendFile("error.html", {
        root: __dirname
    }); //error page
})