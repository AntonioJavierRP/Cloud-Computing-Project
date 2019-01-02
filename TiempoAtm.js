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


/*

var ta = new TiempoAtm(20,15,wtype.Cloudy)
var ta1 = new TiempoAtm(24,10,wtype.Sunny)
var ta2 = new TiempoAtm(21,16,wtype.Cloudy)
var ta3 = new TiempoAtm(23,18,wtype.Sunny)
var ta4 = new TiempoAtm(10,5,wtype.Rainy)

var wheather = []
wheather.push(ta)
wheather.push(ta1)
wheather.push(ta2)
wheather.push(ta3)
wheather.push(ta4)

console.log(wheather);

*/


module.exports = {TiempoAtm, wtype}












