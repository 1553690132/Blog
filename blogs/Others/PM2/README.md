---
title: PM2的使用及项目部署
date: 2022-11-08
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

