---
title: Vue2
date: 2022-12-19
tags:
- Vue
categories:
- Frame
sidebar: auto
---

:::tip
Vue---具有跨时代意义的渐进式Javascript框架，衍生产品Vuex、VueRouter、VUE-CLI。
其特点有：采用组件化编码、提高代码复用率。声明式编码、无需直接操作DOM。采用虚拟DOM和diff算法，尽量复用DOM节点。
:::

## Vue2入门
### 基础知识
* 使用Vue，必须先创建实例，并传入实例对象。
* 容器内代码仍符合HTML语法规范。
* 容器内代码被称为Vue模板。
```JavaScript
<!-- 准备容器 -->
    <div id="root">
        <h1>Hello {{name}}</h1>
    </div>

    <script>
        Vue.config.productionTip = false;
        // 阻止Vue在启动时生成生产提示

        // 创建Vue实例
        new Vue({
            el: '#root', // el用于指定当前Vue实例为哪个容器服务。值通常为css选择器字符串
            data: {
                // data中用于存储数据。数据供 el所指定的容器去使用
                name: 'LWH',
            }
        })
    </script>
```
:::tip
**注意:**</br>
* 一个Vue实例只能对应一个页面容器。
* {{xxx}}中的xxx为js表达式，且xxx会自动读取data中的所有属性。
* 一旦data中数据发生改变，则页面中的模板中的数据也会随之变化。
:::

### 插值语法
**用于解析标签体内容，{{xxx}}中xxx会作为JavaScript表达式进行解析。**

### 指令语法
`v-bind`**用于解析标签属性及内容，绑定事件。**
`v-bind`可简写为`:`<br/>
例如：`v-bind:href="xxx"`此时xxx会作为表达式被解析。

### 数据绑定
#### 单向绑定 `v-bind`：数据只能从data流向页面。
#### 双向绑定 `v-model`：数据不仅能从data流向页面，还能从页面流向data。
:::tip
**说明:**</br>
* 双向绑定一般用于和用户进行交互的表单类元素上（input、select）
* `v-model:value`可简写为`v-model`，v-model默认收集value属性。
:::

### el和data属性的两种写法
* **el：① 在配置对象内直接el声明。 ② 创建Vue实例后，利用$mount()方法声明对象。**
* **data：① 在配置对象内以对象形式赋值。 ② 函数式返回对象值。**<br/>
`只要是Vue管理的函数，均不能使用箭头函数。this导向会发生改变！`
```javascript
        // el的两种写法：
        const v = new Vue({
            // el:'#root', 第一种
            data: {
                name: 'LWH'
            }
        })

        setTimeout(() => {
            v.$mount('#root'); // 第二种
        }, 1000);

        // data的两种写法
        new Vue({
            el: '#root',
            data: {
                name: 'lwh'
            }
        })

        // data第二种写法：函数式
        new Vue({
            el: '#root',
            data: function () {
                return {
                    name: 'lwh'
                }
            }
        })
```

## MVVM模型
* M:模型Model 对应data中的参数。
* V:视图View 对应模板。
* VM:视图模型ViewModel 对应Vue实例对象。

![mvvm](/blog/img_vue/mvvm.png)

**data中出现的所有属性，都出现在vm身上，vm身上所有的属性以及Vue上所有的属性，在Vue模板中均可使用。**
```javascript
<!-- View层 -->
    <div id="root">
        <h1>姓名：{{name}}</h1>
        <h1>年龄：{{age}}</h1>
    </div>
    <script>
        // ViewModel层
        const vm = new Vue({
            el: '#root',
            // Model层
            data: {
                name: "LWH",
                age: 18
            }
        })
    </script>
```

## Object.defineProperty方法
**参数（对象，属性名，属性配置）**
### 属性配置中的参数
* value：属性值
* writable：是否可被修改（默认为false）
* enumberable：是否可被遍历（默认为false）
* configurable：是否可被删除（默认为false）
* **get函数：读取设置属性时默认调用的参数**
* **set函数：修改设置属性时默认调用的参数**

## 数据代理
:::tip
**数据代理**就是指通过一个对象代理对另一个对象的读写操作。
```javascript
let obj1 = { x: 100 }
let obj2 = { y: 200 }
Object.defineProperty(obj2, 'x', {
　　　get() {
      　　return obj1.x
        },
     set(value) {
         obj1.x = value
         }
     })
```
:::
### Vue中的数据代理
**本质：通过实例化对象vm来代理data对象中的读写操作。**<br/>

**原理：通过`Object.defineProperty`方法将data中的属性都挂载至vm身上。并为每一个添加的属性都提供一个getter和setter方法，利用getter与setter去进行读写操作。**

`实例对象vm会自动拥有_data属性，且值为创建时的data值，也为options.data即创建时配置对象的值。`

![数据代理](/blog/img_vue/dl1.png)


## 事件处理
`使用v-on:事件名或@事件名进行事件绑定。`
* **事件的回调需要配置在methods对象内，最终挂载至vm身上。**
* **methods中的配置函数，不使用箭头函数。this都指向组件实例对象或vm。**
* **`@click="demo"`和`@click="demo($event)"`效果一致，后者可以传参。**

### 事件修饰符
* **prevent：阻止默认事件（e.preventDefault）**
* **stop：阻止事件冒泡（e.stopPropagation）**
* **once：事件仅需触发一次**
* **capture：使用事件的捕获模式**
* **self：只有当event.target为当前操作元素时才触发事件**
* **passive：事件默认行为立即执行，无需等待事件执行完毕的回应**