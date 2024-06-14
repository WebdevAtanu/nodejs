const express=require("express");
const app=express();
const port=3000;
app.listen(port, () => {
    console.log(`server running on 127.0.0.1:${port}`)
})
// sending the home page
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})
// middleware for checking user's age via form
const middleware=(req,res,next)=>{
    if(req.query.age<18){
        // res.send("Sorry! Access Denied");
        res.sendFile(__dirname+"/restrict.html");
    }
    else{
        next();
    }
}
app.get("/getMethod",middleware,(req,res,)=>{
    res.send(req.query);
    // res.send(req.query.name);
    // res.send(req.query.email);

})