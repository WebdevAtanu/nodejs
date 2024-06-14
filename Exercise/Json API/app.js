const http = require("http");
const port = 3000;
const jsondata = require("./mymodule");
http.createServer((req, res) => {
    res.writeHead(200, {
        "content-Type": "application\json"
    });
    res.write(JSON.stringify(jsondata));
    res.end();
}).listen(port)
console.log(`Server running at http://127.0.0.1:${port}`)