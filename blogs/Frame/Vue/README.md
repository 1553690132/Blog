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

## VueComponent
**① 组件本质为VueComponent的构造函数，由Vue.extend(options)生成。**<br/>

**② 编写组件标签时，Vue会自动创建组件的实例对象，即执行new VueComponent(options)。**<br/>

**③ 每次调用Vue.extend，生成的都是全新的VueComponent。**<br/>

**④ this指向的变化：**
* **组件配置中，data函数，methods函数，watch函数，computed函数等的this，均指向VueComponent实例对象。**
* **new Vue(options)中的以上函数，this指向为Vue实例对象。**
:::tip
**组件和Vue实例接收相同的配置项（data、methods、生命周期钩子等），但el配置项组件不能配置。**<br/>

**`VueComponent.prototype.__proto__ = Vue.prototype`**
:::

![VueComponent](/blog/img_vue/vuecomponent.png)

## 单文件组件
**一个文件仅包含一个组件（常用编码形式）**
### 文件结构
**① 子组件.vue：**
```js
<template>
  <div id="school">
    // 模板结构
  </div>
</template>

<script>
// 子组件配置
export default {
  name:'School',
  data() {
    return {
      name:'HNU',
      address:'HAERBIN'
    }
  },
};
</script>
<style>
// 结构渲染
  #school {
    color: skyblue;
  }
</style>
```

**② 入口文件main.js：导入App.vue并声明new Vue**
```js
// 入口文件
import App from './App.vue'

new Vue({
    el: '#root',
    components: { App },
    template: '<App></App>'
})
```

**③ 统一管理子组件的App.vue：**
```js
// App.vue 负责管理所有组件
<template>
  <div>
    <School></School>
    <Student></Student>
  </div>
</template>

<script>
import School from "./School.vue";
import Student from "./Student.vue";
export default {
  components: {
    School,
    Student,
  },
};
</script>

<style>
</style>
```

**④ 展示页面index.html：此时无法运行，需要引入脚手架Vue-CLI**

## Vue脚手架 Vue CLI（command line interface）

### 脚手架安装
* **全局安装@vue/cli：`npm i -g @vue/cli`**
* **切换到要创建项目的目录，`vue create xxx`**
* **启动项目：`npm run serve`**

### 关于不同版本的vue
**① `vue.js`是完整版的vue，包含核心功能+模板解析器。**<br/>

**② `vue.runtime.xxx.js`是运行版的vue，只包含核心功能，没有模板解析器。**<br/>

**由于vue.runtime.xxx.js没有模板解析器，故不能使用template配置项，需要使用render函数接受createElement函数去指定具体内容。**

## Render函数
**字符串模板的代替函数**
* **接受`createElement`函数，该函数接受参数，创建一个模板。**
* **Vue 选项中的`render`函数若存在，则 Vue 构造函数不会从 `template`选项或通过`el`选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。**

```js
new Vue({
    // 将App组件放入容器中
    render: h => h(App),
}).$mount('#app')
```

### 修改默认配置
**使用vue > output.js 可以查看到Vue脚手架的默认配置。在`vue.config.js`中进行修改。eg：`lintOnSave：false` //关闭语法检查**

### 脚手架文件结构
![文件结构](/blog/img_vue/jg.png)

## ref属性
* **被用来给元素或子组件注册引用信息（id的替代品）**<br/>
* **ref属性应用在html元素上，获取的是真实DOM元素。ref属性应用至组件标签上，获取的是组件实例对象vc。**
* **使用方法：标签内命名`ref = "xxx"`使用`this.$refs.xxx`进行获取。**

## props配置项
* **让组件接收外部传入的数据**
* **传递数据：`<Demo xxx="xxx">`**<br/>

