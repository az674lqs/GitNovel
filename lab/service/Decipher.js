const crypto = require('crypto');

function decipherHelper(algorithm, encrypted, password, format){
	const decipher = crypto.createDecipher(algorithm, password);
	var decrypted = '';
	decipher.on('readable', function() {
	  var data = decipher.read();
	  if (data)
	  decrypted += data.toString('utf8');
	});
	decipher.write(encrypted, format);
	decipher.end();
	return decrypted;
}
var algorithm = 'aes192';
var encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
var password = 'a password';
var format = 'hex';

var s = decipherHelper(algorithm,encrypted,password,format);
console.log(s);
