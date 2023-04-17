---
title: 面经总结
date: 2023-04-17
tags:
- Interview
categories:
- others
sidebar: auto
---

## 前端知识

#### 1. `ES6`新特性：

* let、const：变量声明拥有**块作用域**，不会变量提升，但会暂时性死区。
* 解构赋值：`const a = {...obj, val1:1, val2:2}` 即扩展运算符...
* class关键字：实现类、对象继承。super、constructor、extends等。
* 模板字符串、函数参数默认值、Symbol基本数据类型
* Map、和对象区别：key可以为任意值，对象key必须为string或symbol。`Map.set(key,value) Map.get(key)`  **map方法和`forEach`区别：**map方法返回一个新数组，对遍历数据执行函数可进行改变，forEach只是对每个数据进行遍历执行不会改变数据。 **`Array.form`**可以将Map转化为Array类型
* 箭头函数`()=>{}`：this执行为上一层，而不是其调用者。
  * j箭头函数不能作为构造函数、没有arguments、且内部不具有this故不能使用call、bind、apply等方法。且不会有原型对象。

* Promise
* ESModule的新增：import、export

#### 1-2. let、var、const区别

* let、const不能重复定义。let可以重复赋值，const不行。
* let、const没有var存在的变量提升。
* let、const创建的变量具有块级作用域。var只有函数作用域和全局作用域。
* let、const存在暂时性死区，即定义的变量实际已存在，但只有到定义的那一行才可以被访问。
* const声明时必须赋值。

#### 2.回流和重绘

* 重绘`Repaint`：盒模型已经布局好，对其进行绘制的过程。在改变元素外观时进行，outline、颜色背景色。

* 回流`Reflow`：布局引擎根据所有的样式计算出盒模型在页面的位置和大小，计算元素位置和大小时进行。

* **重绘不一定回流、回流一定重绘！**

* 触发重绘属性：（与元素颜色背景有关）

*     * color							* background								* outline-color
      * border-style					* background-image							* outline
      * border-radius					* background-position						* outline-style
      * visibility					* background-repeat							* outline-width
      * text-decoration				* background-size							* box-shadow

* 触发回流属性：（基本与位置大小有关）

*     * width						* top									* text-align
      * height					* bottom								* overflow-y
      * padding					* left									* font-weight
      * margin					* right									* overflow
      * display					* position								* font-family
      * border-width				* float									* line-height
      * border					* clear									* vertival-align
      * min-height														* white-space

* 回流比重绘成本高，修改`CSS`样式、增删改DOM节点、移动DOM都会触发回流。
* **优化方案**
  * 使用`transform：translate`代替left、top的操作。
  * 使用离线DOM操作，先将DOM隐藏，进行一系列操作后显示。
  * 禁止一条条修改class样式，应预定义样式直接修改DOM的className
  * 动画过程中采用`transform：translateZ(0)`开启`GPU`硬件加速

#### 3.类型判断

* **JS类型：String、BigInt、Number、Symbol、Null、Undefined、Boolean**
* `typeof`：返回字符串，表示类型。（string、null(object)、undefined、symbol、number、function、bigint、boolean）**对基本类型判断准确，无法精确判断引用数据类型（null和Array都会识别为object）**
* `instanceof`：检测构造函数prototype是否出现在某个实例对象的原型链上。**对引用数据类型判断准确，无法对基本数据类型精确判断，限制数据必须是new出来的对象。**
* **`constructor`：**每个函数定义都会生成一个constructor，基本类型会隐式装箱，创建构造函数实例。**可以对基本数据类型和引用数据类型精确判断，但无法识别null和undefined。**
* **`Object.prototype.toString.call()`**：可以对任何数据类型进行判断，生成结果为`[object type]` **（缺点是自身可能被修改）** 
  * 为什么使用object原型对象的tostring而不是对象自身原型的tostring：许多对象的tostring被改写，而object的tostring允许被修改，所以使用object来进行判断。


#### 4.`ESModule`和`CommonJS`区别

* ESModule：export导出、import导入
* CommonJS：module.exports、exports导出，require导入
* ESModule会提升import、commonJs不会提升require
* ESModule中this指向undefined、CommonJS指向模块本身
* ESModule在静态编译期间确定模块依赖、CommonJS运行时加载模块
* ESModule导出引用规则，内部修改可以同步到外部，CommonJS导出的是值拷贝，进行缓存，内部修改不会同步至外部

#### 5.三栏布局

* 流体布局float：左右浮动，中间margin控制距离。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>两栏布局</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              text-align: center;
          }
  
          header {
              background-color: #ddd;
          }
  
          .content {
              width: 100%;
          }
  
          .left {
              float: left;
              width: 200px;
              background-color: antiquewhite;
          }
  
          .right {
              float: right;
              width: 200px;
              background-color: aquamarine;
          }
  
          .mid {
              margin: 0 200px;
              background-color: skyblue;
          }
  
          footer {
              background-color: #ddd;
          }
      </style>
  </head>
  
  <body>
      <header>header</header>
      <div class="content">
          <div class="left column">left</div>
          <div class="right column">right</div>
          <div class="mid column">mid</div>
      </div>
      <footer>footer</footer>
  </body>
  
  </html>
  ```

* `BFC`布局：左右浮动，利用`BFC`元素不会和浮动元素重合特性。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>两栏布局</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              text-align: center;
          }
  
          header {
              background-color: #ddd;
          }
  
          .content {
              width: 100%;
          }
  
          .left {
              float: left;
              width: 200px;
              background-color: antiquewhite;
          }
  
          .right {
              float: right;
              width: 200px;
              background-color: aquamarine;
          }
  
          .mid {
              overflow: hidden;
              /* 或者使用 display: flex; */
              background-color: skyblue;
          }
  
          footer {
              background-color: #ddd;
          }
      </style>
  </head>
  
  <body>
      <header>header</header>
      <div class="content">
          <div class="left column">left</div>
          <div class="right column">right</div>
          <div class="mid column">mid</div>
      </div>
      <footer>footer</footer>
  </body>
  
  </html>
  ```

* `flex`布局：父元素flex布局，mid子元素为`flex-grow:1`填充。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>两栏布局</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              text-align: center;
          }
  
          header {
              background-color: #ddd;
          }
  
          .content {
              width: 100%;
              display: flex;
          }
  
          .left {
              width: 200px;
              background-color: antiquewhite;
          }
  
          .right {
              width: 200px;
              background-color: aquamarine;
          }
  
          .mid {
              flex: 1; 
              /* 即flex-grow: 1; */
              background-color: skyblue;
          }
  
          footer {
              background-color: #ddd;
          }
      </style>
  </head>
  
  <body>
      <header>header</header>
      <div class="content">
          <div class="left column">left</div>
          <div class="mid column">mid</div>
          <div class="right column">right</div>
      </div>
      <footer>footer</footer>
  </body>
  
  </html>
  ```

* `Tabel`布局：父元素table布局，子元素设置为table-cell单元格形式。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>两栏布局</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              text-align: center;
          }
  
          header {
              background-color: #ddd;
          }
  
          .content {
              width: 100%;
              display: table;
          }
  
          .column {
              display: table-cell;
          }
  
          .left {
              width: 200px;
              background-color: antiquewhite;
          }
  
          .right {
              width: 200px;
              background-color: aquamarine;
          }
  
          .mid {
              background-color: skyblue;
          }
  
          footer {
              background-color: #ddd;
          }
      </style>
  </head>
  
  <body>
      <header>header</header>
      <div class="content">
          <div class="left column">left</div>
          <div class="mid column">mid</div>
          <div class="right column">right</div>
      </div>
      <footer>footer</footer>
  </body>
  
  </html>
  ```

* 定位：左右栏绝对定位脱标，中间部分设置边距挤入。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>两栏布局</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              text-align: center;
          }
  
          header {
              background-color: #ddd;
          }
  
          .content {
              position: relative;
              width: 100%;
          }
  
          .left {
              position: absolute;
              top: 0;
              left: 0;
              width: 200px;
              background-color: antiquewhite;
          }
  
          .right {
              position: absolute;
              top: 0;
              right: 0;
              width: 200px;
              background-color: aquamarine;
          }
  
          .mid {
              margin: 0 200px;
              background-color: skyblue;
          }
  
          footer {
              background-color: #ddd;
          }
      </style>
  </head>
  
  <body>
      <header>header</header>
      <div class="content">
          <div class="left column">left</div>
          <div class="mid column">mid</div>
          <div class="right column">right</div>
      </div>
      <footer>footer</footer>
  </body>
  
  </html>
  ```

* 圣杯布局：利用浮动、定位、margin负值。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>两栏布局</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              text-align: center;
          }
  
          header {
              background-color: #ddd;
          }
  
          .content {
              margin: 0 200px;
          }
  
          .left {
              position: relative;
              left: -200px;
              float: left;
              margin-left: -100%;
              width: 200px;
              background-color: antiquewhite;
          }
  
          .right {
              position: relative;
              right: -200px;
              float: left;
              margin-left: -200px;
              width: 200px;
              background-color: aquamarine;
          }
  
          .mid {
              float: left;
              width: 100%;
              background-color: skyblue;
          }
  
          footer {
              clear: both;
              background-color: #ddd;
          }
      </style>
  </head>
  
  <body>
      <header>header</header>
      <div class="content">
          <div class="mid column">mid</div>
          <div class="left column">left</div>
          <div class="right column">right</div>
      </div>
      <footer>footer</footer>
  </body>
  
  </html>
  ```

