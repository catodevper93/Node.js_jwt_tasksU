

import mongoose from "mongoose";


export const configMongoDB = async()=>{


    const URL_MONGO = "mongodb://localhost/jwt_task_auth";

    const opciones = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    };

    await mongoose.connect(URL_MONGO, opciones );

    console.log("Database is connected ");

}


