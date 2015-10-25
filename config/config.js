var priv=function(value){
    return { writable: false, configurable:true, value: value };
};

var Config = Object.create(null);
Config.prototype = {};
module.exports = Object.create(Config.prototype, {
 
        port: priv(5000),

        db:priv("mongodb://pick:pick@ds045054.mongolab.com:45054/pickyourday"),
        
        config:priv("./config/"),
        routes:priv("./routes/")
});



