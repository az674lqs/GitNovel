var crypto = require('crypto');

function cipherHelper(algorithm, content, password, format){
	const cipher = crypto.createCipher(algorithm, password);
	var encrypted = '';
	cipher.on('readable', function() {
	  var data = cipher.read();
	  if (data)
	    encrypted += data.toString(format);
	});
	cipher.write(content);
	cipher.end();
	return encrypted;
}

exports.cipherHelper = cipherHelper;

/* manual test */
// var algorithm = 'aes192';
// var content = 'some clear text data';
// var password = 'a password';
// var format = 'hex';

// var s = cipherHelper(algorithm,content,password,format);
// console.log(s);