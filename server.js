var express = require("express");
var C=require("./config/config.js");


var app=express();
//Configuracion
require(C.config+"express.js")(app);
var port=process.env.PORT || 5000;
app.set('port', port);

app.use("/admin", express.static(__dirname+"/public"));

require(C.config+"database.js")();

require(C.routes+"routes.js")(app);


app.listen(port, function(){
	console.log(process.env.db);
    console.log("Conectado: "+app.get("port"));
});








