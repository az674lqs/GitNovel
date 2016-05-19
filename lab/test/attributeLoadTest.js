var attributeLoad = require("../service/AttributeLoad");

var filename = "../data/test.kv";
var encode = "utf-8";
var load = attributeLoad.laodAttributes;

console.log(load(filename,encode));