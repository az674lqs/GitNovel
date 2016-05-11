var decipher = require("./Decipher");
var cipher = require("./Cipher");
/** 
	for: manual test for decipher service
	end: pass
	date 2016.05.11 14:00:30  s
**/
var algorithm = 'aes192'
var source = 'some clear text data';
var password = 'a password';
var format = 'hex';

var encrypted = cipher.cipherHelper(algorithm,source,password,format);
console.log("Parameters:")
var parameters = "  algorithm: " + algorithm + ", source: " + source + ", password: " + password + ", format: " + format
console.log(parameters);
console.log("encrypted: " + encrypted);

/** 
	for: manual test for decipher service
	end: pass
	date 2016.05.11 14:00:30  s
**/
var decrypted = decipher.decipherHelper(algorithm,encrypted,password,format);
console.log("decrypted: " + decrypted);