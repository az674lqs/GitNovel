var nodemailer = require('nodemailer');

/**
 * send email with mailOptions and smtpConfig
**/
function sendEmail(mailOptions,smtpConfig){
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(smtpConfig);
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        //if has the callback function
        if(arguments.length == 3){
            callback = arguments[2];
            callback(error,info);
        }
    });
}

/**
 * create the content variable
**/
function createMailOptions(from,to,subject,text,html){
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plaintext body
        html: html // html body
    };
    return mailOptions;
}

/**
 * create the smtp config variable
**/
function createSmtpConfig(mailserver,port,user,pass){
    // when the user change, you should change this config
    var smtpConfig = {
        host: mailserver,
        port: port,
        //secure: true, // use SSL
        auth: {
            user: user,
            pass: pass
        }
    };
    return smtpConfig;
}

/**
 * exports methods
**/
exports.sendEmail = sendEmail;
exports.createMailOptions = createMailOptions;
exports.createSmtpConfig = createSmtpConfig;


