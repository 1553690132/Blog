(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{425:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[s._v("每次向Github提交Vuepress代码时，总是需要进行push和shell文件的运行，以此来进行重新部署，十分麻烦。所以要使用Github Actions来进行项目自动化部署。")])]),t("h2",{attrs:{id:"初始化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#初始化"}},[s._v("#")]),s._v(" 初始化")]),s._v(" "),t("p",[t("strong",[s._v("首先")]),s._v("在所在项目内创建"),t("code",[s._v(".github\\workflows")]),s._v("文件路径，在该路径下创建"),t("strong",[s._v("main.yml")]),s._v("文件，进行如下配置：")]),s._v(" "),t("div",{staticClass:"language-yml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" docs\n\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("on")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 每当 push 到 main 分支时触发部署")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("push")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("branches")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("main"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 手动触发部署")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("workflow_dispatch")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("jobs")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("docs")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("runs-on")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ubuntu"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("latest\n\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("steps")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" actions/checkout@v2\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("fetch-depth")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Setup Node.js\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" actions/setup"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("node@v1\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 选择要使用的 node 版本")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("node-version")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"16"')]),s._v("\n\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 缓存 node_modules")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Cache dependencies\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" actions/cache@v2\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("id")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" yarn"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("cache\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("path")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token scalar string"}},[s._v("\n            **/node_modules")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("key")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" $"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" runner.os "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("yarn"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("$"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" hashFiles('"),t("span",{pre:!0,attrs:{class:"token important"}},[s._v("**/yarn.lock')")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restore-keys")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token scalar string"}},[s._v("\n            ${{ runner.os }}-yarn-")]),s._v("\n\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果缓存没有命中，安装依赖")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Install dependencies\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("if")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" steps.yarn"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("cache.outputs.cache"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("hit "),t("span",{pre:!0,attrs:{class:"token tag"}},[s._v("!=")]),s._v(" 'true'\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("run")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" yarn\n\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 运行构建脚本")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Build VuePress site\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("run")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" yarn build\n\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看 workflow 的文档来获取更多信息")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# @see https://github.com/crazy-max/ghaction-github-pages")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Deploy to GitHub Pages\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" JamesIves/github"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("pages"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("deploy"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("action@3.7.1\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ACCESS_TOKEN")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" $"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" secrets.ACCESS_TOKEN "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 部署到 gh-pages 分支")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("BRANCH")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" gh"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("pages\n          "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 部署目录为 VuePress 的默认输出目录")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("FOLDER")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ./public\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br"),t("span",{staticClass:"line-number"},[s._v("34")]),t("br"),t("span",{staticClass:"line-number"},[s._v("35")]),t("br"),t("span",{staticClass:"line-number"},[s._v("36")]),t("br"),t("span",{staticClass:"line-number"},[s._v("37")]),t("br"),t("span",{staticClass:"line-number"},[s._v("38")]),t("br"),t("span",{staticClass:"line-number"},[s._v("39")]),t("br"),t("span",{staticClass:"line-number"},[s._v("40")]),t("br"),t("span",{staticClass:"line-number"},[s._v("41")]),t("br"),t("span",{staticClass:"line-number"},[s._v("42")]),t("br"),t("span",{staticClass:"line-number"},[s._v("43")]),t("br"),t("span",{staticClass:"line-number"},[s._v("44")]),t("br"),t("span",{staticClass:"line-number"},[s._v("45")]),t("br"),t("span",{staticClass:"line-number"},[s._v("46")]),t("br"),t("span",{staticClass:"line-number"},[s._v("47")]),t("br"),t("span",{staticClass:"line-number"},[s._v("48")]),t("br"),t("span",{staticClass:"line-number"},[s._v("49")]),t("br"),t("span",{staticClass:"line-number"},[s._v("50")]),t("br"),t("span",{staticClass:"line-number"},[s._v("51")]),t("br"),t("span",{staticClass:"line-number"},[s._v("52")]),t("br"),t("span",{staticClass:"line-number"},[s._v("53")]),t("br"),t("span",{staticClass:"line-number"},[s._v("54")]),t("br"),t("span",{staticClass:"line-number"},[s._v("55")]),t("br")])]),t("p",[s._v("此处需要注意的是：需要对您的Github仓库进行个人密钥"),t("strong",[s._v("Token")]),s._v("的配置。")]),s._v(" "),t("h2",{attrs:{id:"个人token配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#个人token配置"}},[s._v("#")]),s._v(" 个人Token配置")]),s._v(" "),t("h3",{attrs:{id:"token生成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#token生成"}},[s._v("#")]),s._v(" Token生成")]),s._v(" "),t("p",[s._v("进入Github(科学上网)，选择个人的setting配置项。")]),s._v(" "),t("p",[t("img",{attrs:{src:"/img_git/github1.png",alt:"github 01"}})]),s._v(" "),t("p",[s._v("选择 "),t("strong",[s._v("Person access tokens")]),s._v(" 下的 "),t("strong",[s._v("Token(classic)")]),s._v(" 新建Token:")]),s._v(" "),t("p",[t("img",{attrs:{src:"/img_git/github2.png",alt:"github 02"}})]),s._v(" "),t("p",[t("strong",[s._v("需要注意，此处的Note最好为ACCESS_Token，且选择repo选项。")])]),s._v(" "),t("h3",{attrs:{id:"仓库token配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#仓库token配置"}},[s._v("#")]),s._v(" 仓库Token配置")]),s._v(" "),t("p",[s._v("进入到仓库的 "),t("strong",[s._v("setting")]),s._v(" 选项，选择 "),t("strong",[s._v("secret")]),s._v(" 选项卡，进行密钥的配置。")]),s._v(" "),t("p",[t("img",{attrs:{src:"/img_git/github3.png",alt:"github 02"}})]),s._v(" "),t("h2",{attrs:{id:"开始部署"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开始部署"}},[s._v("#")]),s._v(" 开始部署")]),s._v(" "),t("p",[s._v("回到本地，进行git的日常提交。")]),s._v(" "),t("div",{staticClass:"language-git line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-git"}},[t("code",[s._v("git add .\ngit commit -m "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"actions"')]),s._v("\ngit push\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("随后打开github，查看Actions选项内是否正常进行了部署。")]),s._v(" "),t("p",[s._v("若为下图所示，则恭喜创建成功!\n"),t("img",{attrs:{src:"/img_git/github4.png",alt:"github 02"}})]),s._v(" "),t("h2",{attrs:{id:"错误"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#错误"}},[s._v("#")]),s._v(" 错误")]),s._v(" "),t("p",[s._v("当然情况总是不尽人意，报错也十有八九。\n"),t("img",{attrs:{src:"/img_git/github5.png",alt:"github 02"}})]),s._v(" "),t("p",[s._v("这样的报错，可能性有许多。")]),s._v(" "),t("div",{staticClass:"language-git line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-git"}},[t("code",[s._v("Run actions/checkout@v3\nSyncing repository: 1553690132/blog\nGetting Git version info\nTemporarily overriding HOME="),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/home/runner/work/_temp/674fd481-242d-40bc-9d02-284326485d82'")]),s._v(" before making global git config changes\nAdding repository directory to the temporary git global config as a safe directory\n/usr/bin/git config --global --add safe.directory /home/runner/work/blog/blog\nDeleting the contents of "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/home/runner/work/blog/blog'")]),s._v("\nInitializing the repository\nDisabling automatic garbage collection\nSetting up auth\nFetching the repository\nDetermining the checkout info\nChecking out the ref\nSetting up auth for fetching submodules\nFetching submodules\n  /usr/bin/git submodule sync --recursive\n  /usr/bin/git -c protocol.version=2 submodule update --init --force --depth=1 --recursive\n  Error: fatal: No url found for submodule path "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'public'")]),s._v(" in .gitmodules\n  Error: The process "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/usr/bin/git'")]),s._v(" failed with exit code 128\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br")])]),t("p",[s._v("此处我的报错，就是因为在deploy.sh文件内，未对项目部署时进入的文件夹进行确切指定，需要进行如下修改：")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入生成的文件夹")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ./public\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[t("strong",[s._v("报错")]),s._v("总是莫名其妙，但自动化部署可以节省我们大巴的时间，所以还是值得一试的利器。")])])}),[],!1,null,null,null);t.default=e.exports}}]);