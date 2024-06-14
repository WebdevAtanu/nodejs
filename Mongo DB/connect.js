const MongoClient=require("mongodb").MongoClient;
const url="mongodb://127.0.0.1:27017"; //database connection string
const database="atanu";
const client=new MongoClient(url);

async function dbconnect(){
	let result=await client.connect();
	await console.log("Connection suscessful");
	db= result.db(database);
	return db.collection("nodejs");
}
module.exports=dbconnect;