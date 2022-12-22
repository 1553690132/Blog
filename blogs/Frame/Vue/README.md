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

## diff算法
**新旧虚拟DOM比较规则：**<br/>
**（1）旧虚拟DOM中找到了与新虚拟DOM相同的key值：**<br/>
* **若新虚拟DOM中内容没变，则直接使用之前生成的真实DOM。**
* **若新虚拟DOM中内容变化了，则直接生成新的真实DOM，随后替换掉之前生成的旧真实DOM。**<br/>

**（2）旧虚拟DOM中未找到和新虚拟DOM相同的key值：则直接生成新的真实DOM，渲染至页面。**
:::tip
**`v-for`不使用`index`作为`key`的问题：若使用index且对数据进行：逆序添加、逆序删除等破坏顺序的操作，会产生没有必要的真实DOM更新，造成效率低下。如果结构中还包含输入类DOM则会产生错误的真实DOM更新，造成页面渲染出错。**
:::

### 筛选列表事例
* **使用监视属性实现时，改变的是页面遍历的数组。故设立一个新数组于data中。handler进行筛选改变，需要immediate立即执行。**
```html
<div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyWord">
        <ul>
            <li v-for="(p,index) in filPersons" :key="p.id">
                {{p.name}}-{{p.age}}
            </li>
        </ul>
    </div>

    <script>
        // 利用 watch实现
        new Vue({
            el: '#root',
            data: {
                keyWord: '',
                persons: [
                    {
                        id: 001,
                        name: '马冬梅',
                        age: 18,
                        gender: '女'
                    },
                    {
                        id: 002,
                        name: '周冬雨',
                        age: 20,
                        gender: '女'
                    },
                    {
                        id: 003,
                        name: '周杰伦',
                        age: 30,
                        gender: '男'
                    },
                    {
                        id: 004,
                        name: '温兆伦',
                        age: 35,
                        gender: '男'
                    }
                ],
                // 存放新数据
                filPersons: []
            },
            watch: {
                keyWord: {
                    immediate: true,
                    handler(value) {
                        this.filPersons = this.persons.filter(p => {
                            return p.name.indexOf(value) !== -1
                        })
                    }
                }
            }
        })
    </script>
```

* **使用计算属性实现时，将页面要展现的新数组计算出来。设置新的数组作为计算属性，直接对其进行get方法改变即可。**
```html
<div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyWord">
        <ul>
            <li v-for="(p,index) in filPersons" :key="p.id">
                {{p.name}}-{{p.age}}
            </li>
        </ul>
    </div>

    <script>
        // 利用 computed实现
        new Vue({
            el: '#root',
            data: {
                keyWord: '',
                persons: [
                    {
                        id: 001,
                        name: '马冬梅',
                        age: 18,
                        gender: '女'
                    },
                    {
                        id: 002,
                        name: '周冬雨',
                        age: 20,
                        gender: '女'
                    },
                    {
                        id: 003,
                        name: '周杰伦',
                        age: 30,
                        gender: '男'
                    },
                    {
                        id: 004,
                        name: '温兆伦',
                        age: 35,
                        gender: '男'
                    }
                ],
            },
            computed: {
                filPersons() {
                    return this.persons.filter(e => {
                        return e.name.indexOf(this.keyWord) !== -1
                    })
                }
            }
        })
    </script>
```

### 排序列表事例
**给各排序按钮设置事件改变定义的`sortType`属性，在计算属性内部进行判断是否需要进行重排序，由于计算属性触发时机为依赖属性改变故总会随按钮点击而变化。**
```html
<div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="请输入名字" v-model="keyWord">
        <button @click="sortType=0">年龄升序</button>
        <button @click="sortType=1">年龄降序</button>
        <button @click="sortType=2">原顺序</button>
        <ul>
            <li v-for="(p,index) in filPersons" :key="p.id">
                {{p.name}}-{{p.age}}
            </li>
        </ul>
    </div>

    <script>
        new Vue({
            el: '#root',
            // 0为原顺序，1为降序，2为升序
            data: {
                keyWord: '',
                sortType: 0,
                persons: [
                    {
                        id: 001,
                        name: '马冬梅',
                        age: 28,
                        gender: '女'
                    },
                    {
                        id: 002,
                        name: '周冬雨',
                        age: 20,
                        gender: '女'
                    },
                    {
                        id: 003,
                        name: '周杰伦',
                        age: 30,
                        gender: '男'
                    },
                    {
                        id: 004,
                        name: '温兆伦',
                        age: 35,
                        gender: '男'
                    }
                ],
            },
            // 计算属性的依赖属性改变时也会重新执行！
            computed: {
                filPersons() {
                    const arr = this.persons.filter(e => {
                        return e.name.indexOf(this.keyWord) !== -1
                    })
                    // 判断是否需要排序
                    if (this.sortType) {
                        this.sortType === 1 ? arr.sort((x, y) => {
                            return x.age - y.age
                        }) : arr.sort((x, y) => {
                            return y.age - x.age
                        })
                    }
                    return arr
                }
            }
        })
    </script>
```

