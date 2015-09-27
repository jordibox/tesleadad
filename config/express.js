var express = require("express");
var morgan =require("morgan");
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var favicon = require('serve-favicon');

module.exports=function(app, rootname){


    //Configuracion
    //Localizar ficheros estaticos

    // muestra todos las peticiones por consola
    app.use(morgan('dev'));

    //Permite cambiar el html con el método POST
    app.use(bodyParser.urlencoded({extended:false})); //parse x-www-form-urlencoded

    app.use(bodyParser.json()); //parsea json;

    //Simula delete y put
    app.use(methodOverride());


	app.use(favicon(rootname + '/public/favicon.ico'));



};
