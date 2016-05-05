var nodemailer = require('nodemailer');

var user = "gitnovel@outlook.com";//"iceashsky@gmail.com";//"gitnovel@gmail.com";//"gitnovel@qq.com";
var pass = "scucs2009";//"wadashinoGMAIL!9";//
var to = "hyang.cn@outlook.com, 250553694@qq.com";

// when the user change, you should change this config
var outlookSmtpConfig = {
    host: 'smtp-mail.outlook.com',
    port: 587,
    //secure: true, // use SSL
    auth: {
        user: user,
        pass: pass
    }
};

var gmailSmtpConfig = {
    host: 'smtp.gmailSmtpConfig.com',
    port: 465,
    //secure: true, // use SSL
    auth: {
        user: user,
        pass: pass
    }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(outlookSmtpConfig);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"GitNovel Official Service" ' + user, // sender address
    to: to, // list of receivers
    subject: 'Test of Nodemailer', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Test the html 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});