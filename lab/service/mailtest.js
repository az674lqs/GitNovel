var mail = require('./Mail.js');

// when the user change, you should change this config
var mailserver = 'smtp-mail.outlook.com';
var port = 587;
var user = "gitnovel@outlook.com";//"iceashsky@gmail.com";//"gitnovel@gmail.com";//"gitnovel@qq.com";
var pass = "scucs2009";//"wadashinoGMAIL!9";//
var smtpConifg = mail.createSmtpConfig(mailserver,port,user,pass);

// setup e-mail data with unicode symbols
var from = '"GitNovel Official Service" ' + user;
var to = "hyang.cn@outlook.com, 250553694@qq.com";
var subject = 'Test of our mail helper: callback arg2 ';
var text = 'Hello world，wow!!!';
var html = '<b>Html  body file 🐴</b>';
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

