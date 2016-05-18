var decipher = require("../service/Decipher");
var cipher = require("../service/Cipher");
/** 
	for: manual test for decipher service
	end: pass
	date 2016.05.11 14:00:30  s
**/
var algorithm = 'aes192'
var content = 'some clear text data';
var password = 'a password';
var format = 'hex';

var encrypted = cipher.cipherHelper(algorithm,content,password,format);
console.log("Parameters:");
var parameters = "  algorithm: " + algorithm + ", content: " + content + ", password: " + password + ", format: " + format
console.log(parameters);
console.log("encrypted: " + encrypted);

/** 
	for: manual test for decipher service
	end: pass
	date 2016.05.11 14:00:30  s
**/
var decrypted = decipher.decipherHelper(algorithm,encrypted,password,format);
console.log("decrypted: " + decrypted);