**接收数据：**
* **仅接收数据：**
```js
 // 简单声明接收,
  props: ["name", "sex", "age"],
```
* **限制类型接收：**
```js
// 接收同时对数据进行类型限制
  props: {
    name: String,
    age: Number,
    sex: String,
  },
```
* **限制类型，设置默认值，限制必要性：type、default、required**
```js
// 接收的同时对数据进行类型限制+默认值指定+必要性限制
  props: {
    name: {
      type: String,
      required: true, //名字是必填项
    },
    age: {
      type: Number,
      default: 99, // 默认值
    },
    sex: {
      type: String,
      required: true,
    },
  },
```
* **整体流程**
```js
----------App.vue-------------
<template>
  <div>
    <Student name="LWH" :age="18" sex="男" />
  </div>
</template>
....

---------Student.vue------------
<script>
export default {
  ......
  // 简单声明接收,
  props: ["name", "sex", "age"],
};
</script>
```
**备注：props属性是`只读`的，Vue底层会监测对props的修改，若进行修改会发出警报。若业务需要修改，则需复制props中的属性至data中，直接使用复制后的属性并对其进行操作。**


## mixin混入
**新建mixin.js文件用于把多个组件共用的配置提取为一个混入对象。**
* **定义混合**
```js
export const hunhe = {
    methods: {
        showName() {
            alert(this.name);
        }
    },
    mounted() {
        console.log('Hello Vue!');
    },
}
```

* **使用混合**<br/>

**全局使用：**
```js
----------main.js------------
import { hunhe1, hunhe2 } from '../mixin';
Vue.mixin(hunhe1)
Vue.mixin(hunhe2)
```
**局部使用：**
```js
---------component.vue---------
import { hunhe1, hunhe2 } from "../mixin";
export default {
  .....
  mixins: [hunhe1, hunhe2],
};
```

## Vue插件
**新建plugins.js用于增强Vue（配置Vue：filter、mixin、directive等）**
* **定义插件**
```js
对象.install = function(Vue, options) {
　　添加全局过滤器：Vue.filer()...
　　添加全局指令：Vue.directive()...
　　配置全局混入：Vue.mixin()
　　添加实例方法：Vue.prototype.xxx = ...
.....
}
```
* **使用插件：在`main.js`中引入，使用`Vue.use`注册。**

## scoped样式
**让样式在局部生效，防止冲突。(原理为给相同的class组件设置不同的属性值，通过属性选择器修改样式)**<br/>
**写法：`<style scoped>`**

## 组件自定义事件
**组件间通信方式，适用于子组件传值给父组件。**<br/>

**使用场景：A为父组件，B为子组件。若B想给A传值，则需在A中给B绑定事件。事件的回调要在父组件A中！**<br/>

**绑定：均在父组件中进行绑定，methods进行定义方法。**<br/>

* **`v-on/@xxx`：直接进行绑定，名称为methods中方法名**
```js
<Demo v-on:test="test" />
// 简写形式
<Demo @test="test" />
```
* **`ref+$on`：`$on("事件名"，事件)`：对组件进行ref命名，使用生命周期钩子mounted内`this.$refs.命名.$on`进行绑定**
```js
<template>
    <Demo ref="demo"/>
</template>

<script>
export default {
    mounted() {　　　　　// test 方法在 methods 中已定义
        this.$refs.demo.$on("test", this.test)
  },
};
</script>
```
`若想只让自定义事件执行一次则使用$once或绑定时使用事件修饰符.once`

**触发：`$emit("父组件绑定的事件名",数据)`**<br/>

**解绑：`$off`**
* 解绑单一事件：`$off("事件名")`
* 解绑多个事件：`$off(["事件名","事件名"...])`
* 解绑所有事件：`$off()`

**事件修饰符`.native`：用于声明给组件绑定的是原生DOM事件。**
```html
<Demo ref="demo" @click.native="show" />
```
**注意：**
使用`$on`进行事件绑定时：`this.$refs.demo.$on("test"，回调)`，回调函数的定义要么在`methods`中定义在此调用，要么使用箭头函数直接定义，否则`this`指向会有问题。

## 全局事件总线
**实现任意组件间通信**<br/>

**原理：利用一个公共区域，进行所有组件的事件管理。运行所有组件访问且拥有自定义事件的`$on、$off、$emit`方法。**

:::tip
**利用`Vue.prototype = VueComponent.prototype.__proto__`的特性，将全局事件总线`$bus`绑定至vm身上，后续所有组件均可通过原型链访问到公共事件。这里绑定在vm身上要在`beforeCreate`中进行，这是因为此时模板尚未解析，若在此之后定义，即组件解析完毕再进行绑定会导致子组件调用产生未定义事件总线的错误。**
:::