* 双飞翼布局：与圣杯布局基本一致，圣杯布局是父元素空出位置给left、right定位占用。而双飞翼布局则是通过修改mid中内容的左右margin使得left、right占用空隙。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>两栏布局</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              text-align: center;
          }
  
          header {
              background-color: #ddd;
          }
  
          .column {
              float: left;
          }
  
          .left {
              margin-left: -100%;
              width: 200px;
              background-color: antiquewhite;
          }
  
          .right {
              margin-left: -200px;
              width: 200px;
              background-color: aquamarine;
          }
  
          .mid {
              width: 100%;
              background-color: skyblue;
          }
  
          #mid-content {
              margin: 0 200px;
          }
  
          footer {
              clear: both;
              background-color: #ddd;
          }
      </style>
  </head>
  
  <body>
      <header>header</header>
      <div class="content">
          <div class="mid column">
              <div id="mid-content">mid</div>
          </div>
          <div class="left column">left</div>
          <div class="right column">right</div>
      </div>
      <footer>footer</footer>
  </body>
  
  </html>
  ```

#### 6. `CSS3`新特性

* border-radius：圆角边框
* box-shadow：边框阴影（参数：X轴偏移量、Y轴偏移量、阴影模糊半径、阴影扩展半径、颜色、投影方式[ inset为内部投影，省略则为外部 ]）

* border-image：边框图片，对图片进行切割。
  * border-image-source：定义边框图像的路径；
  * border-image-slice：定义边框图像从什么位置开始分割；
  * border-image-width：定义边框图像的厚度（宽度）；
  * border-image-outset：定义边框图像的外延尺寸（边框图像区域超出边框的量）；
  * border-image-repeat：定义边框图像的平铺方式。
* rgba：rgb颜色和opacity透明度
* liner-gradient：线性渐变色（参数：渐变方向、起始点颜色、终止点颜色）
* text-overflow：文字溢出（clip剪切、ellipsis省略号）word-wrap：文字排版（nowrap强制一行）
* text-shadow：文字阴影
* background-origin：图片起始位置（border-box、padding-box、content-box）只有在background-image设置为no-repeat时生效。
* rotate旋转、scale变形
* **盒子模型：** box-sizing：`content-box`（标准盒模型，宽度高度等于border+padding+content） `border-box`（怪异盒模型，宽度高度包含了padding、border，即会撑开盒子）
* **flex布局：**flex简写属性->flex-grow、flex-shrink、flex-basics
  * flex-grow：规定了在剩余容器空间内的分配的相对比例。
  * flex-shrink：规定flex元素的收缩规则
  * flex-basis：规定了flex元素在主轴方向的初始大小。


#### 7. 正向代理、反向代理

* **正向代理**是指客户端向目标服务器请求资源时向正向代理服务器发送请求，并指定目标服务器，然后代理服务器向目标服务器转发请求，将内容返回给客户端。一般正向代理需要在客户端进行一些特殊的设置才行，主要解决了访问限制的问题
* **反向代理**是指代理服务器来接收客户端的请求，然后再将请求转发给内部网络上的服务器，将服务器上的结果返回给客户端。对于客户端来说，反向代理就相当于目标服务器，一般客户端不需要进行特殊配置，一般提供负载均衡，安全防护的作用

#### 8. 跨域

* 违反浏览器的同源策略机制（js脚本无法和另外一个域进行交互），即为跨域。**同源策略：** 即端口、协议、域名不同。
* HTML允许跨域的标签：img、link、script

**解决方案：** 

* `JSONP`（只能进行get请求）利用script没用跨域限制，设置src属性发送带有回调函数参数的GET请求。

  ```js
  //前端请求
  var script = document.createElement('script');
      script.type = 'text/javascript';
  
      // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
      script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
      document.head.appendChild(script);
  
      // 回调执行函数
      function handleCallback(res) {
          alert(JSON.stringify(res));
      }
  
  //nodejs实现后端
  var querystring = require('querystring');
  var http = require('http');
  var server = http.createServer();
  
  server.on('request', function(req, res) {
      var params = querystring.parse(req.url.split('?')[1]);
      var fn = params.callback;
  
      // jsonp返回设置
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(fn + '(' + JSON.stringify(params) + ')');
  
      res.end();
  });
  
  server.listen('8080');
  console.log('Server is running at port 8080...');
  ```

* `CORS` 跨域资源共享：服务端设置`Access-Control-Allow-Origin` 

  ```js
  //前端若携带cookie
  //原生ajax
  var xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容
  
  // 前端设置是否带cookie
  xhr.withCredentials = true;
  
  xhr.open('post', 'http://www.domain2.com:8080/login', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('user=admin');
  
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          alert(xhr.responseText);
      }
  };
  
  //jQuery
  $.ajax({
      xhrFields: {
          withCredentials: true,
      },
      crossDomain: true
  })
  
  //vue
  axios.defaults.withCredentials = true
  ```

* `proxy` ：vue处理跨域

  ```js
  module.exports = {
      devServer: {
          historyApiFailback: true,
          proxy: [{
              content: '/login',
              target: 'http://www.xxx.com:3007',
              changeOrigin: true,
              secure: false,
              cookieDomain.Rewrite: false
          }]
      }
  }
  ```

* 基于`websocket`的`socket.io`

  ```js
  <div>user input：<input type="text"></div>
  <script src="./socket.io.js"></script>
  <script>
  var socket = io('http://www.domain2.com:8080');
  
  // 连接成功处理
  socket.on('connect', function() {
      // 监听服务端消息
      socket.on('message', function(msg) {
          console.log('data from server: ---> ' + msg); 
      });
  
      // 监听服务端关闭
      socket.on('disconnect', function() { 
          console.log('Server socket has closed.'); 
      });
  });
  
  document.getElementsByTagName('input')[0].onblur = function() {
      socket.send(this.value);
  };
  </script>
  ```

#### 9. `CSS`三角

* 对不设置高度宽度的盒子设置border达到三角，一处为有色、两侧为透明、对应一处为0

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          * {
              margin: 0;
              padding: 0;
          }
  
          .triangle {
              margin: 100px auto;
              border-top: 0;
              border-left: 20px solid transparent;
              border-right: 20px solid transparent;
              border-bottom: 20px solid skyblue;
              width: 0;
              height: 0;
          }
      </style>
  </head>
  
  <body>
      <div class="triangle"></div>
  </body>
  
  </html>
  ```

#### 10. 画`0.5px`的线

* box-shadow实现：阴影模糊扩展半径设置为`0.5px`

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>0.5px</title>
      <style>
          div {
              width: 200px;
              height: 200px;
              background-color: skyblue;
              margin: 200px auto;
              box-shadow: 0 0 0 0.5px #000;
          }
      </style>
  </head>
  <body>
      <div></div>
  </body>
  </html>
  ```

* ::after伪类实现：为盒子设置after伪元素，宽度为盒子宽度，高度为0.5px。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>0.5px</title>
      <style>
          div {
              position: relative;
              width: 200px;
              height: 200px;
              background-color: skyblue;
              margin: 200px auto;
          }
  
          div::after {
              position: absolute;
              content: "";
              bottom: 0;
              width: 100%;
              height: 0.5px;
              background-color: #000;
          }
      </style>
  </head>
  
  <body>
      <div></div>
  </body>
  
  </html>
  ```

