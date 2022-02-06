
import {Schema, model} from "mongoose";

import bcrypt from "bcryptjs";

const usuarioSchema = new Schema(
    {
        usuario: String,
        correo: String,
        contrasenia: String 
    },
    {
        timestamps: true,
        versionKey: false 
    }
);


/* procedemos a encriptar nuestra contraseña y compararla, son 2 métodos declarados acá, pero se
usarán en nuestro controlador...

NOTA: encryptPassword y comparePassword son métodos propios de nuestro mongo

*/
usuarioSchema.methods.encryptPassword = async(contrasenia)=>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(contrasenia, salt);
};


usuarioSchema.methods.comparePassword = async function(contrasenia){
    return bcrypt.compare(contrasenia, this.contrasenia);
}


export default model("Usuario", usuarioSchema);

