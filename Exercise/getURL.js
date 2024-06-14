const http=require("http")
const url=require("url")
const port=6565;
http.createServer((req,res)=>{
	console.log(req.url);
	urlObj=url.parse(req.url);
	console.log(urlObj);
	// console.log(urlObj.query.keywords);

}).listen(port);