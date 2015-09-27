var config = (function () {
    var private = {

        port: 5000,
        
    };
    return {
        get: function (name) {
            return private[name];
        }
    };
})();

module.exports = config;
