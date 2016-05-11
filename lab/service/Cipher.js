var crypto = require('crypto');

function cipherHelper(algorithm, source, password, format){
	const cipher = crypto.createCipher(algorithm, password);
	var encrypted = '';
	cipher.on('readable', function() {
	  var data = cipher.read();
	  if (data)
	    encrypted += data.toString(format);
	});
	cipher.write(source);
	cipher.end();
	return encrypted;
}

exports.cipherHelper = cipherHelper;

/* manual test */
// var algorithm = 'aes192';
// var source = 'some clear text data';
// var password = 'a password';
// var format = 'hex';

// var s = cipherHelper(algorithm,source,password,format);
// console.log(s);