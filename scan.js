var libnmap = require('node-libnmap');
var mdOut = [];
var startScan=function(targets, options, callback){
if(!options.highlight) options.highlight = ' ';
if(!options.highlightRepeat) options.highlightRepeat = 4;
if(!options.http) options.http = true;
if(!options.tableWidth) options.tableWidth = 14;
var output = function(input){
    mdOut.push(input);
}
var multStr = function (string, factor){
    var outArray = [];
        for(i=0;i<=factor;i++){
            outArray.push(string);
        }
    return outArray.join('');
}

var makeRow = function (inArray){
    var outString = "";
    inArray.forEach(function(item){
        outString = outString + '| ' + item + multStr(' ', options.tableWidth - item.length);
    })
    outString = outString + '|';
    return outString;
}
libnmap.nmap('scan', {
  range: targets,
  callback: function(err, report){
    if (err) throw err
    var tableInit = '|' + multStr('-', options.tableWidth) + ':|:' + multStr('-', options.tableWidth) + '|:' + multStr('-', options.tableWidth) + '|'

    output(makeRow(['HOST', 'PORT', 'SERVICE']));
    output(tableInit);
    report.forEach(function(item){
        output(makeRow([item[0].ip, 'PORT', 'SERVICE']));
        item[0].ports.forEach(function(port){
            if (!options.http && (port.port === '80' || port.port === '443')){
            } else output(makeRow([multStr(options.highlight, options.highlightRepeat-1), port.port, port.service]))
        })
    })
    callback(mdOut);
  }
})
}


module.exports.startScan = startScan;
