
import jwt from "jsonwebtoken";

import Usuario from "../models/usuario_model";

import { PALABRA_SECRETA } from "../HELPERS/config_constants";



export const crearUsuario = async (req, res) => {

    try {
        // recibimos la información proveniente del body
        const { usuario, correo, contrasenia } = req.body;


        // pasamos la información al constructor de nuestro esquema
        const usuario_nuevo = new Usuario({
            usuario,
            correo,
            contrasenia
        });

        // procedemos a encriptar la contraseña antes de guardarla en la base de datos
        usuario_nuevo.contrasenia = await usuario_nuevo.encryptPassword(contrasenia);


        await usuario_nuevo.save();

        // creamos un token con la fecha de expiración para nuestro usuario registrado
        const token_generado = jwt.sign({ id: usuario_nuevo.id }, PALABRA_SECRETA, {
            expiresIn: 60 * 60 * 24, //expira en 24hs
        });

        res.json({
            auth: true,
            token_generado
        });

    } catch (error) {
        // console.log(error.message);
        res.status(500).json({
            mensaje: error.message
        });
    }
}


export const iniciarSesionUsuario = async (req, res) => {

    const {correo, contrasenia} = req.body;

    // si existe el correo nos muestra en objeto toda la información del usuario
    const existe_correo = await Usuario.findOne({ correo});

    if (!existe_correo) {
        return res.status(404).json({
            mensaje: "The email doesn´t exists"
        });
    }


    /* desencriptamos la contraseña de nuestra base de datos para comparar con la contraseña
    ingresada en el body*/

    const validar_contrasenia = await existe_correo.comparePassword(contrasenia, existe_correo.contrasenia);


    // console.log(validar_contrasenia); false: no existe - true: existe

    // si nos retorna false no existe contraseña
    if (!validar_contrasenia) {
        return res.status(404).json({
            mensaje: "Password incorrect",
            auth: false,
            token: null
        });
    }

    // creamos un token con la fecha de expiración para nuestro usuario registrado
    const token_generado = jwt.sign({ id: existe_correo.id }, PALABRA_SECRETA, {
        expiresIn: 60 * 60 * 24, //expira en 24hs
    });

    res.json({
        auth: true,
        token_generado
    });
}


export const getUsuarioPorId = async (req, res) => {

    const { usuarioId } = req.params;

    // console.log(usuarioId);

    /* buscamos el registro según el id recibido por parámetro en nuestra url, si existe
    nos devolverá el objeto con los datos pertenecientes a ese registro, el segundo argumento
    que este recibe es un ocultamiento, queremos que nos oculte la propiedad contrasenia, para 
    que nos la oculte debemos de ponerlo en 0, por lo que al darlos el registro excluirá
    el campo contrasenia de esa devolución, por cuestiones de seguridad.*/
    const usuario = await Usuario.findById(usuarioId, { contrasenia: 0 });

    // console.log(usuario);

    // si el usuario no existe
    if (!usuario) {
        return res.status(404).json({
            mensaje: "User not found"
        });
    }

    res.status(200).json({
        usuario: usuario
    });
}



export const cerrarSesion = async(req,res)=>{

    res.status(200).json({
        auth: false,
        token_generado: null
    });
}
