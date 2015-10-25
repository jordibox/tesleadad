var mongoose = require('mongoose');
var C=require("./config.js");


module.exports=function(){

    
    var mongodb=mongoose.connect(C.db).connection;

    mongodb.on("error", function(err){
        console.log("Ha ocurrido este error durante la conexion con mongodb: "+err.message);});

    mongodb.once('open', function(){
        console.log("Conexión con MongoDB");});

 

};