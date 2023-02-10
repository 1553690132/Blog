(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{427:function(t,_,r){"use strict";r.r(_);var s=r(2),v=Object(s.a)({},(function(){var t=this,_=t._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"pm2的使用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#pm2的使用"}},[t._v("#")]),t._v(" PM2的使用")]),t._v(" "),_("p",[t._v("在windows中相关项目路径中启动"),_("code",[t._v("powershell")]),t._v("进行启动。")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("全局安装：")]),t._v(" "),_("code",[t._v("npm i pm2 -g")])]),t._v(" "),_("li",[_("strong",[t._v("启动项目：")]),t._v(" "),_("code",[t._v("pm2 start 脚本名 --name 自定义名称")]),t._v(" "),_("img",{attrs:{src:"/blog/img_other/PM2_1.png",alt:"启动项目"}})]),t._v(" "),_("li",[_("strong",[t._v("查看运行项目：")]),t._v(" "),_("code",[t._v("pm2 ls")]),t._v(" "),_("img",{attrs:{src:"/blog/img_other/PM2_2.png",alt:"查看运行项目"}})]),t._v(" "),_("li",[_("strong",[t._v("停止项目：")]),t._v(" "),_("code",[t._v("pm2 end 自定义名称/id值")])]),t._v(" "),_("li",[_("strong",[t._v("重启项目：")]),t._v(" "),_("code",[t._v("restart 自定义名称/id值")])]),t._v(" "),_("li",[_("strong",[t._v("删除项目：")]),t._v(" "),_("code",[t._v("delete 自定义名称/id值")]),t._v(" "),_("img",{attrs:{src:"/blog/img_other/PM2_3.png",alt:"其他命令"}})])]),t._v(" "),_("h2",{attrs:{id:"项目部署至服务器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#项目部署至服务器"}},[t._v("#")]),t._v(" 项目部署至服务器")]),t._v(" "),_("h3",{attrs:{id:"服务端代码"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#服务端代码"}},[t._v("#")]),t._v(" 服务端代码")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("首先在腾讯云的服务器的防火墙选项内，开启使用的服务器端口(eg:8889)和数据库端口(eg:3306)，进行放行。")]),t._v(" "),_("img",{attrs:{src:"/blog/img_other/fwq1.png",alt:""}})]),t._v(" "),_("li",[_("strong",[t._v("进入服务器的宝塔面板，下载PM2管理器并切换Nodejs版本至所需版本。")]),t._v(" "),_("img",{attrs:{src:"/blog/img_other/fwq2.png",alt:""}})]),t._v(" "),_("li",[_("strong",[t._v("使用xshell，进入当前的项目文件内（eg："),_("code",[t._v("www/wwwroot/server")]),t._v("）npm i 下载依赖。")])]),t._v(" "),_("li",[_("strong",[t._v("选择文件选项卡，进行服务端的代码打包上传，进行"),_("code",[t._v("app.js")]),t._v("和"),_("code",[t._v("default.json")]),t._v("的修改（修改端口地址和数据库地址）")]),t._v(" "),_("img",{attrs:{src:"/blog/img_other/fwq3.png",alt:""}}),t._v(" "),_("img",{attrs:{src:"/blog/img_other/fwq4.png",alt:""}})]),t._v(" "),_("li",[_("strong",[t._v("上传数据库并导入SQL文件。")]),t._v(" "),_("img",{attrs:{src:"/blog/img_other/fwq5.png",alt:""}})]),t._v(" "),_("li",[_("strong",[t._v("使用PM2进行项目添加。")]),t._v(" "),_("img",{attrs:{src:"/blog/img_other/fwq6.png",alt:""}})]),t._v(" "),_("li",[_("strong",[t._v("选择网站选项卡，添加站点（使用php站点）")]),t._v(" "),_("img",{attrs:{src:"/blog/img_other/fwq7.png",alt:""}})]),t._v(" "),_("li",[_("strong",[_("code",[t._v("postman")]),t._v("测试接口是否通信。")])])]),t._v(" "),_("h3",{attrs:{id:"客户端代码"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#客户端代码"}},[t._v("#")]),t._v(" 客户端代码")])])}),[],!1,null,null,null);_.default=v.exports}}]);