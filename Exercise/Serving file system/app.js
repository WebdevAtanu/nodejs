let http = require("http");
let url = require("url");
let fs = require("fs");
let localhost = "127.0.0.1"
let port = 4949;

http.createServer((req, res) => {
    const path = req.url;
    if (path == "/about") {
        res.writeHead(200, {
            "content-type": "text/html"
        });
        let about = fs.readFileSync("about.html")
        res.end(about);
    } else if (path == "/contact") {
        res.writeHead(200, {
            "content-type": "text/html"
        });
        let contact = fs.readFileSync("contact.html")
        res.end(contact);
    } else if (path == "/rate") {
        res.writeHead(200, {
            "content-type": "text/html"
        });
        let rate = fs.readFileSync("Rate.html")
        res.end(rate);
    } else {
        res.writeHead(200, {
            "content-type": "text/html"
        });
        let home = fs.readFileSync("home.html")
        res.end(home);
    }
}).listen(port);
console.log(`server is running at ${localhost}:${port}`)