'use strict';

const Joi = require('joi');
const express = require('express');
const app = express();
var PerfilUsuario = require("./PerfilUsuario.js");
const Plan = require("./Plan.js");
var {Activity,type}= require("./Activity.js");

app.use(express.json());    // Para parsear el json object.

var usuario = new PerfilUsuario("Antonio Javier");
var fechaIni = new Date()
var plan = new Plan(usuario,fechaIni, 60);

// Actividades de prueba creadas para comprobaciones de cada uno de los comandos http----------
var act1 = new Activity(1,1,type.Hiking, "", 1,"20:00",true)
var act2 = new Activity(2,1,type.Running, "", 1,"21:00",true)
var act3 = new Activity(1,3,type.Hiking, "", 1,"10:00",true)
var act4 = new Activity(2,3,type.Cycling, "", 1,"12:00",true)
plan.aniadirActividad = act1
plan.aniadirActividad = act2
plan.aniadirActividad = act3
plan.aniadirActividad = act4
//---------------------------------------------------------------------------------------------

app.get('/', (req,res) => {
    res.send({
        "status":"OK",
        "ejemplo":{"ruta":"/plan/usuario",
                "valor":usuario}
            });
});

// Página con el plan completo
app.get('/plan', (req,res) => {
    res.send(plan)
})


// Detalles del usuario
app.get('/plan/usuario', (req,res) => {
    res.send(usuario)
})

app.get('/plan/usuario/nombre', (req,res) => {
    res.send(usuario.nombre)
})

app.get('/plan/usuario/temp', (req,res) => {
    res.send(JSON.stringify(usuario.tempMinima))
})

app.get('/plan/usuario/rain', (req,res) => {
    res.send(JSON.stringify(usuario.likesRain))
})

// Modificar detalles de usuario

app.put('/plan/usuario', (req,res) => {
    const {error} = validateUser(req.body);

    if(error){
        // 400 bad request
        res.status(400).send(error.detduracionPlanils[0].message);
        return;
    }

    usuario.modificarNombre = req.body.nombre
    usuario.modificartempMinima = req.body.tempMinima
    usuario.modificarlikesRain = req.body.likesRain
    
    res.send(usuario)

})

// Consultar actividades y actividades por dia y actividad concreta por id

app.get('/plan/actividades', (req,res) =>{
    if(plan.actividades == undefined || plan.actividades.length == 0){
        return res.status(404).send('no activities found');
    }
    res.send(plan.actividades);
})

app.get('/plan/actividades/:dia', (req,res) =>{
    const activities = plan.actividades.filter(act => act.dia === parseInt(req.params.dia)) // === es para que ademas de ser iguales tambien sea el mismo tipo
    if (activities == undefined || activities.length == 0) return res.status(404).send('no activities found on the specified day');
    res.send(activities);
})

app.get('/plan/actividades/:dia/:id', (req,res) =>{
    const activity = plan.actividades.filter(act => (act.dia === parseInt(req.params.dia) && act.id == parseInt(req.params.id)))
    //console.log(plan.actividades.filter(act => act.id === parseInt(req.params.id)))
    if(activity == undefined || activity.length == 0) return res.status(404).send('activity not found');
    res.send(activity);
})



// Añadir actividad

/*
Plantilla para postman para comprobar rapido post y put de actividades:
{
    "dia": 3,
    "tipo": "cycling",
    "duracion": 6,
    "horaInicio": "15:00"
}
*/

app.post('/plan/actividades', (req,res) =>{
    const {error} = validateActivity(req.body);

    if(error){
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const same_day_activities = plan.actividades.filter(act => act.dia === parseInt(req.body.dia));

    const act = {
        id: same_day_activities.length + 1,
        dia: req.body.dia,
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        horaInicio: req.body.horaInicio,
        exterior: req.body.exterior
    };
    plan.aniadirActividad = act
    res.send(act);
})


// Modificar actividad

app.put('/plan/actividades/:dia/:id', (req,res) =>{
    const activity = plan.actividades.find(a => a.dia === parseInt(req.params.dia) && a.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('activity not found');

    const {error} = validateActivity(req.body);

    if(error){
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const index = plan.actividades.indexOf(activity);
    plan.actividades.splice(index, 1);

    const act = {
        id: parseInt(req.params.id),
        dia: parseInt(req.params.dia),
        tipo: req.body.tipo,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        horaInicio: req.body.horaInicio,
        exterior: req.body.exterior
    };
    plan.aniadirActividad = act
    res.send(act);
})


// Eliminar actividad

app.delete('/plan/actividades/:dia/:id', (req, res) =>{
    const activity = plan.actividades.find(a => a.dia === parseInt(req.params.dia) && a.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('activity not found');

    const index = plan.actividades.indexOf(activity);
    plan.actividades.splice(index, 1);

    res.send(activity);
})


// Validar plan, usuario y actividad

// Usamos Joi para que todas las condiciones de la estructura estén en un mismo sitio y no repetir código
 

function validatePlan(myplan){         // No lo usamos todavía
    const schema = {
        usuario: Joi.object().required(),
        fechaInicio: Joi.date().required(),
        duracionPlan: Joi.number().greater(0).required(),
        actividades: Joi.array().required()
    };
    return Joi.validate(myplan, schema);
}

function validateUser(user){
    const schema = {
        nombre: Joi.string().min(3).required(),
        tempMinima: Joi.number().greater(-20).required(),
        likesRain: Joi.boolean().required()
    };
    return Joi.validate(user, schema);
}

function validateActivity(act){
    const schema = {
        dia: Joi.number().greater(0).required(),
        tipo: Joi.string().valid([type.Cycling, type.Hiking, type.Running, type.StrengthTraining, type.Swimming, type.TeamSport]).required(),
        descripcion: Joi.string().optional(),
        duracion: Joi.number().greater(0).required(),
        horaInicio: Joi.string().length(5).optional(),
        exterior: Joi.boolean().optional()
    };
    return Joi.validate(act, schema);
}


// PORT
const port = process.env.PORT || 3000;  // Environment variable PORT (set on terminal, if it doesnt exists it uses 3000)
app.listen(port, () => console.log(`Listening on port ${port}...`));    // use `` instead of '' so we can use template string $()


// para poder testear
module.exports = app;