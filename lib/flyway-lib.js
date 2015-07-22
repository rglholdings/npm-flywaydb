var spawn = require("child_process").spawn;
var appRoot = require("app-root-path");

// http://stackoverflow.com/a/2548133
if (typeof String.prototype.endsWith !== "function") {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

var rootPathString = appRoot.toString();

// Chop off the /bin at the end of the path
// https://github.com/inxilpro/node-app-root-path/issues/8
if (rootPathString.endsWith("/bin")) {
  rootPathString = rootPathString.substring(0, rootPathString.length - 4);
}

// http://stackoverflow.com/a/13879531
function shspawn(command) {
  return spawn("sh", ["-c", command], { stdio: "inherit" });
}

// Path to the flyway shell script
var flywayPath = rootPathString + "/flyway/flyway";

// Call the flyway shell script with the provided args
var call = function(args) {
  var command = flywayPath + " " + args.join(" ");

  return shspawn(command);
};

exports.call = call;