* transform缩放实现：伪类元素配合scale缩放属性，初始为盒子两倍大小再缩放为等比。

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>0.5px</title>
      <style>
          div {
              position: relative;
              width: 200px;
              height: 200px;
              background-color: skyblue;
              margin: 200px auto;
          }
  
          div::after {
              position: absolute;
              top: -50%;
              left: -50%;
              content: "";
              width: 200%;
              height: 200%;
              border-bottom: 1px solid #000;
              transform: scale(.5, .5);
          }
          
          /* 这里也可以使用 transform-origin设置伪类元素变化原点为盒子左上角 */
          div::after {
              position: absolute;
              content: "";
              width: 200%;
              height: 200%;
              border-bottom: 1px solid #000;
              transform: scale(.5, .5);
              transform-origin: 0 0;  /* 相当于top left */
          }
      </style>
  </head>
  
  <body>
      <div></div>
  </body>
  
  </html>
  ```

#### 11. Cookie、Token、Session

* Cookie：在**客户端**保存HTTP状态，HTTP请求头携带cookie进行访问。cookie由k-v键值对组成，每个cookie大小限制为`4kb`。通过`setMaxAge` 设置cookie有效期，浏览器访问服务器会在响应头中添加set-cookie字段用于将cookie返回给浏览器。
* Session：在**服务端**保存HTTP状态，web服务器开辟空间保存所有的session，每个session都有对应的`sessionID`，为了防止溢出，每个session都有有效期`（30min）`，有效期内未访问则判定用户离线删除该session。**服务器端的session和客户端的cookie**息息相关，通常`sessionID`存放在cookie中，当第一次请求时会创建session对象，将`sessionID`放入响应头的set-cookie中，下次请求cookie就会携带`sessionID`发送至服务器。
* Token：即令牌，用来唯一识别一个客户端，解决了session依赖于单个服务器的问题。服务器通过用户的信息生成唯一字段发送给客户端，客户端存入浏览器，之后每次请求都会携带该token，服务端通过这个token来查询用户信息。（类似于客户端请求携带cookie内的`sessionID`到服务端匹配session信息）
  * token登录流程：① 客户端使用账号密码登录。② 服务端收到请求后，验证账号密码。③ 验证成功后，服务端签发一个token发送给客户端。④ 客户端收到token后本地存储在浏览器中。⑤ 客户端每次向服务端请求资源时都要携带该token。⑥ 服务端收到请求后验证token，成功后返回数据。


#### 12. cookie和webStorage的区别

* cookie是存储在客户端用于和服务器进行会话使用的信息载体。目的是辨别用户身份，只能存储4kb左右数据。
* `webStorage`类似于cookie，是浏览器本地存储的新方式，存储量更大，且不会像cookie一样请求一次就会携带一次。
* `localStorage` ：生命周期永久，除非手动去除，存储大小为5MB，浏览器在隐私模式下不可被读取，不能被爬虫。
* `sessionStorage`：在同源的窗口中始终会存在，只要浏览器不关闭就不会删除。
* `webStorage`是以字符串形式进行存储，存储对象需要用到`JSON.stringify`和`JSON.parse`
* 区别：大小不同，数据有效期不同，作用域不同（`localStorage`和cookie在同源窗口中共享，`sessionStorage`不在不同的浏览器窗口中共享）

#### 13. Vue的template怎么生成AST

* `vue`中，模板会被解析成抽象语法树`AST`，然后被转化为渲染函数，最终渲染为DOM。
* `vue`中的模板编译器将模板解析成一个`AST`、`AST`是由一系列节点组成的树形结构。节点为vue中的DOM、指令、文本等。模板编译器将模板中的元素区分存储在对象中，最后将这些节点转化为`VNode`(虚拟节点)树。
* `vue`通过比较新旧`VNode`树，进行高效更新，是响应式渲染的核心所在。

#### 14. Vue中的nextTick

* `vue`中对组件进行状态属性修改时，组件不会立即更新，而是会再下一个事件循环中更新，由于vue更新是异步的这样做可以节省性能。
* 若需要在更新组件状态后立即获取更新后的DOM、则需要使用nextTick方法。
* `nextTick`接收回调函数作为参数，回调函数在下一次事件循环中执行，且可以获取到更新后的DOM，且`nextTick`会返回一个Promise对象，可以使用`async`、`await`进行取值。

#### 15. 原型链

* 每个函数对象(构造函数)都会拥有一个原型`prototype`其指向该函数的原型对象。
* 每个对象同样拥有`__proto__`属性，其指向这个对象的原型对象。
* 而原型对象也拥有`__proto__`属性，其指向这个对象继承的父对象的实例化对象，这样不断寻找的过程即为原型链。最终会找到Object、Object的原型对象最终指向null。
* 寻找元素和方法会首先在自身上寻找，其次才会去循着原型链进行寻找。
* 原型对象上挂载一些公用方法，避免了内存的浪费。

#### 16. `Vue2`响应式原理

* `vue2`实现响应式核心是**`Object.defineProperty`**方法.

* 通过内部get，set的监听来进行**数据劫持，结合发布订阅模式，**在数据发生改变的时候，发送消息给订阅者，触发对应的监听回调渲染视图，即数据和视图同步变化。

* 缺点：新增删除属性不会更新，需要使用`$set`和`$delete`语法糖操作，对数组修改不会更新，尽量使用`splice`。

  ```js
      const data = {name: 'lwh', age: 18}
  
      observer(data)
  
      function observer(target) {
          if (typeof target !== 'object' || target === null) {
              return target
          }
          for (let key in target) {
              defineReactive(target, key, target[key])
          }
      }
  
      function defineReactive(target, key, value) {
          Object.defineProperty(target, key, {
              get: function () {
                  return value
              },
              set: function (newValue) {
                  if (value !== newValue) {
                      // 视图更新
                      value = newValue
                  }
              }
          })
      }
  ```

* 若对象是多层的则需要深度监听（在进行数据劫持时先进行一次获取，在调用set时再进行一次获取）

  ```js
  function defineReactive(target, key, value) {
      observer(value) // 深度监听
      Object.defineProperty(target, key, {
  		get() {
              return value
          },
          set(newValue) {
              observer(newValue)
              if(newValue !== value) value = newValue // 视图更新
          }
      })
  }
  ```

#### 16-2. 收集依赖与派发更新

* 对observer的优化，将其封装为类对象：

  ```js
  //检测数据
  function observe(data) {
      if(typeof data !== 'object') return
      new Observer(data)
  }
  
  class Observer {
      constructor(value) {
          this.value = value
          this.walk()
      }
      walk() {
          Object.keys(value).forEach(e => defineReactive(value, e, value[e]))
      }
  }
  ```

* **依赖：**

  * 通过Watcher类和Dep类进行响应式实现。Wathcer类为中介，数据变化时通过Watcher中转，通知组件。Dep类用于管理依赖，每个Observer类的实例都拥有一个Dep实例。通过dep.depend收集、dep.notify进行通知。

  * vue中的Watcher实例订阅一个或者多个数据，这些数据称为Watcher的依赖，依赖发生变化，会执行Watcher内部的回调cb实现某些功能。

  * 在**getter**中收集依赖、在**setter**中触发依赖。

  * 只有Watcher触发的getter才会收集到依赖，触发了getter的Watcher会被收集到Dep中。

    ```js
    class Watcher {
        constructor(data, expression, cb) {
            //data:数据对象
            //expression:表达式，和data配合获取watcher依赖的数据
            //cb:依赖变化时触发的回调
            this.data = data
            this.expression = expression
            this.cb = cb
            this.value = this.get()
        }, 
        get() {
            const value = parsePath(this.data, this.expression)
            return value
        },
     	//数据变化时执行，从而执行回调cb   
        update() {
            const value = parsePath(this.data, this.expression)
            cb()
        },
    }
    //获取watcher依赖数据
    function parsePath(obj, expression) {
        const segments = expression.split(".")
        for(let key of segments) {
            if(!obj) return
            obj = obj[key]
        }
        return obj
    }
    ```

  * watcher的依赖发生更新时，执行回调就是派发更新。

  * 每个数据都只应该维护自己的数组，数组存放以来自己的watcher，优化defineReactive函数，通过闭包给每一个属性创建一个维护数组即**dep**

    ```js
    function defineReactive(obj, key, value) {
     	const dep = []
        observer(value)
        Object.defineProperty(obj, key, {
            get() {
                return value
            },
            set(newValue) {
                if(newValue === value) return
                observer(newValue)
                value = newValue
                dep.notify() //触发依赖
            }
        })
    }
    ```

* **依赖收集：**

  * 页面在进行渲染时，渲染引擎解析模板，实例化Watcher，执行其内部get获取依赖的数据。但Object.defineProperty重写getter方法，即重写数据访问行为。则在getter内部对watcher进行添加至dep中，即完成了依赖收集。

  * **将Watcher设置到全局，如window上。读取数据时，触发getter，getter会获取到当前读取数据的Watcher，将这个Watcher收集到Dep中。**

  * 对Object.defineProperty的getter和Watcher的get进行修改：

    ```js
    // class Watcher
    get() {
        //依赖收集阶段的标志
        window.target = this
        const value = parsePath(this.data, this.expression)
        window.target = null //求值完毕后重置，防止其他watcher触发
    	return value
        }
    // Object.defineProperty
    get() {
        dep.push(window.target) //封装为dep.depend()
        return value
    }
    ```

  * **Dep实际上使用了发布订阅模式，当数据发生变化，会循环依赖列表，给所有的Wathcer通知一遍。**

* **派发更新：**

  * 依赖变化时触发watcher回调，哪个watcher触发了getter读取了数据，则这个watcher依赖于这个数据，所以在这个数据的setter中进行回调操作的触发即派发更新。

    ```js
    set(newValue) {
        if(newValue === value) return
        value = newValue
        observer(newValue)
        dep.forEach(e => e.update()) //触发回调
    }
    ```

  * 如果父子组件进行嵌套时，父组件的watcher会被子组件覆盖，子组件渲染完毕target变为null，所以需要对window.target使用栈进行存储。

    ```js
    const targetStack = []
    function pushTarget(_target) {
        target.push(window.target)
        window.target = _target
    }
    function popTarget() {
        window.target = targetStack.pop()
    }
    //对watcher修改
    get() {
        pushTarget(this)
        const value = parsePath(this.data, this.expression)
        popTarget()
        return value
    }
    ```

* **Dep类：**

  ```js
  class Dep {
      constructor() {
          this.subs = []
      }
      
      depend() {
          //依赖收集
          if(Dep.target) this.addSub(Dep.target)
      }
      //通知更新
      notify() {
          //通知watcher更新依赖即派发更新
          const subs = [...this.subs]
          subs.forEach(s => s.update()) //通知所有的watcher派发更新
      }
      //添加订阅
      addSub(sub) {
          this.subs.push(sub)
      }
  }
  ```

* **Watcher类：**

  ```js
  class Watcher {
      consturctor(data, expression, cb) {
          this.data = data
          this.expression = expression
          this.cb = cb
          
      }
      get() {
          pushTarget(this)
          const value = parsePath(this.data, this.expression)
      	popTarget()
          return value	
      }
      update(oldValue) {
          //修改后对旧值进行监听
          this.value = parsePath(this.data, this.expression)
          this.cb.call(this.data, this.value, oldValue)
      }
  }
  ```

* **总结：**vue2响应式本质是observer进行观察转化变量为响应式，通过watcher类中介进行依赖获取，dep类进行更新。

  ```js
  class Observer {
      constructor(value) {
          this.value = value
      	this.walk()
      }	
      walk() {
          Object.keys(this.value).forEach(v => defineReactive(this.value, v))
      }
  }
  
  class Dep {
      constructor() {
          this.subs = []
      }
      depend() {
          if(Dep.target) {
              this.addSubs(Dep.target)
          }
      }
      notify() {
          const subs = [...this.subs]
      	subs.forEach(s => s.update())
      }
      addSubs(target) {
          this.subs.push(target)
      }
  }
  
  Dep.target = null
  
  const StackTarget = []
  
  function pushTarget(_target) {
      StackTarget.push(Dep.target)
      Dep.target = _target
  }
  
  function popTarget() {
      Dep.target = StackTarget.pop()
  }
  
  class Watcher {
      constructor(obj, expression, callback) {
          this.obj = obj
          this.expression = expression
          this.callback = callback
          this.value = this.get()
      }
      get() {
          pushTarget(this)
          const value = parsePath(this.obj, this.expression)
          popTarget()
          return value
      }
      update() {
          const oldValue = this.value
          this.value = parsePath(this.obj, this.expression)
          this.callback.call(this, this.value, oldValue)
      }
  }
  
  function parsePath(obj, expression) {
      const express = expression.split('.')
      for(const exp of express) {
          if(!obj) return
          obj = obj[exp]
      }
      return obj
  }
  
  function observe(obj) {
      if(typeof obj !== 'object') return
      new Observer(obj)
  }
  
  function defineReactive(obj, key, value = obj[key]) {
      let dep = new Dep()
      observe(value)
      Object.defineProperty(obj, key, {
          get() {
              dep.depend()
              return value
          },
          set(newValue) {
              if(value === newValue) return
              value = newValue
              observe(newValue)
              dep.notify()
          }
      })
  }
  
  const obj = {data1: 'xxx', data2: 'xxx'}
  observe(obj)
  const _watcher = new Watcher(obj, "data1", (value, oldValue) => {
      console.log(`新值为:${value}, 旧值为:${oldValue}`)
  })
  ```

#### 16-3. 发布订阅模式

* 包括：发布者、订阅者、第三方

  ```js
  function fn1() {} //事件函数1
  function fn2() {} //事件函数2
  // 第三方eventBus、开启自定义事件监听
  eventBus.on("eventName", fn1); //订阅者1
  eventBus.on("eventName", fn2); //订阅者2
  eventBus.$emit("eventName") //发布者$emit
  //生命周期末，防止内存泄漏，删除自定义事件
  eventBus.$off("eventName", fn1)
  ```

* 发布订阅模式与观察者模式相比，具有第三方这个媒介。

#### 17. `Vue3`响应式原理

* `vue3`实现响应式使用的是`proxy`代理（拦截对象属性的增删改），`reflect`反射去处理。

  ```js
  new Proxy(data, {
      get(target, prop) {
          return Reflect.get(target, prop)
      },
      set(target, prop, value) {
          // 视图更新
          return Reflect.set(target, prop, value)
      },
      deleteProperty(target, prop) {
          return Reflect.deleteProperty(target, prop)
      }
  })
  ```

* **proxy的优势：**
  * proxy能直接代理整个对象，defineProperty只代理对象上的某个属性。
  * proxy对代理对象的监听更完善。
  * proxy代理对象会生成新的对象，不会修改被代理对象本身。

#### 18. 函数

* 函数声明：`function add(a, b) {return a + b;}`
* 表达式定义：`var sum = function(a, b) {return a + b;}`
* Function构造函数：`var sum = new Function(a, b) {return a + b;}`

* **匿名函数和全局执行函数的this指向window**

* 普通函数默认返回值为undefined，构造函数默认返回值为新创建的对象。

#### 19. 杂题

* **盒子快速居中：**父盒子display(flex)，子盒子`margin：auto`

* **padding和margin区别**： **作用对象不同**，padding作用于自身，margin作用于外部对象。

* **`vw`**和百分比区别：百分比有继承关系，`vw`仅相对于视口宽度。

* **浏览器支持小字体：**`transform：scale`进行缩放

* **深浅拷贝：**浅拷贝修改新数据会影响源数据（直接赋值、解构赋值：解构赋值一层相当于深拷贝、深层相当于浅拷贝）

  * 深拷贝：`JSON.parse(JSON.stringify(list))` 转化**函数**时有问题。

  * 深拷贝：(重要)

    ```js
    function deepClone(source) {
        const target = source instanceof Array ? [] : {}
        for(let key in source) {
            if(source.hasOwnProperty(key)) {
                if(source[key] && typeof source[key] === 'object') {
                    target[key] = source[key] instanceof Array ? [] : {}
                    target[key] = deepClone(source[key])
                } else {
                    target[key] = source[key]
                }
            }
        }
        return target
    }
    ```

* 元素隐藏：
  * display：none（会导致重绘和回流）
  * visibility：hidden（原位置依然存在，仅会导致重绘）
  * opcaity：0（与visibility一致）
  * position：left、top足够大的负值，移出屏幕。
  * overflow：hidden
  * transfrom：scale(0)
  * clip：rect(0,0,0,0)（将元素裁剪到0，使其不可见，但仍然存在）
  
* 数组去重：

  * 


#### 20. 前端性能优化

* 加载：

  * 减少`http`请求（精灵图、文件合并）

  * 资源压缩

  * CDN引入

  * SSR服务端渲染、预渲染

  * 懒加载

* 减少DOM操作，避免`reflow`。利用文档碎片`createDocumentFragment`存放DOM统一处理。

#### 21. 图片懒加载

* 利用自定义属性例如`data-src’`存放图片真实路径，src存放加载路径，在用户滑动至相应区域时加载图片发出请求。

  ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  
  <body>
      <img src="预加载图片路径" data-src="真实路径" alt="image">
      <img src="预加载图片路径" data-src="真实路径" alt="image">
      <img src="预加载图片路径" data-src="真实路径" alt="image">
      <script>
          const imgs = document.querySelector('img')
          const len = imgs.length
          let n = 0
          window.onscroll = lazyload = () => {
              for (let i = n; i < len; i++) {
                  if (imgs[i].offsetTop < document.documentElement.scrollTop + document.documentElement.clientHeight) {
                      if (imgs.getAttribute('src') === '预加载图片路径') {
                       imgs.getAttribute('src') = imgs.getAttribute('data-src')   
                      }
                      n = i + 1 // 防止图片重复加载
                  }
              }
          }
      </script>
  </body>
  
  </html>
  ```


