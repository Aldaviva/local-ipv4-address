var childProcess = require('child_process');
var Q            = require('q');

var DEFAULT_GATEWAY_LINE_PATTERN = /IPv4 Route Table[^]*Active Routes:[^]*Metric\r?\n\s*(.*?)\s*\n=======/m;

module.exports.detectLocalIpV4Address = function(){
    return Q.nfcall(childProcess.execFile, "route", ["print", "-4", "0.0.0.0"])
        .spread(function(stdout, stderr){
            var matches = stdout.match(DEFAULT_GATEWAY_LINE_PATTERN);
            if(matches){
                var columns = matches[1].split(/\s+/);
                var ipAddress = columns[3];
                return ipAddress;
            } else {
                throw new Error("Could not find default gateway route in routing table.");
            }
        });
};