var express = require("express");
var C=require("./config/config.js");

var app=express();
//Configuracion
require(C.config+"express.js")(app);

app.set('port', (process.env.PORT || 5000));

require(C.config+"database.js")();
require(C.routes+"routes.js")(app);

app.listen(C.port, function(){
    console.log("Conectado: "+app.get("port"));
});








