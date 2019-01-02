/*

Clase tiempo atmosférico

*/

"use strict"


const wtype = {
    Sunny: "sunny",
    Cloudy: "cloudy",
    Rainy: "rainy",
    Hail: "hail",
    Snowy: "snowy",
};
Object.freeze(wtype)


class TiempoAtm{

    constructor(temperaturaDia, temperaturaNoche, tiempo){
        this.temperaturaDia = temperaturaDia;                       // temperaturaDia temperatura media durante el día (entero)
        this.temperaturaNoche = temperaturaNoche;                   // temperaturaNoche temperatura media durante la noche (entero)      
        this.tiempo = tiempo;                                       // soleado, nublado, lluvioso, granizo y nieve. (enum)
    }


}


module.exports = {TiempoAtm, wtype}












