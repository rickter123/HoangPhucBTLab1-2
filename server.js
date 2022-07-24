const app = require("./src/app");
const config = require("./src/config/index.config");
const MongoDB = require("./src/utils/mongodb.util");
// Connect to mongodb
async function startServer(){
    try{
        // Start connect
        await MongoDB.connect(config.db.uri);
        console.log("Connect MongoDb Successfully");

        // Request port
        const PORT = config.app.port
        // Start the Express server
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

    }catch(error){
        console.log("Can not connect MongoDb",error);
        process.exit();//Exit 
    }
}

startServer();