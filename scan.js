var libnmap = require('node-libnmap');
var mdOut = [];
var startScan=function(targets, options, callback){
//var options.tableWidth = 14;
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
            } else output(makeRow(['›››››', port.port, port.service])) //output('|    ›››››     |   ' + port.port + '   |   ' + port.service + '    |');
        })
    })
    callback(mdOut);
  }
})
}


module.exports.startScan = startScan;