### 安装全局事件总线
```js
new Vue({
  render: h => h(App),
  // 妙处
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  },
}).$mount('#app')
```

### 使用事件总线
* **使用数据：若A组件想接收数据，则在A中给`$bus`绑定方法，事件的回调将留在A组件自身。**
```js
methods: {
  demo(data) {
    .....
  }
},
mounted() {
  this.$bus.$on('事件名', this.demo)
},
```
* **提供数据：调用`this.$bus.emit('事件名'，数据)`**
```js
methods: {
  demo() {
    this.$bus.$emit('事件名', 数据)
  }
},
```
**注意：最好在`beforeDestroy`生命周期钩子中`$off`解绑事件。**

## 消息订阅与发布pubsub
**实现任意组件间通信**<br/>
### 使用步骤
* **安装pubsub-js：`npm i pubsub-js`**
* **引入：`import pubsub from 'pubsub-js'`**
* **订阅消息：使用pubsub自带的`subscribe`方法**
```js
methods: {　// subscribe的回调函数参数默认为消息名和数据！
  demo(msgName，data) {
    ...
  }
}
mounted() {
  this.pubId = pubsub.subscribe("消息名", this.demo)
},
```
* **提供数据：`pubsub.publish('消息名',数据)`**
* **取消消息订阅：在`beforeDestroy`中进行，利用消息订阅时产生的`pubId`进行取消！`pubsub.unsubscribe(this.pubId)`**<br/>

**注意：由于消息订阅的回调函数参数为消息名和数据。则一般将消息名写为_代表占位。**

## $nextTick
**用于在下次DOM更新循环结束之后执行延迟回调。在修改数据后立即调用该方法，获取更新后的DOM。**
* **使用：`this.$nextTick(回调函数)`**
* **作用：在下一次DOM更新完成后执行其指定的回调。**
* **使用时机：当改变数据后，要基于更新后的新DOM进行某些操作时，要在`$nextTick`所指定的回调函数中运行。**

## 过渡与动画
**插入、更新、移除DOM元素时，在合适的时候给元素添加样式类名。**<br/>

![过渡与动画](/blog/img_vue/gddh.png)

**写法：若使用动画则可直接用`v-enter-active`和`v-leave-active`调用动画，若使用过渡则用`v-enter`、`v-enter-to`、`v-leave`、`v-leave-to`分别定义。**

**① 准备样式：**<br/>
**元素进入样式：**
* **`v-enter`：进入的起点（定义过渡）**
* **`v-enter-active`：进入的过程（一般在此直接使用动画）**
* **`v-enter-to`：进入的终点（定义过渡）**

**元素离开样式：**
* **`v-leave`：离开的起点**
* **`v-leave-active`：离开的过程**
* **`v-leave-to`：离开的终点**

**`进入的起点和离开的终点，进入的终点和离开的起点，为轮回，可以定义相同内容。`**

**② 使用`<transition>`包裹需要过渡的元素，并配置name属性。**

**③ 若有多个需要过渡的元素。则使用`<transition-group>`进行包裹，且内置元素需要设置`key`值。**

:::tip
**处理跨域问题：**
* **cors**
* **JSONP**
* **配置代理服务器**
:::

## 配置代理
**均在`vue.config.js`中进行配置**

**方法一：直接定义代理服务器转发地址`proxy`，客户端请求url为代理服务器地址**
```js
devServer: {
     proxy: 'http://localhost:5000'
},
```
**优点：配置简单，请求资源时直接发给前端(8080)即可。**<br/>
**缺点：不能配置多个代理，不能灵活的控制请求是否通过代理。**<br/>
**工作方式：（有限匹配前端资源）当请求了前端不存在的资源时，请求会转发给服务器。**

**方法二：**
```js
devServer: {
  proxy: {
    '/代理服务器响应头': {
        target: '代理目标的地址',
        pathRewrite: { '^/代理服务器响应头': '/' }, //匹配所有拥有代理服务器响应头的url，把响应头去除，防止404
        ws: true, //支持websocket
        changeOrigin: true // 控制隐藏请求头中的 host值
    }
  }
}
```
**优点：可以配置多个代理，且可以灵活控制请求是否通过代理。（只需在请求的url处选择是否添加代理服务器的响应头）**<br/>
**缺点：配置繁琐，请求资源时必须加前缀。**

