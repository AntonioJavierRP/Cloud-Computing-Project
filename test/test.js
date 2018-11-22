var request = require('supertest')
    , assert = require('assert')
    , app = require('../index.js');


describe("infopages", function(){
    it("shows status ok", function(done){
        request(app).get("/")
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(/OK/)
            .end(done);
    })

    it("shows the whole plan", function(done){
        request(app).get("/plan")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    })

    it("shows user info", function(done){
        request(app).get("/plan/usuario")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    })

    it("shows user's name", function(done){
        request(app).get("/plan/usuario/nombre")
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8")
            .end(done);
    })

    it("shows user's min temperature", function(done){
        request(app).get("/plan/usuario/temp")
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8")
            .end(done);
    })

    it("shows user's rain tolerance", function(done){
        request(app).get("/plan/usuario/rain")
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8")
            .end(done);
    })

})


describe("Manage User", function(){

    it("changes user information", function(done){
        request(app).put("/plan/usuario")
            .send({
                 "nombre": "Antonio",
                 "tempMinima":10,
                 "likesRain":true
                })
            .expect(200)
            .end(done);
    })

})

describe("Manage Activities", function(){

    it("adds a new activity", function(done){
        request(app).post("/plan/actividades")
            .send({
                "dia": 3,
                "tipo": "cycling",
                "duracion": 6,
                "horaInicio": "15:00"
            })
            .expect(200)
            .end(done);
    })

    // Lo ponemos aqui y no antes porque aqui tenemos garantizado que existe al menos una actividad
    it("shows all activities", function(done){
        request(app).get("/plan/actividades")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    })

    // Lo ponemos aqui por que si se cumple el post, entonces tendremos al menos una actividad en el día 3 y podremos comprobar
    it("shows activities of a specific day", function(done){
        request(app).get("/plan/actividades/3")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    })

    // Lo ponemos aqui por que si se cumple el post, entonces tendremos al menos una actividad con id = 1 y podremos comprobarlo
    it("shows specific activity", function(done){
        request(app).get("/plan/actividades/3/1")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    })

    // Moficamos la actividad creada anteriormente con el post por que asi nos aseguramos de que existe
    it("modifies a specific activity", function(done){
        request(app).put("/plan/actividades/3/1")
            .send({
                "dia": 3,
                "tipo": "running",
                "duracion": 2,
                "horaInicio": "10:30"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });

    // Por último comprobamos el delete borrando la actividad que acabamos de modificar
    it("deletes a specific activity", function(done){
        request(app).delete("/plan/actividades/3/1")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });
    
})
