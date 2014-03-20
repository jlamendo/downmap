# downmap
A simple library that interacts with node-libnmap to perform nmap scans and generate pretty markdown tables from the results.
# Usage:
Exposes the startScan method that accepts 3 arguments: an array containing the scan targets, an object containing options for the scan and resulting output, and a callback which returns the markdown table as an array of rows. 

#Options:

The http option specifies whether or not to include ports 80 and 443 in the results. True by default.
tableWidth specifies the width of the markdown table generated. 14 by default.
highlight specifies what character will be used as a spacer in rows listing ports. By default, ' ' is used.
highlightRepeat specifies how many times the highlight will be repeated.
Ports define what ports are to be scanned. 1-65535(all ports) is the default.
Flags are the command line options passed to nmap. If changed, they must include -oG and be appended with a trailing -. Default flags are
```
-A -sV -g53 -sS -Pn -n -oG -
```
Output can be set to json or left blank. If set to json, it will return an array of json objects rather than the default markdown. This option basically forms a convenient wrapper for calling the standard libnmap scans and the downmap scans from the same library.
# Example:
```
var scan = require('downmap').startScan

scan(['localhost', 'scanme.nmap.org'],{http: true, tableWidth: 14}, function(output){
    console.log(output.join('\n'));
});
```
# Example Output:
| HOST           | PORT           | SERVICE        |
|---------------:|:---------------|:---------------|
| 127.0.0.1      | PORT           | SERVICE        |
|                | 631            | ipp            |
|                | 8080           | http-proxy     |
| 74.207.244.221 | PORT           | SERVICE        |
|                | 22             | ssh            |
|                | 9929           | nping-echo     |