#### 22. this指向

* 默认绑定：一般this指向window，函数this指向其调用者，严格模式下指向undefined。

* 隐式绑定：对象内函数指向对象本身。
* 显式绑定：bind、call、apply传入对象，改变this的上下文指向为传入值对象。
* new绑定：构造函数内的this指向创建出来的实例。
* 箭头函数没有this，其this为上一层this指向。（使用call、apply、bind改变this指向）

#### 23. 作用域链

* 函数查找变量，会先从自身开始，逐层往上查找，最终找到全局作用域。

#### 24. 闭包

* 为避免变量被污染、实现数据私有化，保存变量不被垃圾回收。（防抖节流、封装库）

* 闭包条件：嵌套函数、内部函数访问外部作用域的值、返回值为函数、创建对象函数使其长期驻留。（内部函数就是闭包！）

  ```js
  function fn() {
  	let a = 10;
      function fn2() {
          a--;
          console.log(a);
      }
      return fn2;
  }
  const p = fn();
  ```

#### 25.  new关键字

* 用于实例化一个对象。

  ```js
  const person = new Person();
  // 实际流程
  const obj = new Object(); // 创建空对象
  obj.__proto__ = Person.prototype; // 空对象的原型指向其构造函数的原型对象
  let result = Person.call(obj); // 空对象this作为构造函数的上下文
  let person = typeof result === 'object' ? result : obj ; // 判断返回值类型（构造函数返回值为对象，普通函数返回值为undefined）
  // 如果返回值类型为基本数据类型则返回值对象、若为引用数据类型则返回引用对象。
  ```

* `let obj1 = Object.create(null) `和 `let obj2 = {}`区别：`obj1`为纯净对象，没有原型链，而`obj2`默认具有原型链指向Object。

#### 26.  事件委托

* 事件执行分为事件捕获和事件冒泡阶段，通常情况下事件是在事件冒泡阶段执行的，
* 事件委托是利用事件冒泡，只设置一个事件，管理所有同一类型的事件。（利用`e.target`）
* 将子元素的事件委托给父元素通过`e.target`获取当前触发事件的元素。

* 优点：提高性能、减少事件的绑定、减少内存占用。

#### 27. jQuery入口函数的优点

* jquery的入口函数是匿名自执行函数

* 优点是自动执行、防止变量污染

  ```js
  (function(window){
      
  })(window)
  ```

#### 28. CSS权值

* !important > style行内样式 > ID选择器 > 伪类选择器 = 属性选择器 = 类名选择器 > 元素名选择器 > 通配符
* style：1000
* ID选择器：100
* 伪类、属性、类名：10
* 元素名：1
* 通配符：0

#### 29. 防抖和节流

* 防抖：用户触发事件过于频繁，只保留最后一件事操作。

  ```js
  function debounce(fn, delay) {
      let timer = null
      return function() {
          if(timer) clearTimeout(timer)
          timer = setTimeout(()=> {
              fn.call(this)
          }, delay)
      }
  }
  ```

* 节流：控制高频事件的执行次数。执行完一次才能执行下一次。

  ```js
  function throttle(fn, delay) {
      let user = true
      return function() {
          if(user) {
              setTimeout(()=> {
                  user = true
                  fn.call(this)
              }, delay)
          }
          user = false
      }
  }
  ```

#### 30. Promise

* 为了避免使用回调函数产生的“回调地狱”的ES6新异步解决方法。
* 其有三种状态：pending（待定），fulfilled（已兑现），rejected（已拒绝）
* Promise内置resolve和reject函数。调用resolve为fufilled，调用reject为rejected。
* 具有all、race、resolve、reject等方法。
* 手写Promise：

  ```js
  class MyPromise {
      constructor(fn) {
          this.status = 'pending'
          this.result = undefined
          this.err = undefined
          this.resolveCallbacks = []
          this.rejectCallbacks = []
          try {
              fn(this.resolve.bind(this), this.reject.bind(this))
          } catch(err) {
              this.reject(err)
          }
      }
          resolve(result) {
              setTimeout(()=> {
                  if(this.status === 'pending') {
                      this.status === 'fulfilled'
                  	this.result = result
                      this.resolveCallbacks.forEach(cb => cb(this.result))
                  }
              })
          }
          reject(error) {
              setTimeout(()=> {
                  if(this.status === 'pending') {
                      this.status === 'rejected'
                      this.err = error
                  	this.rejectCallbacks.forEach(cb => cb(this.err))
                  }
              })
          }
          then(onFulfilled, onRejected) {
              return new MyPromise((resolve, reject) => {
                  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => {}
                  onRejected = typeof onRejected === 'function' ? onRejected : () => {}
                  if(this.status === 'pending') {
                      this.resolveCallbacks.push(() => {
                          let value = onFulfilled(this.result)
                          value instanceof MyPromise ? value.then(resolve, reject) : resolve(value)
                      })
                      this.rejectCallbacks.push(() => {
                          let value = onRejected(this.err) 
                          value instanceof MyPromise ? value.then(resolve, reject) : reject(value)
                      })
                  }
                  if(this.status === 'fulfilled') {
                       let value = onFulfilled(this.result)
                       value instanceof MyPromise ? value.then(resolve, reject) : resolve(value)
                  }
                  if(this.status === 'rejected') {
                       let value = onRejected(this.err)
                       value instanceof MyPromise ? value.then(resolve, reject) : reject(value)
                  }
            })
       }
  }
  ```

#### 31. async await

* ES7提出的用于提升Promise可读性的语法糖

* async：用于声明函数为异步函数，且**返回值为Promise**

* await：通常和async搭配使用，用于获取promise回调的值，且代码会等待不会继续向下执行，await之后代码变为微任务。

