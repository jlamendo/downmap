var libnmap = require('node-libnmap');
var mdOut = [];
var startScan = function (targets, options, callback) {
    if (!options.highlight) options.highlight = ' ';
    if (!options.highlightRepeat) options.highlightRepeat = 4;
    if (!options.http) options.http = true;
    if (!options.tableWidth) options.tableWidth = 14;
    if (!options.flags) options.flags = '-A -sV -g53 -sS -Pn -n -oG -';
    if (!options.ports) options.ports = '1-65535';
    var output = function (input) {
        mdOut.push(input);
    }
    var multStr = function (string, factor) {
        var outArray = [];
        for (i = 0; i <= factor; i++) {
            outArray.push(string);
        }
        return outArray.join('');
    }

    var makeRow = function (inArray) {
        var outString = "";
        inArray.forEach(function (item) {
            outString = outString + '| ' + item + multStr(' ', options.tableWidth - item.length);
        })
        outString = outString + '|';
        return outString;
    }
    libnmap.nmap('scan', {
        range: targets,
        flags: options.flags,
        ports: options.ports,
        callback: function (err, report) {
            if (err) throw err
            if (options.output==='json'){
                report.forEach(function(item){
                    mdOut.push(item);
                })
                callback(mdOut);
            }else {
            var tableInit = '|' + multStr('-', options.tableWidth) + ':|:' + multStr('-', options.tableWidth) + '|:' + multStr('-', options.tableWidth) + '|:' + multStr('-', options.tableWidth) + '|'

            output(makeRow(['HOST', 'PORT', 'SERVICE', 'VERSION']));
            output(tableInit);
            report.forEach(function (item) {
                output(makeRow([item[0].ip, 'PORT', 'SERVICE', 'VERSION']));
                item[0].ports.forEach(function (port) {
                    if (!options.http && (port.port === '80' || port.port === '443')) {}
                        else {
                            if(port.version!==''||!port.version) port.version = 'Unavailable';
                        output(makeRow([multStr(options.highlight, options.highlightRepeat - 1), port.port, port.service, port.version]));
                }
                })
            })
            callback(mdOut);
        }
        }
    })
}


module.exports.startScan = startScan;