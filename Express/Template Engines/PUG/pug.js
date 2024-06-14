const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
app.set("views", path.join(__dirname, "views"))
app.listen(port, () => {
    console.log(`server is running on 127.0.0.1:${port}`)
});
app.set("view engine", "pug");

app.get("/pug", (req, res) => {
    res.render("pugRoute", {
        title: "This is pug title",
        message: "This is pug header"
    });
})

app.get("/login", (req, res) => {
    res.render("login.pug")
})