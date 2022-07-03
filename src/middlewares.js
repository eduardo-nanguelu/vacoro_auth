//Paquetes basicos para inicializacion con json form
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

//passport y session para inicio de session
const passport = require('passport')
const session = require('express-session')

//variables de entorno y demas
require('dotenv').config()

class middlewares{

    middleware_principal(){
        this.middleware_auth()
        this.middleware_inicializacion() //al ultimo va esto
        return app
    }

    middleware_auth(){
        app.use(session({ secret: "secret", resave: false , saveUninitialized: true ,}))
        app.use(passport.initialize());
        app.use(passport.session());
    }

    middleware_inicializacion(){ //leo todos los archivos de la carpeta api/routes
        var normalizedPath = require("path").join(__dirname, "./api/routes");
        require("fs").readdirSync(normalizedPath).forEach(function(file) {app.use(require("./api/routes/" + file))});
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.json()) // we need to tell server to use json as well
    }
    
}

module.exports = middlewares