## Vue.set/Vue.$set
**参数（实例对象的某一属性名，属性名，属性值）**
**用于给实例化Vue对象的某一个属性对象动态添加子属性。**<br/>
**`不允许直接给实例化对象添加属性。即参数第一项不能为vm实例对象本身或是vm的根数据对象（即data/vm._data）`**
```js
<script>
        const vm = new Vue({
            data: {
                name: 'LWH',
                message: {
                    age: 18,
                }
            }
        })
        // 对vm上的messgae对象添加属性是允许的
        Vue.set(vm.message, 'sex', '男')
        // 或者为
        vm.$set(vm.message, 'sex', '男')

        // 直接在vm的data内创建新属性是不行的
        Vue.set(vm, 'sex', '男')
    </script>
```

## Vue监测数据
**Vue会监视data中所有层次的数据。**<br/>

**监测对象中数据：通过setter实现监视，且在new Vue时就传入要监测的数据。**
* 对象中后追加的属性，Vue不做响应式处理。
* 如需给后添加的属性增加响应式，需要使用Vue.set和vm.$set方法实现。

**监测数组中数据：通过包裹数组更新元素的方法实现，本质为：**
* 调用原生对应的方法对数组进行更新。
* 重新解析模板，进而更新页面。

### 在Vue中修改数组的某个元素方法
* **使用改变原数组的方法：push、pop、splice、shift、unshift、sort、reverse**
* **使用Vue.set和vm.$set方法**
* **若想使用不改变原数组的filter，slice，concat等方法，需要使用新数组覆盖旧数组**

## 数据劫持
**实例化Vue对象时传入的`data`经过处理后以`getter`和`setter`的形式进行管理的过程。后续对属性进行读改都要经过`setter`和`getter`处理。**

## 收集表单数据
* **若类型为text表单，v-model收集用户输入的value值。**
* **若类型为radio，则需要配置value属性，配合v-model使用。**
* **若类型为checkbox，在未配置value时v-model默认收集checked属性(是否选中)。如果有多个checkbox，则用数组进行取值。**
* **v-model的修饰符：number转化为数值类型，lazy失去焦点再获取数据，trim去除首尾空格。**

## 过滤器
**对要显示的数据进行特定格式化后再显示（仅适用于简单的逻辑处理）**<br/>

**语法：**
* **注册过滤器：(全局) `Vue.filter(过滤器名，回调函数)`、(局部) `new Vue({filters：函数})`**
* **使用过滤器：`{{xxx | 过滤器名}}` 或 `v-bind:属性="xxx | 过滤器名"`**

**备注：**
* **过滤器接受默认参数为调用属性，也可以接受额外参数，多个过滤器间可以串联。**
* **过滤器不会改变原数据，是产生新的对应数据。**

```html
<!-- 过滤器实现 -->
<h3>{{time | timeFormat | myslice}}</h3>
<h3 :x="time | myslice"></h3>

<script>
// 定义全局过滤器
        Vue.filter('myslice', function (value) {
            return value.slice(0, 3)
        })
// 局部过滤器
        filters: {
            timeFormat(value, str = "YYYY-MM-DD HH:mm:ss") {
                return dayjs(value).format(str)
             },
          }
</script>
```

## Vue内置指令
* **`v-model`：双向数据绑定。**
* **`v-bind`：单向绑定解析表达式，可简写为`:`。**
* **`v-for`：循环遍历数组、对象、字符串。**
* **`v-if`：条件渲染（动态控制节点是否存在）**
* **`v-else`：条件渲染（动态控制节点是否存在）**
* **`v-show`：条件渲染（动态控制节点是否展示）**
* **`v-on`：绑定事件监听，可简写为`@`。**
* **`v-text`：向所在节点内部渲染文本内容。**
* **`v-html`：向指定节点内部渲染包含HTML结构的内容。**
* **`v-cloak`：本质为特殊属性，Vue创建实例完毕后会接管此容器，将`v-cloak`属性删除。使用CSS配合v-cloak使用可解决网速慢页面插值语法未渲染的问题。**
* **`v-once`：所在节点经初次渲染后，就视为静态内容了。以后数据发生改变不会引起使用`v-once`所在结构的更新。可用于优化性能。**
* **`v-pre`：令Vue跳过其所在节点的编译过程。利用该命令跳过没有使用指令语法，没有使用插值语法的节点，可加快编译过程。**

:::tip
**`v-text`和插值语法的不同：** v-text会代替节点内部的内容，{{xxx}}则不会。<br/>

**`v-html`与插值语法不同：** v-html会替换掉节点中所有内容且可以识别html语句，{{xxx}}则不会。<br/>

**v-html安全性问题：在网站动态渲染HTML结构容易导致XSS攻击(冒充用户之手)，仅在可信任内容使用，不能用于用户提交内容。**
:::

