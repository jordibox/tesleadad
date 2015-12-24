var express = require("express");
var C = require("./config/config.js");
var SystemModel=require(C.model+"system");

var app = express();
//Configuracion
require(C.config + "express.js")(app);
var port = process.env.PORT || 5000;
app.set('port', port);


require(C.routes + "routes.js")(app);

var db=require(C.config + "database.js");

db(
    function () {
        app.listen(port, function () {
            console.log("Conectado: " + app.get("port"));
        });
    }
);










