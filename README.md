# downmap
A simple library that interacts with node-libnmap to perform nmap scans and generate pretty markdown tables from the results.
# Usage:
Exposes the startScan method that accepts 3 arguments: an array containing the scan targets, an object containing options for the scan and resulting output, and a callback which returns the markdown table.

#Options:

The http option specifies whether or not to include ports 80 and 443 in the results. These are generally innocent ports to have running and not interesting as far as a penetration test is concerned, so I made an option to leave them out if desired.
tableWidth specifies the width of the markdown table generated. Recommended to set this to 14 or higher or it may not be plaintext readable.

# Example:
```
var scan = require('downmap').startScan

scan(['localhost', 'scanme.nmap.org'],{http: true, tableWidth: 14}, function(output){
    console.log(output.join('\n'));
});
```