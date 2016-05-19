# 后台服务功能模块

<b>Done:</b>

+ 发送邮件
+ 进行数据加密/解密
+ 创建官方邮箱

<b>Todo:</b>

+ 配置文件载入
+ 执行git命令
+ 扫描目标文件夹发现更新（git是否已经实现了？？）


## 发送邮件

<b>描述：</b>

使用[<b>nodemailer</b>](http://nodemailer.com)包来进行邮件发送.

+ 功能：设置邮件smtp信息和邮件内容，并发送
+ 模块： `./service/Mail.js`
+ 方法：
	1. 创建内容变量
		
		```
		createMailOptions(from,to,subject,text,html);
		```
		变量：	
		
		a. from: 发件方名称	
		b. to: 接受方邮件地址，以“,”分隔多个邮件	
		c. subject: 邮件主题	
		d. text: 邮件正文		
		e. html: 邮件之后的html部分
	2. 创建邮件发送相关变量
		
		```
		createSmtpConfig(mailserver,port,user,pass);
		```
		变量：	
		
		a. mailserver: 邮件服务器url		
		b. port: 端口		
		c. user: 发送邮件邮箱地址	
		d. user: 发送邮件邮箱密码
	3. 发送邮件
	
		```
		sendEmail(mailOptions,smtpConifg,mailCallback); 
		```
		or 
		
		```
		sendEmail(mailOptions,smtpConifg);		
		```
		
		变量：	
		
		a. mailOptions: 内容变量		
		b. smtpConifg: 邮件发送相关变量		
		c. mailCallback: 发送结果处理模块，例如
		
		```
// callback function for the result of send mail
function mailCallback(error,info){
    if(error){
        console.log("Error: Mail send error");
    }
    else
        console.log("Mail send success");
}
		```	
+ 用法：
	
	```
// load module
var mail = require('./Mail.js');
...
// create the smtp config variable
var smtpConifg = mail.createSmtpConfig(mailserver,port,user,pass);
...
// create the mail options (content of email)
var mailOptions = mail.createMailOptions(from,to,subject,text,html);
// callback function for the result of send mail
function mailCallback(error,info){
    if(error){
        console.log("Error: Mail send error");
    }
    else
        console.log("Mail send success");
}
// send email 
mail.sendEmail(mailOptions,smtpConifg,mailCallback);    
mail.sendEmail(mailOptions,smtpConifg);
	```



## 进行数据加密/解密
<b>描述：</b>

使用 ```
crypto
``` 模块来进行数据加密和解密。

<b>加密：</b>

+ 功能: 对一个文本数据根据秘钥进行加密
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

+ 功能: 对一个文本数据根据秘钥进行解密
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
	
## 配置文件载入

<b>配置文件格式：</b>

配置文件以k,v的形势存储。

```
...
user:gitnovel
pass:123
...
```

+ 功能: 载入上诉kv格式的配置文件属性，返回map对象
+ 模块： ``` ./service/AttributeLoad.js ```
+ 方法: 

``` 
attributeLoad.laodAttributes(filename,encode);
```

+ 参数:
	1. filenmae: 配置文件路径
	2. encode: 编码方式
+ 用法: 

```
var attributeLoad = require("../service/AttributeLoad");

var filename = "../data/test.kv";
var encode = "utf-8";
var load = attributeLoad.laodAttributes;

console.log(load(filename,encode));
```



## 创建官方邮箱
+ gitnovel@qq.com
+ gitnovel@gmail.com
+ gitnovel@outlook.com
