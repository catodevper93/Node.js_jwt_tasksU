
import {Schema, model} from "mongoose";


const tareaSchema = new Schema(
    {
        titulo: String 
    },
    {
        versionKey: false 
    }
);


export default model("Tarea", tareaSchema);
