var config = (function () {
    var private = {

        port: 5000,

        db:"mongodb://pickuser:claudia5@ds051990.mongolab.com:51990/pickyourdaydb"

    };
    return {
        get: function (name) {
            return private[name];
        }
    };
})();

module.exports = config;
