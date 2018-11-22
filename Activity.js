"use strict"
var PerfilUsuario = require("./PerfilUsuario.js");

const type = {
    Running: "running",
    Hiking: "hiking",
    Cycling: "cycling",
    StrengthTraining: "strengthTraining",
    Swimming: "swimming",
    TeamSport: "teamSport",
};
Object.freeze(type)

class Activity{

    constructor(id, dia, tipo, descripcion = "", duracion, horaInicio, exterior = false){
        this.id = id;                       // Entero positivo
        this.dia = dia;                     // Entero positivo
        this.tipo = tipo;                   // Tiene que ser un tipo de los definidos
        this.descripcion = descripcion;     // Un string cualquiera que redacte el usuario
        this.duracion = duracion;           // En horas
        this.horaInicio = horaInicio;       // String con la hora en formato "00:00" en 24h.
        this.exterior = exterior;           // True o False
    }

    set modificarDia(dia){
        this.dia = dia;
    }

    set modificarTipo(tipo){
        this.tipo = tipo;
    }

    set modificarDescripcion(descripcion){
        this.descripcion = descripcion;
    }

    set modificarDuracion(duracion){
        this.duracion = duracion;
    }

    set modificarHoraInicio(horaInicio){
        this.horaInicio = horaInicio;
    }

    set modificarExterior(exterior){
        this.exterior = exterior;
    }

    
}

module.exports = {Activity, type}