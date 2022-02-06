
import {Router} from "express";


import {crearTarea, getTareas, getTareaPorId, actualizarTareaPorId, eliminarTareaPorId} from "../controllers/tarea_controller";


import {verificarToken} from "../HELPERS/json_web_token_verificar";


const router = Router();


router.post("/new-task", verificarToken, crearTarea);

router.get("/tasks", getTareas);

router.get("/task/:id", getTareaPorId);

router.put("/edit/task/:id", verificarToken, actualizarTareaPorId);

router.delete("/delete/task/:id",verificarToken, eliminarTareaPorId);



export default router;

