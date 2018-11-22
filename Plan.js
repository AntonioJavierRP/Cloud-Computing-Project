/*

Clase plan de entrenamiento.

*/

"use strict"
var PerfilUsuario = require("./PerfilUsuario.js");
var Activity = require("./Activity.js");


class Plan{

    constructor(usuario, fechaInicio, duracionPlan){
        this.usuario = usuario;                     // PerfilUsuario del usuario que tiene asignado este plan de entrenamiento
        this.fechaInicio = fechaInicio;             // Día que comienza el entrenamiento en dia, mes, año        
        this.duracionPlan = duracionPlan;           // Duración en días del plan de entrenamiento
        this.actividades = [];                      // Vector de actividades asociadas al plan.
    }


    set modificarDuracionPlan(duracionPlan){
        this.duracionPlan = duracionPlan;

    }

    modificarActividad(indiceActividad, nuevaActividad){
        // Aqui no hacemos las comprobaciones de si existe sino en el index.js
        this.actividades[indiceActividad] = nuevaActividad;
    }

    set aniadirActividad(actividad){
        this.actividades.push(actividad);
    }

    eliminarActividad(indiceActividad){
        this.actividades.splice(indiceActividad, 1);
    }

    
}


module.exports = Plan












