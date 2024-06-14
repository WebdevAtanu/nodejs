const express=require("express");
const app=express();
const dbConnect=require("./connect");
app.use(express.json());
app.listen(3000,()=>{
	console.log("Server running on http://127.0.0.1:3000")
});

// get method- to get data from database
app.get("/",async(_,resp)=>{
	let connection=await dbConnect();
	let data=await connection.find().toArray();
	// console.log(data);
	resp.send(data);
})

// post method- to post data from database
// app.post("/",async(req,resp)=>{
// 	let connection=await dbConnect();
// 	let data=await connection.insertOne({"name":"Ram"});
// 	// let data=await connection.insert(req.body);
// 	console.log(data);
// 	resp.send(data);
// })

// put method- to update data from database
// app.put("/",async(req,resp)=>{
// 	let connection=await dbConnect();
// 	let query=connection.updateOne({name:"Atanu"},{$set:{hobby:"Gamer"}});
// 	resp.send(query);
// })

// delete method- to delete data from database
// app.delete("/",async(req,resp)=>{
// 	let connection=await dbConnect();
// 	let query=connection.deleteOne({name:"Ram"});
// 	resp.send("Deleted");
// })