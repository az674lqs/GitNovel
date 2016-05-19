var fs = require("fs");

/**
 * load attributes from file
 **/
function laodAttributes(filename, encode) {
    /** set the <k,v> map **/
    map = {};
    /** read file in sync way **/
    var data = fs.readFileSync(filename, encode);
    /** parse the data **/
    var lines = data.toString().split("\n");
    for (index in lines) {
    	if(lines[index] === "")
    		continue;
        var kv = lines[index].split(":");
        var k = kv[0];
        var v = kv[1];
        map[k] = v;
    }
    return map;
}

exports.laodAttributes = laodAttributes;