* 通常在多个promise执行时，不建议分别使用await，会使得一个回调结束后才去执行另一个回调。

  ```js
  async function fn() {
      const promiseA = await fetch('xxx1')
      const promiseB = await fetch('xxx2')
      // 使用Promise.all解决，使其并行
      const [promiseA, promiseB] = await Promise.all([fetch('xxx1'), fetch('xxx2')])
  }
  ```

* forEach不支持使用async和await。

#### 31-2. promise和async、await的区别

* promise是返回对象，必须使用then和catch进行处理。书写方式为链式，容易造成代码重叠，难以维护。而async和await是使用try、catch捕获异常。
* async await最大优点可以使代码强制同步，只要遇到await就会停止向下执行直到拿出结果。而promise.then会出现请求还没返回，就向下执行。

#### 32 事件循环 eventloop

* 由于JS单线程的机制，防止代码阻塞，将代码分为同步和异步。

* 同步代码：立即放入js引擎中执行，原地等待结果。
* 异步代码：先放入宿主环境(浏览器/Node)中，不必原地等待结果，不阻塞主线程继续执行，异步结果在将来执行。
* 同步代码先放入**执行栈**中，从前往后执行。**异步代码**先放**宿主环境**中，等待时机后放入**任务队列**中。执行栈执行完后去任务队列中检查，将任务队列中的异步任务放入执行栈中执行。执行栈执行完后还会回到任务队列中查找。反复循环过程就是事件循环。

#### 33. 宏任务 微任务

* 异步任务可分为宏任务和微任务。
* process.nextTick：在当前tick执行完毕后，下一个宏任务执行之前调用（可以看作最早执行的那个微任务）。
* setImmediate：在事件循环的下一次迭代时触发。

* **宏任务：**setTimeout、setInterval、DOM事件、AJAX请求、setImmdiate。

* **微任务：**Promise、Async、Await、process.nextTick**（Promise本身是同步的，但then和catch回调是异步的）** **位于await之后的代码会被划入微任务！**
* 微任务执行时机早于宏任务。（微任务>DOM渲染>宏任务）
* script标签相当于最大的宏任务。先执行最大的宏任务，然后进入寻找同步->微任务->宏任务。
* 异步代码在事件循环中先放在宿主环境中，等待时机后放入任务队列中。而宏任务和微任务分别放在不同的队列中。
* 执行栈中代码执行完毕后会先从微任务队列中寻找异步任务，等待所有的微任务执行完毕后再去宏任务队列中寻找异步代码执行。
* 执行顺序：同步代码->process.nextTick->微任务->宏任务->setImmediate

#### 34. render函数和template异同点

* 都被称为vue中的类编译器。render函数将template模板转化为真实的DOM元素。

* render函数中的**h**相当于原生JS中的createElement，用于创建真实元素。

  ```vue
  <script>
  	export default {
          props: {
              value: {
                  type: String,
                  default: '0'
              },
              text: {
                  type: String, 
                  default: 'normal'
              }
          },
          render(h) {
              return h('button', {
                  class: {
                      //相当于v-bind:class
                  },
                  //Dom属性
                  domProps: {
                      innerText: this.text || 'normal'
                  }
         			//on绑定方法：v-on
                  on: {}
              })
          }
      }
  </script>
  ```

#### 35. 数据劫持

* 访问或修改某个对象的值时，通过代码来拦截行为，进行额外的操作。
* Vue2是基于Object.defineProperty进行响应式处理的，通过watcher和属性数据的依赖关联，依赖项发生变化时（setter触发时）Dep提示wathcer变化，关联的组件重新渲染。
* Object.defineProperty不足：对于数组，（pop、push、unshift、shift、reverse、sort、splice）修改原数组的方法无法被setter监听到。对于对象，只能监听对象原有数据是否被修改，不能监听到对象是否新增或删除属性。
* vue3采取proxy数据代理，性能优于Object.defineProperty，Proxy可以监听到数组的变化和对象属性的新增和删除。

#### 36. 虚拟DOM&Diff算法

#### 37. 浏览器缓存

* 浏览器缓存是浏览器在本地磁盘对用户最近请求过的文档进行存储，当访问者再次访问同一页面时，浏览器就可以直接从本地磁盘加载文档。
* 浏览器缓存优点：① 减少冗余数据传输。② 减少服务器负担、提升网站性能。③ 加快客户端加载网页速度。
* **强制缓存：** 不会向服务器发送请求，直接从缓存中读取资源，请求返回**200**状态码。
* **强制缓存响应头参数：** 
  * Expires：HTTP/1.0控制网页缓存的字段，值为服务器返回请求结果缓存的到期时间。如果再次发起请求客户端时间小于该值则直接使用缓存结果。（如果客户端和服务端因为某些原因时间不准确发生误差，则强制缓存会直接失效）
  * Cache-Control：HTTP/1.1中控制缓存的字段规则。
    * max-age：缓存内容在设定值后失效。
    * -no-cache：不使用本地缓存，采取协商缓存，但是是否使用缓存则需要经过协商缓存来验证决定。
    * -no-store：禁止浏览器缓存数据，每次请求都会下载完整资源。
    * -public：可被所有用户缓存，包括终端用户和代理服务器。
    * -private：只能被终端用户的浏览器缓存。
  * Expires优先级比Cache-Control低，同时设置则Cache-Control生效。
* **协商缓存：** **在使用本地缓存前，向服务器发送请求。** 服务器根据请求的request header的参数判断是否命中协商缓存。若命中则返回**304**状态码并带上新的response hedaer通知浏览器从缓存中读取资源。**解决了强制缓存中，资源不更新的问题。**
  * **协商缓存响应头参数：** 设置Cache-Control为-no-cache后使用协商缓存。
    * Last-Modify / If-Modify-Since：Last-Modify记录了服务器响应请求时，该资源在服务器的最后修改时间。If-Modify-Since是客户端再次发起请求时，携带上次请求返回的Last-Modify值(即告诉服务器该资源上次请求返回的最后修改时间)。服务器收到请求后，根据字段值和最后修改时间对比，若最后修改时间大于If-Modify-Since值，则重新返回资源且状态码为200，如若小于则返回304状态码，代表无资源更新，重新使用强制缓存读取缓存。
    * Etag / If-None-Match：ETag是通过算法生成的资源文件的hash值。If-None-Match是客户端再次发起请求后会携带上次请求携带的ETag到服务器，服务器进行ETage的对比，若相同则命中缓存返回304资源无更新，若不同则返回200和新资源。
  * ETag优于Last-Modify，Last-Modify单位是秒，若在一秒内被多次修改则Last-Modify体现不出，但ETag每次改变都会保留精度。
  * ETag在性能上劣于Last-Modify，ETage需要通过服务器进行计算，Last-Modify只需要保存时间。
  * 服务器校验优先考虑ETag，且ETag优先级高于Last-Modify。
* 两者都是从客户端读取资源，强制缓存不会发请求，协商缓存会发送请求。

<img src="https://img-blog.csdnimg.cn/20210328152529389.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5OTAzNTY3,size_16,color_FFFFFF,t_70" alt="img" style="zoom:80%;" />

#### 38. xss攻击

* 即Cross Site Script 跨站脚本攻击。
* 分为DOM攻击、反射攻击、存储攻击
  * **DOM攻击：**用户在客户端输入的数据包含恶意脚本，且未做相应过滤处理。攻击者寻找代码中可以操作的元素(document.write、innerHTML)进行相应变化，
  * **反射攻击：**攻击者发送被攻击者链接，被攻击者访问链接会向攻击者的目标服务器发起请求，返回相应的script代码，并在浏览器执行造成用户被攻击。
  * **存储攻击：**持久性攻击方式，攻击的代码会提交到服务器的数据中保存。例如评论系统存入攻击者的js脚本代码，在用户进行访问后即会被执行。
* 预防方法：
  * 对输入源进行安全编码。
  * 改为纯前端渲染，将代码和数据分开。
  * 对HTML进行转义，将`&、<>、"、'`使用插件进行转义。

#### 39. CSRF攻击

* 即Cross-Site Request Forgery 跨站请求伪造
* 利用cookie的登录态和跨域伪造请求。
* 预防方法：
  * 验证HTTP请求的Refer字段。
  * cookie双重验证。
  * 利用token替代cookie。

#### 40. 对称加密和非对称加密

* 对称加密：即单密钥加密，优点：算法公开、计算量小、解密速度快，适用于数量大的数据。缺点：密钥管理和分配存在风险。
* 非对称加密：加密过程使用密钥对（公钥和私钥），公钥人人可见、私钥自己保管不外泄。一个用来加密、另一个用来解密。优点：安全性高。缺点：加密解密时间长，速度慢，需要更多计算资源只适用于少量数据加密。

#### 41. HTTP和HTTPS

* http协议传输数据都是未加密的，即明文。所以产生了SSL证书用于加密http传输的数据，即https。
* http是明文传输的超文本传输协议。https是具有安全性的ssl加密传输协议。
* http端口是80、https端口是443。

#### 42. 状态码

* **1XX：信息性**  表示临时响应，即请求还在进行中。
  * 100：继续
  * 101：切换协议
* **2XX：成功接受了客户端请求**
  * 200：成功，客户端请求已成功。
  * 201：创建成功。
  * 204：无内容，服务器成功处理但没有内容返回。
* **3XX：重定向**
  * 301：资源永久移动，URL已更新。
  * 302：资源临时移动。
  * 304：资源未修改，继续使用本地缓存。
* **4XX客户端错误：**
  * 400：语法错误。
  * 401：身份认证失败。
  * 403：请求拒绝，无权限访问。
  * 404：找不到资源。
  * 409：冲突，请求间发生冲突。
* **5XX：服务器错误：**
  * 500：服务器内部错误。
  * 502：服务器网关错误，上游服务器收到无效响应。
  * 503：服务器超载或维护。
  * 504：网关超时。
  * 505：服务器不支持请求的HTTP版本。

#### 43. CSS中可以被继承的属性

* 字体属性：font、font-size、color
* 文本属性：line-height、text-align
* 元素可见性：visibility：hidden
* 表格布局属性：border-spacing
* 列表属性：list-type

#### 44. 内存泄漏