## Vue-resource
**Vue插件，用于给Vue和VueComponent增加`$http`属性，实现与`axios`一样的功能。**

## Slot插槽
**让父组件向子组件指定位置插入html结构，也是组件间通信的方式，适用于`父组件=>子组件`。**
### 默认插槽
**直接使用插槽**
```vue
// 默认插槽
-----父组件
<Demo>
  <template>
    <div>html结构</div>
  </template>
</Demo> 

-----子组件
<template>
  <div>
    <slot>默认插槽</slot>
  </div>
</template>
```

### 具名插槽
**定义name，选择配对使用插槽（`slot="插槽名"`或`v-slot：插槽名`）**
```vue
// 具名插槽
-----父组件
<Demo>
  // 方式一: slot属性指定插槽名
  <template slot="slot1">
    <div>html结构</div>
  </template>
  // 方式二: v-slot属性指定插槽名
  <template v-slot:slot2>
    <div>html结构</div>
  </template>
</Demo> 

-----子组件
<template>
  <div>
    <slot name="slot1">具名插槽</slot>
    <slot name="slot2">具名插槽</slot>
  </div>
</template>
```

### 作用域插槽
**数据在组件自身，但根据数据生成的结构需要组件的使用者来决定。（数据在B组件中，但使用数据遍历出的结构需要A组件来决定）**

:::tip
**`slot-scope`或`scope`指定数据，这里均可用解构赋值取出数据。**<br/>
**`scope`现已废弃，推荐使用`slot-scope`!**
:::

```vue
// 作用域插槽
-----父组件
<Demo>
  // 方式一:
  <template scope="data">
    <ul>
      <li v-for="item in data" :key="data.id" >{{item}}</li>
    </ul>
  </template>
  // 方式二:
  <template slot-scope="data">
    <ul>
      <li v-for="item in data" :key="data.id" >{{item}}</li>
    </ul>
  </template>
</Demo> 

-----子组件
<template>
  <div>
    <slot :data="data"></slot>
  </div>
</template>
```
**注意：`v-slot`和`scope`与`slot-scope`不能一起使用！ `v-slot`可以直接达到指定插槽名与接收作用域数据的目的！**

**`v-slot:插槽名=数据`（这里也可以使用解构赋值即：`v-slot:插槽名={具体数据}`）**

## Vuex
**在Vue中实现集中式状态（数据）管理的插件，对vue中多个组件的共享状态进行集中式的管理（读/写）是专为Vue.js应用开发的状态管理模式+库。可实现任意组件间通信。**

### 多组件共享数据
**多组件共享数据，使用全局事件总线，重复方法过多来回读写数据造成冗余。**

![多组件1](/blog/img_vue/dzj1.png)
![多组件2](/blog/img_vue/dzj2.png)

### 使用Vuex时机
* **多个组件依赖于同一个状态。**
* **来自不同组件的行为需要变更同一状态。**

### Vuex工作原理
![vuex](/blog/img_vue/vuex.png)

### 搭建Vuex环境
**① 创建文件src/store/index.js：使用`new Vuex.Store({state，actions，mutations})`创建vuex核心store实例**
```js
// 用于创建 vuex 中核心 store
// 引入vuex
import Vuex from 'vuex'
// 应用vuex插件
import Vue from 'vue'
Vue.use(Vuex)
// 准备actions:响应组件中的动作
const actions = {}
// 准备mutations:用于操作数据(state)
const mutations = {}
// 准备state:用于存储数据
const state = {}

// 创建并暴露store 
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```
**注意：创建`vuex`的`store`属性，必须先进行`vue.use`使用，由于`import`会在最先进行。故需要在`index.js`中创建`vue实例use`，而不能在入口文件`main.js`中进行`use`！**

**② 在`main.js`中导入并配置store**
```js
import Vue from "vue";
import App from './App.vue'
// 引入store
import store from './store/index'

Vue.config.productionTip = falsenew Vue({
    render: h => h(App),
    store,
}).$mount('#app')
```

