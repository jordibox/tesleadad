var path = require("path"),
    rootPath = path.normalize(__dirname + "/..");

var rootfunc = function (basename) {
    return path.normalize(rootPath+"/"+basename);
};


var priv = function (value) {
    return { writable: false, configurable: true, value: value };
};

var priv_path=function(basename){
    return priv(rootfunc(basename));
}

var Config = Object.create(null);
Config.prototype = {};
var config = Object.create(Config.prototype, {

    port: priv(5000),

    db: priv("mongodb://pick:pick@ds045054.mongolab.com:45054/pickyourday"),
    root: priv(rootPath),
    config: priv_path("config/"),
    routes: priv_path("routes/"),
    lib:priv_path("lib/"),
    models:priv_path("models/"),
    ctrl:priv_path("ctrl/")
});



module.exports = config;