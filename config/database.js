var mongoose = require('mongoose');
var config=require("./config/config.js");


module.exports=function(){

    //Conexion con la base de datos
    var mongodb=mongoose.connect(config.db).connection;

    mongodb.on("error", function(err){
        console.log("Ha ocurrido este error durante la conexion con mongodb: "+err.message);});

    mongodb.once('open', function(){
        console.log("Conexión con MongoDB");});

 

};