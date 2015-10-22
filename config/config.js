var private=function(value){
    return { writable: false, configurable:true, value: value };
};

var Config = Object.create(null);
Config.prototype = {};
module.exports = Object.create(Config.prototype, {
 
        port: private(5000),

        db:private("mongodb://pickuser:<dbpassword>@ds051990.mongolab.com:51990/pickyourdaydb"),
        
        config:private(__dirname+"/config/")
});



