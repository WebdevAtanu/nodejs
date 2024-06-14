const dbConnect = require("./connect");

const main = async() => {
    const db = await dbConnect();
    const result = await db.insertOne({
        name: "Atanu Mondal",
        hobby: "Watching Movie"
    });

    if (result.acknowledged) {
        console.log("Data Inserted");
    }

}
main();