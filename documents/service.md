# 后台服务功能模块

+ 执行git命令
+ 发送邮件
+ 进行数据加密/解密
+ 创建官方邮箱
+ 配置文件
+ 扫描目标文件夹发现更新（git是否已经实现了？？）






## 进行数据加密/解密
<b>描述：</b>

使用 ```
crypto
``` 模块来进行数据加密和解密。

<b>加密：</b>

+ 模块： `./service/Cipher.js`
+ 方法：

	```	
	cipher.cipherHelper(algorithm,content,password,format);
	```

+ 参数：
	1. algorithm: 加密算法，如'sha1', 'md5', 'sha256', 'sha512'，具体而言，该模块提供了与openssl中提供的加密算法库相同的支持。
	2. source: 需要加密的内容
	3. password: 用于加密的密码
	4. hex: 加密内容的输出进制，包含'binary','base64'和'hex'
+ 用法：

	```
var algorithm = 'aes192'
var content = 'some clear text data';
var password = 'a password';
var format = 'hex';
var encrypted = cipher.cipherHelper(algorithm,content,password,format);
console.log("encrypted: " + encrypted);
	```

<b>解密：</b>

+ 模块： `./service/Decipher.js`
+ 方法：

	```	
	decipher.decipherHelper(algorithm,encrypted,password,format);
	```
	
+ 参数：
	1. algorithm: 加密算法，如'sha1', 'md5', 'sha256', 'sha512'，具体而言，该模块提供了与openssl中提供的加密算法库相同的支持。
	2. encrypted: 加密后的内容（需要解密的内容）
	3. password: 用于加密的密码
	4. hex: 加密内容的输出进制，包含'binary','base64'和'hex'
+ 用法：

	```
var algorithm = 'aes192'
var encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
var password = 'a password';
var format = 'hex';
var decrypted = decipher.decipherHelper(algorithm,encrypted,password,format);
console.log("decrypted: " + decrypted);
	```

## 创建官方邮箱
+ gitnovel@qq.com
+ gitnovel@gmail.com
+ gitnovel@outlook.com
