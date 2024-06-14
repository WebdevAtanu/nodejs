const express=require("express");
const app=express();
const port=3001;
const bodyparser=require("body-parser");
app.listen(port, () => {
    console.log(`server running on 127.0.0.1:${port}`)
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})
app.post("/postMethod",(req,res)=>{
    res.send(req.body);
    console.log(req.body);
    // res.send(req.body.name);
    // res.send(req.body.email);
})