### Vuex基本使用
**① 初始化数据、配置state、配置actions、配置mutations、操作文件store.js**
```js
// 配置state存储数据
const state = {data}
// 响应组件中发起的动作
const actions = {
    demo(context, value) {
        context.commit('DEMO', value)
    }
}
// 操作响应actions发起的请求,操作实际数据
const mutations = {
    DEMO(state, value) {
        state.data = ....
    }
}
```
**② 组件读取Vuex中的数据：**
* 在模板中：`$store.state.data`
* 在组件配置中：`this.$store.state.data`

**③ 组件中修改Vuex中的数据：`$store.dispatch('action中的方法名',数据)`和`$store.commit('mutations中的方法名'，数据)`**

**注意：若没有网络请求(ajax)或其他业务逻辑，组件也可直接越过actions，直接访问mutations。**

## getters配置项
**加工state中的数据进行使用（类似于computed）`getters和state的关系类似于data和computed`**

**配置：**
```js
const getters = {
  demo() {
    return ...
  }
},
export default new vuex.Store({
  ...
  getters,
})
```
**组件中读取：`$store.getters.xxx`**

## 四大map方法
**用于优化组件中的computed和methods**

***配置时均需要使用`...`剩余运算符，将四种map方法内的值结构至配置项内。***

### mapState
**映射state中的数据转化为组件的计算属性。**
```js
computed: {
  // 对象写法
  ...mapState({
    demo1:'demo1',
    demo2:'demo2'
  })
  // 数组写法(同名)
  ...mapState(['demo1', 'demo2'])
}
```
**数据加引号：意为去`state`中寻找同名属性，若不加引号则在当前组件中寻找属性则报错。**

### mapGetters
**映射getters中的数据转化为组件中的计算属性。**
```js
computed: {
  // 对象写法
  ...mapGetters({
    demo1:'demo1',
    demo2:'demo2'
  })
  // 数组写法(同名)
  ...mapGetters(['demo1', 'demo2'])
}
```

### mapActions
**用于生成和actions对话的方法，即调用`$store.dispatch`方法。**
```js
methods: {
  ...mapActions({
    demo:'demo'
  })
  ...mapActions(['demo'])
},
```

### mapMutations
**用于生成和mutations对话的方法，即调用`$store.commit`方法。**
```js
methods: {
  ...mapMutations({
    demo:'demo'
  })
  ...mapMutations(['demo'])
},
```
***使用`mapActions`和`mapMutations`，需要在模板内调用方法时传入参数，否则会默认传参event！***

## Vuex模块化+命名空间
**使代码易于维护，数据分类更加明确。**

**① 修改配置文件**
```js
const part1 = {
    // 开启命名空间！
    namespaced: true,
    state: { datas },
    getters: {
        datas() {
            return ...
        },
    },
    actions: { ... },
    mutations: { ... },
}
const part2 = {
    namespaced: true,
    state: { datas },
    getters: {
        datas() {
            return ...
        },
    },
    actions: { ... },
    mutations: { ... },
}

export default new Vuex.Store({
    modules: {
        part1,
        part2
    }
})
```

**② 组件中使用**
```js
// 开启命名空间后组件中读取 state数据
computed: {
    // 直接读取(xxx为模块名)
    demo() {
        return this.$store.state.xxx.data
    },
    // 借用mapState读取
    ...mapState('xxx', ['data'])
},
// 开启命名空间后组件中读取 getters数据
computed: {
    // 直接读取
    demo() {
        return this.$store.getters['xxx/data']
    },
    // 借用mapGetters
    ...mapGetters('xxx', ['data'])
},
// 开启命名空间后组件中调用 dispatch
methods: {
    // 直接读取
    fun() {
        this.$store.dispatch('xxx/fun', data)
    },
    ...mapActions('xxx', ['fun'])
},
// 开启命名空间后组件中调用 commit
methods: {
    // 直接读取
    fun() {
        this.$store.commit('xxx/fun', data)
    },
    ...mapMutations('xxx', ['fun'])
},
```

:::tip
**使用`map`方法在组件中获取传输`state`和`getters`与提交`Actions`和`Mutations`时，可以重复名调用的方法和数据。只需将数组形式变为对象形式即可！**
```js
...mapState("part", {
    重命名:"原名称"
})

...mapGetters("part", {
    重命名:"原名称"
})
// ...mapActions和...mapMutations同理
```
:::