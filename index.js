
/*NOTA: babel y amigos hacen demorar a la hora de hacer cambios cuando se ejecuta el npm run dev,
por lo que debemos de parar servidor y correrlo devuelta*/



import express from "express";

import {PUERTO_SERVIDOR_EXPRESS} from "./src/HELPERS/config_constants";

import {configMongoDB} from "./src/HELPERS/config_mongodb";

import morgan from "morgan";

// rutas
import auth_rutas from "./src/routes/auth_route";
import tarea_rutas from "./src/routes/tarea_route";


const app = express();


app.set("puerto", PUERTO_SERVIDOR_EXPRESS);


// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// rutas
app.use(auth_rutas);
app.use(tarea_rutas);


// iniciamos y escuchamos servidor
app.listen(app.get("puerto"), ()=>{
    
    console.log(`Server on port ${app.get("puerto")}`);

    configMongoDB();

});
