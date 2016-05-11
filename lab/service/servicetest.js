var decipher = require("./Decipher");

/** 
	for: manual test for decipher service
	end: pass
	date 2016.05.11 14:00:30
**/
var algorithm = 'aes192';
var encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
var password = 'a password';
var format = 'hex';

var s = decipher.decipherHelper(algorithm,encrypted,password,format);
console.log(s);