* JS中已分配地址的对象，由于长时间没有释放或者无法清除，造成长期占用。内部大幅占用，导致运行缓慢，甚至崩溃。
* 导致因素：未清空的定时器、过度使用闭包、未声明就直接赋值的变量。

#### 45. 基本数据类型&引用数据类型

* 基本数据类型保存在栈内存中，保存的是具体值。
* 引用数据类型保存在堆内存中，保存的是引用数据类型的地址。

#### 46. JS继承

* 原型链继承：子类通过原型链链接父类。

  * 优点：子类通过原型链链接父类，共享父类的属性和方法。
  * 缺点：子类无法向父类构造函数传参。

  ```js
  function Father() {
      this.info = {
          name: 'Admin',
          age:18
      }
  }
  Father.prototype.sayInfo = function() {
      console.log(this.info)
  }
  function Child() {}
  Child.prototype = new Father() // 原型链绑定
  new Child().sayInfo() // 调用父类方法输出属性
  ```

* 借用构造函数继承：子类通过改变自身this执行借用父类构造函数。

  * 优点：解决了原型链实现继承不能传参的问题。

  * 缺点：借用构造函数方法都在父类中定义、无法实现复用。且父类定义在原型上的方法，子类无法访问。

    ```js
    function Father(name, age) {
        this.name = name
        this.age = age
    }
    function Son(name, age) {
        Father.apply(this, [name, age])
    }
    console.log(new Son('Admin', 20)) // {name:'Admin', age: 20}
    ```

* 组合继承：原型链和借用构造函数组合在一起进行继承。

  * 优点：解决了分别使用原型链继承和借用构造函数继承的问题。

  * 缺点：无论什么情况下都会调用两次父类构造函数：创建子类原型和在子类构造函数内部。

    ```js
    function Father(name, age) {
        this.name = name
        this.age = age
    }
    Father.prototype.says = function() {
        console.log(this.name, this.age)
    }
    function Son(name, age) {
        Father.apply(this, [name, age])
    }
    Son.prototype = new Father()
    new Son('Admin', 18).says() // 输出Admin,18
    ```

* 使用ES6的Class实现继承：子类extends继承父类并调用super方法（子类必须先调用super才具有自身的this，因为子类的this对象是继承于父类的this对象）

  * 缺点：浏览器兼容问题

    ```js
    class Father {
        constructor(name, age) {
            this.name = name
            this.age = age
        }
        says() {
            console.log(this.name, this.age)
        }
    }
    class Son extends Father {
        constructor(name, age, gender) {
            super(name, age)
            this.gender = gender
        }
    }
    new Son('Admin', 18, 'man').says()
    ```

#### 47. 杂题

* setTimeout最小执行时间是4ms、setInterval最小执行时间是10ms
* 高度塌陷和上边距重叠：
* 外边距塌陷：仅发生在垂直方向。块级元素不会发生外边距塌陷。
  * 外边距计算：正数和正数情况取最大的值，负数和负数取绝对值最大的值。
* 

#### 48. Ajax

* 在不重新加载整个网页的前提下，与服务器交换数据并更新部分内容。

* 通过XMLHttpRequest向服务器发送异步请求，拿到数据后同通过JS更新。

* 过程：

  * 创建XMLHttpRequest对象，xhr。

  * 通过xhr中的open方法和服务器建立连接。**open（请求方法，URL，是否异步）**

  * 构建请求所需的数据，通过xhr的send方法发送给服务器。

  * 通过xhr的onreadystatechange事件监听服务器和客户端的通信状态。

    * readyState属性值：
      * 0：代理被创建，未调用open
      * 1：open方法已调用
      * 2：send方法已调用
      * 3：下载中，部分数据已获取
      * 4：下载操作已完成

  * 接受处理服务器的数据并更新页面。

    ```js
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'url', true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //成功
                console.log(xhr.response);
            }
        }
    }
    xhr.send(null)
    ```

* promise封装Ajax：

  ```js
  function promiseAjax() {
      let promise = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.open('get', 'url', true)
          xhr.onreadystatechange = () => {
              if(xhr.readyState === 4) {
                  if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                      resolve(xhr.response)
                  } else {
                      reject(new Error(xhr.statusText))
                  }
              }
          }
          xhr.send(null)
      })
      return promise
  }
  promiseAjax.then(result => {}).catch(err => throw err)
  ```

* **get**和**post**的区别：

  * get一般用于获取数据、post一般用于提交数据。
  * get参数是以查询字符串放置在url上，故安全性较差。
  * post参数是放置于body中，且数据长度无限制。
  * get请求刷新服务器或退回是无影响的，而post退回会重新提交数据。
  * get请求会被保存在浏览器历史记录中，而post则不会。

#### 49. 浏览器渲染页面过程

* 渲染引擎通过网络获得请求文档的内容。

* 解析HTML文件，构建DOM Tree。

* 解析CSS，构建CSSOM Tree。

* 将 DOM Tree 和 CSSOM Tree合并，构建Render tree(渲染树)

* 进行重排：根据Render Tree进行节点信息计算。

* 进行重绘：根据计算好的信息绘制页面。

* JS的加载可能会引起阻塞页面渲染，在尚未构建好CSSOM时JS不能执行。

  ![image-20230412095107622](C:\Users\LWH\AppData\Roaming\Typora\typora-user-images\image-20230412095107622.png)

#### 50. DOM树和渲染树区别

* DOM树与HTML标签一一对应，包括head和隐藏元素。
* 渲染树render tree不包含head和隐藏元素。
* DOM树和CSSOM合并生成渲染树。

#### 51. 精灵图&Base64&svg

* 精灵图：将多张小图整合在一张大图上，利用background-position进行显示。减少图片请求、提高加载速度。
* Base64：将图片以二进制编码形式使用，base64会和html、css一起下载到浏览器中可以减少请求和跨域问题。但体积如果大于原图片大小，则不利于css加载。

* svg：基于XML的图像格式，体积小且不会失真，本质是文本文件。可以被DOM和js操作。

#### 52. JWT

* JSON Web Token：通过JSON形式作为在web中的令牌，可以在各方之间安全的把信息作为JSON对象传输、授权等。
* 认证流程：
  * 前端发送账号密码给后端。
  * 后端核对账号密码成功后，将一些用户信息作为JWT负载，把它和头部分别进行base64编码后拼接成签名，形成token。
  * 前端每次请求都携带这个token，放在HTTP请求头的Authorization字段内。
  * 后端检查是否存在Authorization，如果存在就验证JWT有效性（是否正确，是否过期）成功后获取token中信息进行操作。

* 优点：简洁、Token是以JSON加密的形式保存在客户端，原则上任何web形式都支持。

#### 53. npm

* node package manager：node的包管理和分发工具。是node模块的标准，是JS的运行环境。
* 组成：网站、注册表、命令行工具

#### 54. HTTP协议的协议头和请求头

* 请求头信息：浏览器->服务器
  * Accept：支持的数据类型
  * Host：要访问的主机
  * Referer：请求的来源（防盗链）
  * User-Agent：浏览器类型、版本信息
  * Date：访问时间
  * Connection：连接方式
  * Cookie
  * X-Request-With：请求方式
* 响应头信息：服务器->浏览器
  * Location：转发信息
  * Server：服务器类型
  * Content-Type：返回数据类型。
  * Refresh：控制的定时刷新。

#### 55. Token无感刷新

* 在响应拦截器中拦截，判断token过期后，调用刷新token接口。
* 使用双Token进行无感刷新，access_token和refresh_token。
  * 登录成功保存access_token和refresh_token。
  * 当access_token过期时，自动发送refresh_token到刷新token的请求中刷新。
  * 得到新token后，重新发送刚刚未完成的请求，实现无感刷新。
  * 若refresh_token过期，则清除所有token，返回登陆页面。
  * **（实现无感，用户请求必须保留。得到新token后必须重新请求。当同时出现多个请求时，可能会导致请求刷新多次token，需要设置标志判断是否正在请求刷新token且设置队列存储请求方法。）**

#### 56. 大文件上传

* 分片上传：把需要上传的文件按一定规则分成相同大小的数据块并给各个数据块定义唯一标识。按照一定规则将各个数据块上传。发送完成后，服务端判断上传的完整性。如果完整则合并成原始文件。
* 断点续传：① 服务器端返回，告知在哪里开始。② 浏览器端自行处理。

#### 57. H5C3

* 语义化：编写HTML结构使用语义化标签，增强页面的可读性，利于维护，增强SEO。
* 新特性：
  * H5：语义化标签、新增音频视频标签、webStorage、canvas、表单控件(email、search等)。
  * C3：新增选择器，@media、flex布局、文字阴影、盒子模型、linear-gradient、自定义动画、2D和3D。
* **rem适配：**
  * 移动端适配方案，相对于根元素的font-size属性计算大小，搭配flexable.js使用。
  * rem计算：1rem = font-size * 1 
* **移动端兼容：**
  * 禁止移动端选择文字`-webkit-user-select:none`
  * 设置`overflow:scroll/auto`在IOS下滑动卡顿使用·`-webkit-overflow-scrolling:touch`

#### 58. Vue杂题

* **v-if和v-show区别：**

  都可以控制元素的显示和隐藏

  * v-show控制元素的display来控制隐藏，v-if直接将DOM元素添加或删除。
  * v-if有局部编译/卸载的过程，切换过程中会销毁重建内部的事件监听和子组件。
  * v-show变化不会触发组件的生命周期，而v-if会。
  * v-if切换效率低，v-show切换效率高。

* **MVVM：**
  * 即Model-View-ViewModel的缩写，是vue开发的架构模式。
  * M：模型，对应的是data数据。
  * V：视图，对应用户界面，即DOM。
  * VM：视图模型，是Vue的实例对象，连接View和Model的桥梁。
  * 核心是VM提供了View和Model的双向数据绑定，数据改变VM能监听到变化，自动更新视图。当用户操作视图时，VM也能监听到视图变化从而去通知更新数据。

* **v-for中key值作用：**
  * key属性是DOM元素的唯一标识。
  * 为了提高虚拟DOM更新的效率，key值相同不变化，不同则重绘更新。
  * 不设置key值，触发更新会有问题，表格的不同行更新。
  * 为了触发过渡效果。
