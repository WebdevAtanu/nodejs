const http=require('http');
const fs=require("fs");
const hostname='127.0.0.1';
const port=8080;
const content=fs.readFileSync("time.html");
const server=http.createServer((req,resp)=>{
	resp.writeHead(200,{"content-type":"text/html"});
	// resp.write("<h1>This is response write</h1>") //for single html line
	resp.end(content);
})

server.listen(port,hostname,()=>
	{console.log(`Server running at http://${hostname}:${port}`);
})