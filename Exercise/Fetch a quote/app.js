const express = require("express");
const app = express();
const port = 3232;
const quote = require("./quote.json");
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
})

app.get("/", (req, res) => {
    // res.send("hello");
    res.status(200).json(quote);
});

app.get("/random", (req, res) => {
    let index = Math.floor(Math.random() * quote.quotes.length);
    let randquote = quote.quotes[index];
    res.status(200).json(randquote);
})