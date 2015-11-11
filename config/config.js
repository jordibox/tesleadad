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
    db: priv("mongodb://pick:pick@ds048878.mongolab.com:48878/pickyourday"),
	db_secure: priv("mongodb://127.0.0.1:27017/pickyourday"),
    root: priv(rootPath),
    config: priv_path("config/"),
    routes: priv_path("app/routes/"),
    lib:priv_path("app/lib/"),
    models:priv_path("app/models/"),
    ctrl:priv_path("app/ctrl/")
});



module.exports = config;