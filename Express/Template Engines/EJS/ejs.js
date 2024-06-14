const express = require("express");
const app = express();
const path = require("path"); // for sending static html file
app.set("view engine", "ejs"); // using ejs template engine
app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.get("/profile", (_, res) => {
    const user = {
        name: "atanu",
        skill: ["html", "css", "javascript"]
    }
    res.render("profilePage", {
        user
    });

})
app.get("/login", (_, res) => {
    res.render("loginPage");
})

app.listen(3000, () => {
    console.log("server running on 127.0.0.1:3000")
});