* **在created和mounted中请求数据区别：**
  * created：渲染前调用，通常先初始化页面，然后再渲染。
  * mounted：模板渲染完成后，一般是初始化完成后。对元素节点进行操作。
  * 在mounted中去数据可能会出现闪屏问题。
  * 如果请求的数据对DOM有影响，则使用created。
  * 如果请求的数据对DOM无影响，则可以使用mounted。
* **vue中的修饰符：**
  * 事件修饰符：
    * .stop：阻止冒泡。
    * .prevent：阻止默认行为。
    * .capture：内部元素触发事件先处理。
    * .self：只有在event.target是当前元素时触发。
    * .once：事件只会触发一次。
    * .passive：立即触发默认行为。
    * .native：将当前元素作为原生标签处理。
  * 按键修饰符：
    * .keyup：键盘抬起
    * .keydown：键盘按下
  * 系统修饰符：
    * .ctrl .alt .meta
  * 表单修饰符：
    * .lazy：等待失去焦点后再显示
    * .trim：删除首位空格。
    * .number：输入是数字或者转化为数字。
  * 鼠标修饰符：
    * .left、.right、.middle
* **elementUI表单验证：**
  * 表单内加入rules属性，在data中写入规则。
  * 内部添加rules，行内写入规则。
  * 自定义表单校验，在script中自定义methods写入规则。
  
* **keep-alive：**

  * vue的内置组件，包裹组件时会缓存不活跃的组件实例，不会去销毁他们。
  * 将组件切换的状态保存在内存里，防止重复渲染DOM节点，减少加载时间和性能消耗，提高用户体验。

* **watch和computed的区别：**

  * watch是监听data中数据的变化，computed是计算属性。
  * computed支持缓存，只有依赖的属性发生变化才会重新计算。watch不支持缓存。
  * computed不支持异步，watch支持异步。
  * computed在第一次加载后就会计算，watch不会。
  * computed函数中必须有return，watch不用。


#### 59. Vue2生命周期

* 创建
  * beforeCreat：属性和方法都不能调用
  * created：此时实例创建完成，完成了数据监测，可以使用数据修改数据。不会触发updated，不更新视图。
* 挂载
  * beforeMount：完成了模板的编译，虚拟DOM也完成创建，即将渲染，同样修改数据不会触发updated。
  * mounted：将编译好的模板改在到页面，可以发送异步请求也能访问DOM节点，
* 更新
  * beforeUpdate：组件数据更新前调用，数据是新的，页面数据是旧的，页面即将更新，准备渲染。
  * updated：render重新渲染，数据和页面都是新的，避免在此更新数据。
* 销毁
  * beforeDestory：实例销毁前，实例此时还能被访问，进行方法的销毁。
  * destoryed：组件已经被销毁。
* 使用keep-alive时的生命周期
  * activited：组件激活时
  * deactivited：组件销毁时

#### 60. Vue3生命周期

* 选项式API下，与Vue2基本一致。
* 组合式API下，移除了beforeCreate和created，改变为setup。
* 其他生命周期钩子前加on、destoryed和beforeDestory变为beforeUnmount金额onUnmounted。

#### 61. Vue组件间通信

* 父传子：

  * props ：vue2：`props:['属性名']` vue3：`const props = defineProps({属性名：类型})`
  * $ref：父组件通过$ref调用子组件实例上的方法来获取信息。

* 子传父：

  * $emit：子组件绑定自定义事件，通过事件执行向父组件传值，父组件进行事件监听。 vue2：`this.$emit('事件名', 值)` vue3：`const emit = defineEmits(['事件名'])`

* 兄弟传：利用`VueComponent.prototype.__proto__ === Vue.prototype`

  * 全局事件总线：$bus

    ```js
    // main.js
    const app = new Vue({
        el: '#app',
        render: h => h(App),
        beforeCreate() {
            Vue.prototype.$bus = this
        }
    })
    ```

  * 子组件绑定事件和触发时机：$on和$emit

    ```vue
    <script>
    // 接收数据的一方
    export default {
        name: 'Send',
        data() {
            return {}
        },
        mounted() {
            this.$bus.$on('事件名', (data) => {})
        },
        beforeDestory() {
            this.$bus.$off('事件名')
        }
    }
    </script>
    
    <script>
    // 传输数据一方
    export default {
        name: 'Receive',
        data() {
            return {}
        },
        methods: {
            sendData() {
                this.$bus.$emit('事件名', '传输数据')
            }
        }
    }
    </script>
    ```

* vuex/pinia

#### 61. Axios封装

```js
import axios from 'axios'

const $axios = axios.create({
    baseURL: '',
    timeout: 3000
})
//或者设置 axios.defaults.baseURL/timeout 含义相同

$axios.interceptors.request.use(config => {
    return config
}, err => {
    Promise.reject(err)
})

$axios.interceptors.response.use(res => {
    return Promise.resolve(res)
}, err => {
    Promise.reject(err)
})

export default $axios
```

#### 62. VueRouter

* **Vue路由传参：**

  * params传参：
    * `this.$router.push({name: 'Admin', params: {id: 1}})`
    * 通过`this.$route.params.id`获取值
  * 路由属性传参：
    * `this.$router.push({name:'/index/${item.id'}})`
    * 通过路由配置`{path: '/index/id'}`获取
  * query传参：
    * `this.$router.push({name: 'index', query:{id: item.id}})`
  * query传参可以解决页面刷新数据丢失的问题。

* **Hash模式和History模式区别：**

  * hash模式的路由地址会拼接#号。
  * 在回车刷新时，hash模式会加载对应页面，history会报错。
  * hash模式支持低版本浏览器，history不支持（因为是H5新增的API）
  * hash不会重新加载页面，单页面应用常用。
  * history有历史记录，H5新增的pushState和replaceState去修改历史记录。
  * history需要后台配置。nodejs导入`connect-history-api-fallback`中间件。

* **路由拦截：**

  * 通过vue-router的beforeEach方法进行每一次路由的拦截，判断拦截信息中是否有鉴权邀请或权限校验，实现鉴权。在路由的meta源信息中配置。

    ```js
    const routes = [
        {
            name: 'index',
            path: '/index',
    		component: Index,
    		meta: {
                requirtAuth: true
            }
        }
    ]
    
    router.beforeEach((to, from, next) => {
        if(to.meta.requirtAuth) {
            if(store.state.token) {
                next()
            } else {}
        }
    })
    ```

* **动态路由：**

  * 在路由内配置meta属性，扩展权限相关的字段。
  * 在路由导航守卫里，通过判断权限标识，实现路由的动态增加和跳转。
  * meta内配置role角色数组，根据用户登陆的账号、返回用户角色。前端根据角色和路由表meta.role匹配，形成可访问的路由。

* **解决刷新后二次加载路由**：

  * window.location.reload() 可能会造成闪屏

  * matcher：

    ```js
    const router = createRouter()
    export function resetRouter() {
        const newRouter = createRouter()
        router.matcher = newRouter.matcher
    }
    ```

#### 62. Vuex

* 分为state、getters、mutations、actions、modules。
  * state：存储数据
  * getters：state的计算属性
  * mutations：提高更新数据的方法。
  * actions：提交mutations修改数据，支持异步。
  * modules：模块化vuex

* vuex刷新丢失数据处理：
  * 将数据存在浏览器本地存储（cookie、webStorage）
  * 页面刷新，再次请求数据，达到动态更新的方法。
* vue中可以直接触发methods中的方法，vuex不行。vuex通过dispatch来访问actions中的方法，actions中的commit触发mutations中的方法，从而修改state的值，最后通过getter更新视图。
* Vue.use(vuex)，调用install方法，通过applyMixin(vue)在任意组件内执行this.$store就可以访问到store对象。

#### 63. diff算法和虚拟DOM

* **虚拟DOM：**即JS对象，相当于真实DOM的抽象。
  * 代码初次运行，生命周期到create和beforeMount之间时，会编译template模板为render函数，render函数执行时调用h函数，h函数内部调用vnode生成虚拟DOM。
  * 当数据再次发生变化时，会重新执行render函数，生成新虚拟DOM，新旧虚拟DOM对比，修改真实DOM结构。
  * **作用：**虚拟DOM提供了跟踪当前DOM状态的途径，它会根据当前数据生成一个描述当前DOM结构的虚拟DOM，数据变化时又会去生成一个新的虚拟DOM，前后生成的两个虚拟DOM保存了变化前后的状态，再根据diff算法计算出前后的差异，得出更新的最优解。
* **diff算法：**即比较新旧虚拟DOM之间的对比算法。
  * diff算法对比只会在同层级间进行比较，不会跨层级比较。内部使用patch函数进行不同处的存储，根据存储信息进行更新真实DOM。diff算法采取先序深度优先遍历进行节点比较。
  * **步骤：**
    * 比较新旧DOM树，对根节点执行patch(oldVnode, newVnode)函数，若不同则直接替换。（patch函数相当于diff算法的入口）
    * 若相同则对两个节点执行patchVnode(oldVnode, newVnode)，比较属性、文本以及子节点。当同时存在子节点时，且oldVnode === newVnode为false时，执行updateChildren函数，进一步比较子节点。
    * 比较子节点，分别有两对指针oldStart、oldEnd、newStart、newEnd。如果oldStart === newStart、oldStart === newEnd， oldEnd === newStart、oldEnd === newEnd中有任何一种匹配，就会执行patchVnode进一步比较。
    * 当oldStart>oldEnd或newStart>newEnd则表示匹配结束。多余元素删除，新增元素新增。
    * 若都不匹配，则查找key是否存在。若存在key可以直接找到节点原来所在位置。没有找到位置则新增节点，找到就移动节点位置。若没有key则不会去寻找位置，直接创建新节点，导致该节点下的所有节点都去新增，损耗性能。
  * diff算法即**patch->patchVnode->updateChildren->patchVnode->update Children->patchVnode...**循环的过程。

#### 64. SPA

