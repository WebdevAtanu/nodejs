import express from "express";
import path from "path";
const port = 5000;
const app = express();
let users = []; //a blank array which is used in getting post response later.

// join path. app using static file from public folder. resolve() will get the current path and join() method joins them.
app.use(express.static(path.join(path.resolve(), "public")));
// using this for getting the post method values.
app.use(express.urlencoded({
    extended: true
}));

// server running
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

// setting the engine
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
    // res.send("This is homepage");
    res.render("home", {
        name: "Atanu"
    });
})

app.post("/user", (req, res) => {
    console.log(req.body);
    users.push({
        username: req.body.name,
        email: req.body.email
    }); //array pushing
    console.log(users); //display the array
    // res.render("done"); //it will render the done page
    res.redirect("/done"); //it will change the url
})

app.get("/done", (_, res) => {
    res.render("done");
})

//sending the json data stored in the users array
app.get("/getData", (_, res) => {
    res.json({
        users,
    })
})