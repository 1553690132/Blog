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

# Vue2入门
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

## 键盘事件
**Vue中常见的键盘别名：**
* 回车 => enter
* 删除 => delete
* 退出 => esc
* 换行 => tab（必须搭配keydown）
* 空格 => space
* 上、下、左、右 => up、down、left、right
**可以使用`Vue.config.KeyCodes.别名`=`按键的keyCode`来设置别名**

### 系统修饰键
**`ctrl、alt、shift、meta`等键位**<br/>

**①配合keyup使用，按下修饰键的同时，再按下其它键位，随后释放键位，事件才触发。**<br/>
**②配合keydown使用，正常触发事件。**

:::tip
**事件满足链式编程：**
```html
<a :href="url" @click.prevent.stop="showInfo">点击提示信息</a>
```
**也可以实现系统修饰键的固定触发：**
```javascript
<!-- 摁下ctrl+y键触发 -->
<input type="text" @keyup.ctrl.y="showInfo">
```
:::

## 计算属性Computed
**原理：利用Object.defineProperty内置的getter和setter方法。**<br/>
`get函数执行时机：①在初次获取元素时调用（产生缓存防止重复调用）。②修改数据时调用。`<br/>
**优势：相对于methods，内部存在缓存机制，效率更高，调试方便。**
**备注：计算属性会挂载至vm上，直接调用即可。如果计算属性发生修改，则必须去内部编写set方法响应修改，且要修改依赖项的数据。**
```javascript
computed: {
                fullName: {
                    // 读取时自动调用
                    // 初次读取和修改时重新调用
                    get() {
                        return `${this.firstName}-${this.lastName}`
                    },
                    // 修改时自动调用
                    set(value) {
                        const arr = value.split('-')
                        this.firstName = arr[0]
                        this.lastName = arr[1]
                    }
                }
            }
```
**计算属性的简写：当不发生修改时，即无`set`方法时，直接将属性写成方法，并返回值。**
```javascript
new Vue({
            el: '#root',
            data: {
                firstName: '张',
                lastName: '三'
            },
            computed: {
                // 简写:不发生修改
                fullName() {
                    return `${this.firstName}-${this.lastName}`
                }
            }
        })
```

## 监视属性watch
**当监视的属性发生变化时，回调函数handler调用。handler属性默认为newValue和oldValue。**

### 监视属性写法
* **new Vue中加入配置项watch进行相关配置（immediate：初始化是否立即执行，handler为变化执行的回调函数）**
* **使用`vm.$watch`进行配置。`$watch('属性名'，{回调函数}) `**

### 深度监视
* **Vue中的watch属性默认不检测对象内部的改变。**
* **配置watch中的deep属性为true即可达到多级监视的目的。**
```javascript
new Vue({
            el: '#root',
            data: {
                isHot: true,
                numbers: {
                    a: 1,
                    b: 2,
                }
            },
            methods: {
                changeWeather() {
                    this.isHot = !this.isHot
                }
            },
            computed: {
                info() {
                    return this.isHot ? '炎热' : '凉爽'
                }
            },
            watch: {
                // 监视多级解构中某个属性的变化
                'numbers.a': {
                    handler(newValue, oldValue) {

                    }
                },
                // 监视多级结构中所有属性的变化
                numbers: {
                    deep:true,
                    handler(newValue, oldValue) {
                        console.log('change');
                    }
                }
            }
        })
```
**监视属性简便写法：不考虑设置immediate和deep时直接将监视属性作为handler函数返回。**
```javascript
// 简便写法1：
 isHot(newValue, oldValue) {
        console.log('change');
 }

// 简便写法2：
vm.$watch('isHot', function (newValue, oldValue) {
            console.log('change');
})
```

:::tip
**computed和watch的区别：**
* computed能完成的功能，watch都能完成。
* watch能完成的功能，computed不一定能完成，如使用watch实现异步操作。
:::
`注意：所有由Vue管理的函数，最好写成普通函数，这样this执行为vm即Vue实例对象。而不被Vue管理的函数（定时器，Ajax回调函数，Promise回调函数等）最好写成箭头函数，这样this才指向vm。`

## 绑定样式
### 绑定class样式
**写法：`class="xxx"`xxx可以为字符串、数组或对象。**
* 字符串适用于类名不确定的情况，需要动态获取。
* 数组适用于要绑定多个样式，个数与名字均确定，但要动态决定是否使用。
* 对象适用于要绑定多个样式，个数与名字均不确定。

### 绑定style样式
**写法：`:style="{fontSize:xxx}"`xxx为动态值。`:style="[a,b,c]"`其中a、b、c为样式对象。**

## 条件渲染
### v-if **`v-if="xxx" / v-else-if="xxx" / v-else`**
**适用于低频率变化的场景，不展示的DOM元素直接被移除，v-if和v-else-if和v-else使用时必须相接不能被打断。**

### v-show **`v-show="xxx"`**
**高频率变化使用v-show，不展示的DOM元素未被移除，仅仅是display：none隐藏掉。**

### template标签 
**与v-if一起使用，隐藏时会在页面随之隐藏，显示和隐藏均不会存在该节点。**
```javascript
<template v-if="n===1">
            <h1>12</h1>
            <h2>23</h2>
</template>
```

## 列表渲染
**`v-for`命令：用于展示列表数据。**<br/>
**语法：`v-for="(item,index)" in "xxx" :key="xxx"`**
:::tip
**虚拟DOM中key的作用：<p style="color:'red'">key是虚拟DOM对象的唯一标识。当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】，随后Vue进行【新虚拟DOM】和【旧虚拟DOM】的差异比较。</p>**
:::