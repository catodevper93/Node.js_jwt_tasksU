


import jwt from "jsonwebtoken";

import {PALABRA_SECRETA} from "./config_constants";



export const verificarToken = async(req,res,next)=>{

    /* obtenemos el token desde la cabecera(headers), el nombre x-access-token
    debemos de coocarlo en la key de nuestro postman, este será la key donde va a obtener el
    valor, en este caso el token generado*/
    const get_token_headers = req.headers["x-access-token"];

    // console.log(get_token_headers);


    // si no existe el token
    if(!get_token_headers){
        return res.status(404).json({
            auth: false,
            mensaje: "No token at headers"
        });
    }


    // decodificamos el token de la cabecera para saber el usuario autenticado
    const decodificar_token = await jwt.verify(get_token_headers, PALABRA_SECRETA);

    // guardamos el token en el objeto de la petición usando un enrutador
    req.usuarioId = decodificar_token.id;



    // continuamos a la siguiente funciónn una vez finalizado todo 
    next();

}

