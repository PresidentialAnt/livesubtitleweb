const {MongoMemoryServer} = require("mongodb-memory-server");
const mongoose = require('mongoose');

let mongo = null;
// setup mock mongoDB instance in memory for testing
const testDB = async ()=> {
    mongo = await MongoMemoryServer.create();
    const testuri = mongo.getUri();
    // boilerplate code for mongoose connection config
    await mongoose.connect(testuri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

}
const dropTable = async() =>{
    if (mongo) {
        const tables = await mongoose.connection.db.collections();
        for (let table of tables) {
            table.remove();
        }
    }
}
const killDB = async () =>{
    if (mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
    }
    
}

module.exports = {testDB,dropTable,killDB}