## 自定义指令
**函数式/对象式：**
```js
// 函数式
directives: {
                // 指令与元素成功绑定时执行。
                // 指令所在模板被重新解析时也执行，
                big(element, binding) {
                    element.innerText = binding.value * 10
                }
            }

// 对象式
directives: {
                fbind: {
                    // 指令与元素成功绑定时执行(初始化时)
                    bind(element, binding) {
                        element.value = binding.value
                    },
                    // 指令所在元素被插入页面时调用
                    inserted(element) {
                        element.focus()
                    },
                    // 指令所在模板被重新解析时
                    update(element, binding) {
                        element.value = binding.value
                        element.focus()
                    }
                }
            }
```
**全局自定义指令：`Vue.directive(指令名，回调函数)` 或 `Vue.directive(指令名，配置对象)`**

**配置对象中常用的三个回调函数：**
* **`bind`：指令与元素成功绑定后调用（初始化）**
* **`inserted`：指令所在元素被插入页面后调用**
* **`update`：指令所在模板结构重新解析时调用**<br/>

`故函数式自定义相当于配置对象的bind函数和update函数的合体形式。`<br/>

:::tip
**指令定义时不加v-，使用时加。若指令名指定多个单词，要用短横杠链接法命名。**
:::


## 生命周期
`Vue在关键时刻调用的一些特殊名称的函数`<br/>
* **又名：生命周期回调函数、生命周期钩子、生命周期函数。**
* **生命周期函数的名字不可更改，但函数的具体内容根据程序员需求编写。**
* **生命周期函数内的this执行是Vue或实例对象。**

### mounted
**mounted属性函数(生命周期函数)：在Vue完成模板解析并把初始的真实DOM放入页面后(挂载完毕)执行`mounted`函数：类似于`onload`**

![生命周期](/blog/img_vue/zq.png)

### vm.$destory
**完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。触发`beforeDestroy`和`destroyed`的钩子。**

### VM生命周期总结
* **将要创建：调用`beforeCreate`**
* **创建完毕：调用`created`**
* **将要挂载：调用`beforeMount`**
* **挂载完毕：调用`mounted`：一般在此进行初始化操作：发送Ajax请求、启动定时器、绑定自定义事件、订阅消息等。**
* **将要更新：调用`beforeUpdate`**
* **更新完毕：调用`updated`**
* **将要销毁：调用`beforeDestroy`：一般在此进行收尾工作：清除定时器、解绑事件、取消订阅消息等。**
* **销毁完毕：调用`destroyed`**

**销毁Vue实例：① 销毁后自定义事件失效、原生DOM事件仍存在。② 一般不会在beforeDestroy中操作数据，即使改变数据也不会触发更新流程。**

## Vue组件化编程
### 非单文件组件
**一个文件包含n个组件。**
* **定义组件：`Vue.extend(options)`创建，在`options`内部不能写`el`(组件都需要经过vm统一管理和分配)，`data`必须写成函数模式，避免组件复用时数据存在引用关系。**
* **注册组件：局部注册：new Vue时创建的`components`属性。全局注册：`Vue.component('组件名'，组件)`**
* **使用组件(直接在页面写组件标签)**  

### 注意点
#### 组件命名
* **一个单词：首字母大写或首字母小写**
* **多个单词：短横线命名（school-name）或大驼峰命名（SchoolName）需要Vue脚手架支持**
* **可以在组件内部定义name配置项指定组件在开发者工具中呈现的名字**

#### 组件标签
* **`<school></school>`写法**
* **`<school/>`写法：若不在Vue脚手架环境下，则该种写法会导致后续组件不能渲染。**

#### 定义简写
**`const xxx = Vue.extend(options)` 可简写为 `const xxx = options`**

```js
const person = {
            data() {
                return {
                    name: 'LWH',
                    age: 18
                }
            },
            template: `
            <div>
                <h1>name: {{name}}</h1>
                <h2>age: {{age}}</h2>
            </div>
            `,
  }
```

### 组件嵌套
**可以在组件内部再次注册组件，利用app组件管理所有子组件。**
```js
        const student = Vue.extend({
            template: `<div>
                <h2>{{name}}</h2>
                <h2>{{age}}</h2>
            </div>`,
            data() {
                return {
                    name: 'LWH',
                    age: 22
                }
            }
        })
        const school = Vue.extend({
            template: `<div>
                <h2>{{name}}</h2>
                <h2>{{address}}</h2>
                <student></student>
            </div>`,
            data() {
                return {
                    name: 'HNU',
                    address: 'HRB'
                }
            },
            components: {
                student
            }
        })
        const hello = Vue.extend({
            template: `<h2>Hello {{name}}</h2>`,
            data() {
                return {
                    name:'LWH'
                }
            }
        })
        // 管理所有组件的组件
        const app = Vue.extend({
            template: `<div>
                    <school></school>
                    <hello></hello>
                </div>`,
            components: {
                school,
                hello
            }
        })
        new Vue({
            el: '#root',
            components: {
                app
            },
            template:`<app></app>`
        })
```