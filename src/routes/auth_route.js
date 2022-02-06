

import {Router} from "express";


import {crearUsuario, iniciarSesionUsuario, getUsuarioPorId, cerrarSesion} from "../controllers/auth_controller";


import {verificarToken} from "../HELPERS/json_web_token_verificar";


const router = Router();


router.post("/register", crearUsuario);

router.post("/login", iniciarSesionUsuario);

router.get("/user/profile/:usuarioId", verificarToken, getUsuarioPorId);

router.get("/logout", cerrarSesion);




export default router;
