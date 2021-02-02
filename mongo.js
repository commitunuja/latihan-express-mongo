const MongoCLient = require("mongodb").MongoClient
// const connectionString = "mongodb://localhost:27017"; // tanpa authentication
const connectionString = "mongodb://user_latihan:123456@localhost:27017?authSource=admin";

// Cara 1
// MongoCLient.connect(connectionString, { useUnifiedTopology: true },
//     (error, client) => {
//         if (error) return console.error(error)
//         console.log("Server database connect!")
//     })

// Cara 2
(async () => {
    try {
        const client = await MongoCLient.connect(connectionString, {
            useUnifiedTopology: true
        })
        // get db
        const db = client.db("latihan")
        // get collection table
        const quote = await db.collection("quote").find().toArray()
        console.table(quote);
    } catch (error) {
        console.log(error);
    }
})();