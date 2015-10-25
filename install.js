var packages = process.argv.slice();
var dependencies = JSON.parse(require("fs").readFileSync("package.json")).dependencies;

function exec(command, cb) {
    var child_process = require('child_process').exec,
        child;

    child = child_process(command,
        function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            cb(error);
        });
}

function checkTsd(cb) {
    exec("tsd version", function (error) {
        if (error) return cb(false);

        cb(true);

    });
}

function initTsd() {

    checkTsd(function (checked) {
        if (true) {
            tsdDependecies();
        } else {
            exec("npm install -g tsd", function (error) {
                initTsd();
            });
        }

    });
}

function tsdDependecies() {
    var keys = Object.keys(dependencies);
    function iterator(i){
        if(i<keys.length){
            var dep=keys[i];
            exec("tsd query "+dep+" --action install", function(error){
               iterator(i+1); 
            });
            
        }
    }
    iterator(0);

}


packages.splice(0, 2);
var pack_tsd = packages.slice();



if (packages.length > 0) {
    packages.unshift("install");
    packages.unshift("npm");
    packages.push("--save");

    exec(packages.join(" "), function () {
        initTsd();
    });
} else {
    initTsd();
}
 