const express = require("express");
const app = express();
const port = 5001;
// const reqFilter=require("./middleWare")//external middleware file
app.listen(port, () => {
    console.log(`server running on 127.0.0.1:${port}`)
})
const reqFilter = (req, res, next) => {
        if (!req.query.age) {
            res.send("Enter your age");
        } else if (req.query.age < 18) {
            res.send("You can not access the page");
        } else {
            next();
        }
    }
    // app.use(reqFilter); //this filter will applicable in all routes
app.get("/", (_, res) => {
    res.sendFile("home.html", {
        root: __dirname
    });
})
app.get("/contact", reqFilter, (_, res) => {
    res.send("This is contact page");
})
app.get("/about", (_, res) => {
    res.send("This is about page");
})