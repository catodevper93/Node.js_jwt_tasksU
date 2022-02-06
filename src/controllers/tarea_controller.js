

import Tarea from "../models/tarea_model";



export const crearTarea = async(req,res)=>{

    const nueva_tarea = new Tarea(req.body);

    const guardar_tarea = await nueva_tarea.save();


    res.json({
        tarea: guardar_tarea
    });
}

export const getTareas = async(req,res)=>{

    const tareas = await Tarea.find();

    res.json({
        tareas: tareas
    });
}


export const getTareaPorId = async(req,res)=>{

    const {id} = req.params;

    const tarea = await Tarea.findById(id);

    res.json({
        tarea: tarea 
    });
}


export const actualizarTareaPorId = async(req,res)=>{

    const {id} = req.params;

    const tarea = await Tarea.findByIdAndUpdate(id, req.body, {
        new: true 
    });

    res.json({
        actualizado: tarea
    });

}

export const eliminarTareaPorId = async(req,res)=>{

    const {id} = req.params;


    const tarea = await Tarea.findByIdAndDelete(id);

    res.json({
        eliminado: tarea
    });
}

