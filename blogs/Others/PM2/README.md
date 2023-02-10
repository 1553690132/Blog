---
title: PM2的使用及项目部署
date: 2022-02-11
tags:
- 项目部署
categories:
- others
---

## PM2的使用
在windows中相关项目路径中启动`powershell`进行启动。
* **全局安装：** `npm i pm2 -g`
* **启动项目：** `pm2 start 脚本名 --name 自定义名称`
![启动项目](/blog/img_other/PM2_1.png)
* **查看运行项目：** `pm2 ls`
![查看运行项目](/blog/img_other/PM2_2.png)
* **停止项目：** `pm2 end 自定义名称/id值`
* **重启项目：** `restart 自定义名称/id值`
* **删除项目：** `delete 自定义名称/id值`
![其他命令](/blog/img_other/PM2_3.png)

## 项目部署至服务器
### 服务端代码
* **首先在腾讯云的服务器的防火墙选项内，开启使用的服务器端口(eg:8889)和数据库端口(eg:3306)，进行放行。**
![](/blog/img_other/fwq1.png)
* **进入服务器的宝塔面板，下载PM2管理器并切换Nodejs版本至所需版本。**
![](/blog/img_other/fwq2.png)
* **使用xshell，进入当前的项目文件内（eg：`www/wwwroot/server`）npm i 下载依赖。**
* **选择文件选项卡，进行服务端的代码打包上传，进行`app.js`和`default.json`的修改（修改端口地址和数据库地址）**
![](/blog/img_other/fwq3.png)
![](/blog/img_other/fwq4.png)
* **上传数据库并导入SQL文件。**
![](/blog/img_other/fwq5.png)
* **使用PM2进行项目添加。**
![](/blog/img_other/fwq6.png)
* **选择网站选项卡，添加站点（使用php站点）**
![](/blog/img_other/fwq7.png)
* **`postman`测试接口是否通信。**
### 客户端代码