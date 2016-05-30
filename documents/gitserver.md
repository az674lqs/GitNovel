#在Bandwagon上构建Git Server的一点点说明

******

这篇说明主要会给出如下几个任务的详细步骤：

1. 通过SSH远程登录；
2. 在CentOS上安装Git Server;
3. 创建用户；
4. 使用gitolite管理项目；
5. Clone到本地；

此外，相关配置如下：
<table>
<tr>
<td>属性</td>
<td>值</td>
</tr>
<tr>
<td>Server</td>
<td>Bandwagon 10G VPS</td>
</tr>
<tr>
<td>Client</td>
<td>OSX EI Capitan</td>
</tr>
</table>

这部分内容主要参考了参考文献1([centos6.5搭建一个git服务器](http://blog.sina.com.cn/s/blog_40ce02d70102uynp.html))

## 通过SSH远程登录

1. 如果Linux或者OSX那么自带的Terminal中就可以使用SSH，Windows的话，需要安装一个SSH Client软件（例如，putty）.
2. 执行命令
	
	```
	ssh [username]@[ip/domain]
	```
	username: 服务器上的用户名，如root；<br>
	ip/domain: 服务器的IP地址或者域名，如41.118.71.213; <br>
	如果服务提供商提供的SSH端口不是22的话，那么需要再加入额外信息; <br>
	
	```
	ssh [username]@[ip/domain] -p [port]
	```
	port: 端口号。
3. 然后需要输入密码，输入正确之后就进入了服务器。

## 安装Git Server

1. 安装```perl```, ```openssh```和```git```

	```
	$yum install perl openssh git
	```
2. 在服务端上创建一个新的、供git使用的用户账号

	```
	$adduser --system --shell /bin/sh --create-home --home-dir /home/git git
	```
3. 在git的目录下创建repositories的文件夹，并修改读写权限

	```
	$cd /home/git #进入对应目录
	$mkdir repositories #创建文件夹
	$chown git:git -R ./repositories #将repositories目录及其子目录的权限赋给git
	$chmod 700 ./repositories #将权限改为读和写（不可执行）
	``` 
4. 切换到git用户（第2步中创建），并获取gitolite并安装
	
	```
	$su git #切换到git用户
	$git clone git://github.com/sitaramc/gitolite #获取gitolite的代码
	$mkdir -p $HOME/bin #建立多层目录结构
	$gitolite/install -to $HOME/bin #将gitolite安装到对应目录
	```
5. 如果出现缺少模块，切换到root用户，并安装缺失包，例如```perl-Time-HiRes```
	
	```
	$su root #切换到root用户，可能需要输入密码
	$yum install perl-Time-HiRes #安装缺失依赖包
	$su git #切回git用户
	```
6. 完成！服务器上的Git Server已经完全安装成功。

## 创建用户

1. 首先在本地提供openssh的keygen生成一对RSA的秘钥

	```
	$ssh-keygen -t rsa #不需要密码一路回车
	```
2. 进入存储路径，里面有id_ras.pub和id_rsa，一个是公钥，一个是私钥，将公钥改名成你想要在Git Server上需要的用户名(因为Git Server是提供公钥的名称来生成和管理用户的)

	```
	$cd ~/.ssh #进入/home/.ssh #即存储ssh keys的路径
	$mv id_rsa.pub admin.pub #将公钥名称改为 [username].pub
	```
3. 通过scp上传公钥到到服务器的tmp目录

	```
	$scp [username].pub [username]@[ip/domain]:/tmp
	```
	username: 服务器上的用户名，如root；<br>
	ip/domain: 服务器的IP地址或者域名，如41.118.71.213; <br>
	如果服务提供商提供的SSH端口不是22的话，那么需要再加入额外信息; <br>
	
	```
	$scp -P [port] [username].pub [username]@[ip/domain]:/tmp
	```
	port: 端口号，<br>
	其中“-P”中的“P”必须大写.
4. 切换到git用户，并根据.pub建立用户[username]
	
	```
	$su git #切换到git用户
	$$HOME/bin/gitolite setup -pk [username].pub #在gitolite中构建用户[username]
	```
5. 到此，用户添加成功。

## 使用gitolite管理项目

1. 将用于管理gitolite的项目clone到本地
	
	```
	$git clone ssh://git@[ip/domain]:[port]/gitolite-admin.git #由于ssh不是走的默认端口22，需要这样才能clone代码
	```
	ip/domain: 服务器的IP地址或者域名，如41.118.71.213; <br>
	port: 端口号；<br>
	gitolite-admin这个项目中包含conf和keydir这两个目录，conf/gitolite.conf 是添加用户/仓库的配置, keydir是放对应用户的公钥.<br>
	其中，```gitolite.conf```的格式为：
	
	```
	repo [repoename] # 为一个库的实体，[repoename]为库的名称
	    RW+(权限)     =   admin（用户名，需要已经建立）
	```
	
	如下是一个demo，@all表示全部用户，但是已经是指已经在服务器上注册了的用户，而不是任意未知的用户。
	
	```
	repo gitolite-admin
	    RW+     =   admin
	    
	repo testing
	    RW+     =   @all
	    
	repo myrepos
	    RW+     =   admin
	
	repo repotest
	    RW+     =   hao
	    RW+     =   admin
	```
	
2. 根据需要，创建用户，然后修改```gitolite.conf```文件
3. 将修改提交到服务器
	
	```
	$git add gitolite.conf
	$git commit -m "gitolite.conf update"
	$git push #提交修改
	```
	这样，权限才修改成功。
4. 在```gitolite.conf```文件中添加一个repo实体，gitolite就会自动生成对应的repo。

## Clone到本地

1. 执行如下代码就可以clone代码到本地
	
	```
	$git clone ssh://git@[ip/domain]:[port]/gitolite-admin.git #由于ssh不是走的默认端口22，需要这样才能clone代码
	```
2. 可能会报警告如下：
	
	```
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
    LANGUAGE = (unset),
    LC_ALL = (unset),
    LANG = "en_US.UTF-8"
    ...
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
	```
	为了解决这个问题，在你使用的sh到配置文件（bash的~/.bashrc，zsh的~/.zshrc）中加入一行代码。
	```
	$vi ~/.zshrc #我用的zsh
	```
	然后在文件末尾，放入
	
	```
	export LC_ALL=C
	```，
	然后执行修改后的sh
	
	```
	source .zshrc
	```
3. Clone到本地后就可以进行各自操作了

****

##References:

1. [centos6.5搭建一个git服务器](http://blog.sina.com.cn/s/blog_40ce02d70102uynp.html)
2. [
处理git clone命令的非标准SSH端口连接](http://nanxiao.me/git-clone-ssh-non-22-port/)
3. [github连接出现Bad file number问题](http://rangercyh.blog.51cto.com/1444712/749490)
4. [解决 perl: warning: Setting locale failed](http://www.360doc.com/content/14/0428/16/17044736_372964025.shtml)
5. [git remote add with other ssh port](http://stackoverflow.com/questions/3596260/git-remote-add-with-other-ssh-port)
6. [使用Gitolite搭建轻量级的Git服务器](http://blog.csdn.net/zhangjs0322/article/details/32711211)
7. [Gitolite：添加用户不能正常工作，并通过FALLTHRU以root克隆时拒绝？](http://codego.net/463296/)
8. [chown 的用法](https://www.douban.com/note/102945474/)