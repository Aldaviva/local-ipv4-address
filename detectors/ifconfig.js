var childProcess = require('child_process');
var Q            = require('q');

var IP_ADDRESS_PATTERN = /inet\s*(?:addr:)?(\S*)/;

module.exports.getIpV4AddressForInterface = function(interfaceName){
    return Q.nfcall(childProcess.execFile, "ifconfig", [interfaceName])
        .spread(function(stdout, stderr){
            var matches = stdout.match(IP_ADDRESS_PATTERN);
            if(matches){
                var ipAddress = matches[1];
                return ipAddress;
            } else {
                throw new Error("Could not find IP address in interface address information");
            }
        });
};