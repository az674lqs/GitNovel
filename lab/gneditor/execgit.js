
// 可以使用exec来执行git命令，但是路径不对，不是当前路径
var exec = require("child_process").exec;
var cmd = "git";
console.log(process.cwd());
exec(cmd, function callback(error, stdout, stderr) {
    console.log(stdout);
    console.log(error);
});
