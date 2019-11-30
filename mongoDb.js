const mongoose = require("mongoose")


async function conectarMongoDb(){
    await mongoose.connect();
}

conectarMongoDb();
