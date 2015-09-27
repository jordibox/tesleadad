var express = require("express");
var config=require("./config/config.js");

var app=express();
//Configuracion
require("./config/express.js")(app);


app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
	res.jsonp({message:"Welcome to PickYourDay API!!"});
})


var router=express.Router();

router.route("")
.get(function(req, res){
	res.jsonp({message:"Welcome to PickYourDay API!!"});
});

app.use("/api", router);

app.listen(app.get("port"), function(){
    console.log("Magia!!!");
});








