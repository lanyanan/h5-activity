# 牙牙关注的h5活动的项目
---

## 项目采用的技术站是vue + vue-router + webpack

    关于vue的版本可以具体查看项目的package.json文件

    关于webpack可以查看webpack.config.js 和 src下面的env文件的配置

## 项目的目录
	src            --项目的开发目录

	  + common        --公共的文件

	  + env           --webpack的各种环境的配置文件

	  + app           --每个新建的h5活动都在这里面

	  	++ 项目
	  	  +++ assets     --存放静态资源的目录
	  	  +++ data       --存放静态数据的目录
	  	  +++ component  --存放vue组件的目录
	  	  +++ route      --存放vue路由
	  	  +++ index.html --存放html页面
	  	  +++ index.js   --vue的入口文件

	nodeModules    --npm模块的

	dist           --静态文件的生成目录

## 项目的下载、运行、开发、发布。

#### 项目的下载与运行
    1.首先git clone git@gitlab.9zhitx.com:server/h5-activity.git;

    2.cd h5-activity 目录然后执行

    npm install

    3.安装完成执行启动服务

    需要修改src/env/local.js host_name为本机ip地址方便手机测试

    npm run dev

#### 项目的新建与开发

    在项目的根目录下有一个cmd个脚本文件打开之后按照提示进行项目的新建与开发
    输入1代表新建项目然后输入项目名称就可以在app下生成一个vue项目的模板
    输入2代表执行npm run build
    输入3代表执行npm run dev

#### 项目的发布

    首先到http://192.168.1.196/jenkins/job/h5-activity/

	1.发布测试需修改配置为

	run build-test run upload-test

	2.发布预发需修改配置为

	run build-demo run upload-demo

	1.发布正式需修改配置为

	run build-release run upload-release

## 项目的调试

项目交付app实施后，可能还会存在许多意料外的bug。这些bug多数是由于数据与预期不一致造成。因此，我们需要一些手段来在真实app环境下进行调试。以下将介绍两款辅助工具。

#### Fiddler
目前有Fiddler2和Fiddler4两种版本，Fiddler2依赖的是.net2.0，Fiddler4则是.net4.0。可根据自己电脑上的.net框架进行选择安装。 [Fiddler官方网址](http://www.telerik.com/download/fiddler)
Fiddler本身其实是一款网络代理软件，当你启动它的时候，你电脑上的所有网络请求都将由它代理。所以，我们让它能够代理我们的手机网络，这样就能在电脑上进行远程调试了。
步骤如下：

1. 电脑端，启动Fiddler，依次选择 Tools > Fiddler Options.. > Connections ，然后勾选“Allow romote computers to connect”。如需要更改端口号，在“Fiddler listens on port:” 填写。最后点击OK即可。

2. 打开命令提示符，执行`ipconfig`确定本机局域网IP地址。如：192.168.1.100

3. 手机端，连入本地局域网wifi网络，进入当前连入wifi的设置页，代理模式选择手动，主机名填第2步查到的192.168.1.100，端口填8888（或你第1步修改的端口号）。

至此，已可以在手机上操作APP，然后在Fiddler里查看数据交互情况了。关于Fiddler的详细使用方法，请自行百度，本文不再赘述。


#### weinre
使用Fiddler可以帮我们追踪到app是否有从服务器取到数据，监听的是app到server的数据，却不能让我们监听到app到web的数据。对于我方开发人员来说，app到web的数据流是否正确，才是最重要的。因此，我们要借助另一款工具：weinre。

1. 执行`npm install weinre -g`安装weinre

2. 执行`weinre --boundHost -all-`开启weinre

3. 打开命令提示符，执行`ipconfig`确定本机局域网IP地址。如：192.168.1.100

4. 浏览器打开[192.168.1.100:8080](http://127.0.0.1:8080){:target="_blank"}

5. 在“Target Script”栏找到“Example”里的代码，并复制到项目html文件中

        <script src="http://192.168.1.100:8080/target/target-script-min.js#anonymous"></script>

6. 确保你的项目可以在局域网内通过`http://192.168.1.100/yourproject`访问到（可让同事帮忙测试）。如不能访问，可关闭防火墙并开启guest账户再试。

7. 将网址`http://192.168.1.100/yourproject`提供给app方打测试包

8. 在weinre浏览器界面“Access Points”栏找到“debug client user interface:”并点击，将会进入调试面板。切换到console选项卡，进入控制台

至此，你可以在本地编辑你的项目，在需要的地方打断点，然后在app里进行操作。weinre将提供输出你所需要的调试信息的能力。甚至，在“Elements”标签下，你还可以“遥控”界面。