* 即单页应用，通过动态重写当前页面与用户进行交互，避免了页面直接切换打断用户体验。
* 优点：① 具有良好的可移植性，即时性。② 用户体验好，不需要重新加载页面。③ 良好的前后端，分工明确。
* 缺点：① 不利于搜索引擎抓取SEO。② 首次渲染速度过慢。

#### 65. Vue2中data为什么是函数

* 如果data是函数，**每复用一次组件，就会返回一份新的data**（类似于给每个组件实例创建一个私有数据空间，让各个组件实例维护各自的数据）
* 如果组件中data是一个对象，则子组件中的data属性值会互相污染，产生副作用。（由于Object是引用数据类型，保存的是内存地址，故所有组件都会共用同一份data）所以必须用函数返回，利用函数的作用域，组件就可以维护各自的data。

#### 66. 封装组件

* 步骤：
  * Vue.extend创建一个组件。
  * Vue.components注册一个组件。
  * 如果子组件需要数据，则在子组件的props中接收定义。
  * 子组件修改数据，传递给父组件，使用emit方法。
* 原则：
  * 功能细化拆分。
  * 尽量使组件原子化，一个组件只做一件事。
  * 容器组件管数据，展示组件管视图。

#### 67. Vue强制刷新

* location.reload()

* this.$router.go(0)

* provide和inject：

  ```vue
  <template>
  	<router-view v-if="isRouterAlive"></router-view>
  </template>
  <script setup>
  	const isRouterAlive = ref(false)
      const reload = () => {
          isRouterAlive.value = false
          nextTick(() => {
              isRouterAlive.value = true
          })
      }
      provide("reload", reload)
  </script>
  
  //子组件中调用
  <template>
  	<button @click="clickFn"></button>
  </template>
  <script setup>
      const fn = inject("reload")
      const clickFn = () => {fn()}
  </script>
  ```

* inject/provide刷新页面相对于其他刷新方法，不会使页面白屏，增强用户交互感。

#### 68. 性能优化

* 编码优化：
  * v-for绑定事件使用事件委托。
  * keep-alive缓存组件。
  * 尽可能拆分组件，提高复用性、维护性。
  * key值保证唯一，便于diff算法查找。
  * 合理使用路由懒加载、异步操作。防抖节流等。
* 加载优化
  * 按需加载
  * 懒加载
* 用户体验
  * 骨架屏
* SEO优化
  * 预渲染
  * 服务端渲染SSR
* 打包优化
  * CDN加载第三方模块
  * 多线程打包
  * 抽离公共文件
* 缓存和压缩
  * 客户端缓存、服务端缓存
  * 服务端GZIP压缩

#### 69. 首屏优化

* 路由懒加载
* 非首屏的组件使用异步组件
* 首屏不重要的组件延迟加载

* 静态资源放在CDN上
* 减少首屏JS、CSS等资源文件的大小
* 使用服务端渲染
* 尽量减少DOM的数量和层级
* 使用精灵图
* 开启GZIP压缩
* 图片懒加载

#### 70. SEO优化

* 使用SSR服务端渲染，例如nuxt.js
* 使用预渲染：prerender-spa-plugin

#### 71. Webpack

* webpack打包和不打包的区别：
  * 运行效率提升
  * webpack的语法转化，版本降级等。
* webpack会将js、css、image看作一个模块，用import/require引入。找到入口文件找到关联的依赖文件，打包在一起。webpack将bundle文件拆分成多个小的文件，异步按需加载所需文件。

#### 72. Git

* git remote add origin 仓库地址
* git pull 拉取、git push 上传、git status 查看状态
* git add . 提交到本地缓存区、git commit -m “描述信息”  提交到本地仓库
* git branch -b xxx 创建分支
* git merge '合并分支名' 合并分支
* git冲突问题解决：
  * 两个分支修改了同一个文件
    * 当前分支上直接修改代码，add、commit
  * 两个分支修改了同一个文件的名称
    * 在本地当前分支上，修改冲突代码，add、commit、push

#### 73. websocket

* 基于TCP的H5新协议、实现了浏览器和服务器全双工通信，是持久化协议。

* 特点：
  * 与http协议具有良好的兼容性。

  * 建立在TCP协议之上。

  * 数据格式轻量、与http协议都属于应用层。

  * 可以发送文本，也可以发送二进制。

  * 没有同源限制、能与任意服务器通信。

* websocket和http：
  * 相同：都是基于TCP的，都是可靠性传输协议。都是应用层协议。
  * 不同：
    * WebSocket是双向通信协议，双向发送或接收信息。
    * WebSocket是长连接，只需要一次请求来初始化连接，所有请求和响应都通过TCP连接通信。
    * HTTP是单向的，且是短链接，每次请求之后都会关闭连接。
    * WebSocket需要浏览器和服务器通过握手建立连接。
    * Http是浏览器向服务器发起的连接，服务器预先不知道这个连接。

#### 74. Node.js

* **一等函数：**一个函数可以被作为变量对待传递给另一个函数（回调）或者一个函数可以返回另一个函数（高阶函数）eg：map()、filter()
* **Nodejs工作机制：**使用JS作为脚本语言运行在Chrome的V8引擎。基于事件驱动的架构，I/O异步运行，使其轻量且高效。
* **Nodejs如何克服I/O阻塞的问题：**Nodejs拥有事件循环机制，应用于异步处理所有I/O操作，而不会去阻塞main函数。如果有多个IO调用，则每个调用都会相应的排队，分别执行。
* **Nodejs中的事件循环：**事件循环使用队列和侦听器进行管理。当需要执行异步函数（或I/O）时，主线程将其发送到不同的线程，从而允许V8继续执行主代码。
* **非阻塞：**即一段代码，被安排到事件循环的下一次迭代中运行，从而解除了其余代码的阻塞，让他继续运行。
* **Nodejs是多线程吗：**一个Nodejs进程在单线程中运行，可以使用`child_process`模块来并行运行多个进程，或者使用`Worker`来运行多个线程。

#### 75. 组件透传

* 指传递给一个组件数据或方法，但该组件没有使用props或emits显式声明。例如`class、style、id`

* 组件透传为子组件提供了不需要显式声明属性或方法的条件，即只需要声明其默认参数，对其他参数或方法使用`v-bind:$attrs`和`v-on:$listeners`传入，并在子组件使用**inheritAttrs：false**声明（即禁止属性继承）。

* 在vue3中若使用setup语法糖，可以通过**useAttrs()**访问透传的属性。

* 若不使用setup语法糖，则在setup函数内部接收attrs参数**（ctx上下文包含了attrs、slots、emit、expose等属性）**

  ```js
  export default {
  	setup(props, ctx) {
          console.log(ctx.attrs) //即透传的属性
      }
  }
  ```

#### 76. 父子组件生命周期

* **加载顺序：**
  * 父beforeCreate -> 父created -> 父beforeMounted -> 子beforeCreate -> 子created -> 子beforeMounted -> 子mounted -> 父mounted
* **更新顺序：**
  * 父组件更新：父beforeUpdate -> 父updated
  * 子组件更新：父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
* **销毁顺序：**父beforeDestory -> 子beforeDestory -> 子destoryed -> 父destoryed

#### 77 .native和.sync

* .native即在组件的根元素上监听一个原生事件。

* .sync即对一个prop进行双向绑定。

  * 传统上prop不允许在子组件中修改，因为子组件修改父组件会造成无法找到变更来源。一般通过父组件传函数给子组件，子组件通过操作传入函数来改变父组件的值。

  * 使用sync简化了父组件传函数子组件修改父组件值的写法。

    ```vue
    <!-- 父组件给子组件传值 -->
    <child :num.sync="numParent" ></child>
    
    <script>
    // 子组件调用函数update:属性名修改
    export default {
        methods: {
            changeNum() {
                this.$emit('update:num', 666)
            }
        }
    }
    </script>
    ```

#### 78. 进程和线程

* 进程描述了CPU在运行指令及加载和保存上下文所需的时间，放在应用上来说即代表了一个程序。
* 线程是进程中的更小单位，描述了执行一段指令所需时间。
* **进程是资源分配的最小单位，线程是CPU调度的最小单位。**

#### 79. 并行和并发

* 并行：即同时发生两个并发事件，即多个处理器或者是多核的处理器同时处理多个不同的任务。
* 并发：在同一个CPU上同时（不是真正的同时，CPU在多个和程序间切换）运行多个程序。即一个处理器同时处理多个任务。

#### 80. 从输入url到页面完成加载发生了什么

* DNS解析：将域名解析成IP地址
  * 浏览器输入URL后，首先要经过域名解析，浏览器通过向DNS服务器发送域名，DNS查询到与域名对应的IP地址返回给浏览器。
* TCP连接：TCP三次握手
  * 在客户端发送数据前，会发起TCP三次握手用于同步客户端和服务端的序列号和确认号。
  * ① 客户端发起请求建立连接。② 服务端收到请求发送已收到的应答。 ③ 客户端收到服务端的应答再次发送请求至服务端表示成功建立连接。
  * 三次握手的原因：假设不采用三次握手，如果客户端第一次发送建立连接的请求因为某些原因滞留，客户端超时会再次发送建立连接的请求，这时两次请求都会到达服务端，服务端就会多建立一次请求，浪费资源。所以必须是三次握手，客户端需要多进行一次服务端收到请求的确认。
* 发送HTTP请求
  * TCP三次握手后，开始发送HTTP请求报文至服务器。
* 服务器处理请求并返回HTTP报文
* 浏览器解析渲染页面
  * 根据HTML文件解析出DOM Tree
  * 根据CSS文件解析出CSSOM Tree
  * 将DOM Tree 和 CSSOM Tree和并，构建Render树。
  * 根据Render Tree进行节点信息计算，即重排（回流）
  * 根据计算好的信息进行页面绘制，即重绘。
* 连接结束：TCP四次挥手
  * 数据传输完毕，断开TCP连接，即四次挥手。
  * ① 客户端向服务端发报文，表示没有数据可以传输。② 服务端向客户端发送报文，表示同意关闭请求。③ 服务端向客户端发报文，请求关闭连接。④ 客户端向服务端发送报文表示接收完服务端的响应报文，进行关闭。
