var nodemailer  = require("nodemailer");
var user = '.com',
var pass = '*********';


var smtpTransport = nodemailer.createTransport("SMTP", {
    host : 'smtp.qq.com',
    auth: {
        user: user,
        pass: pass
    }
  });
smtpTransport.sendMail({
    from    : '**********[@qq](/user/qq).com'
  , to      : '**********[@163](/user/163).com'
  , subject : 'Node.JS通过SMTP协议从QQ邮箱发送邮件'
  , html    : '<br> 这是一封测试邮件 <br> '
}, function(err, res) {
    console.log(err, res);
});