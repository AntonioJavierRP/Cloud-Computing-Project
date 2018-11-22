'use strict';

class PerfilUsuario{

    
    constructor(nombre){
        this.nombre = nombre;
        this.tempMinima = 19;
        this.likesRain = false;

    }
    
    set modificarNombre(name){
        this.nombre = name;
    }

    set modificartempMinima(temp){
        this.tempMinima = temp;
    }

    set modificarlikesRain(rain){
        this.likesRain = rain;
    }
}



module.exports = PerfilUsuario