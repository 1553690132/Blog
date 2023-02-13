---
title: Vue3
date: 2023-02-11
tags:
- Vue
categories:
- Frame
sidebar: auto
---

## Vue3
2020年9月18日，Vue.js发布3.0版本，代号：One Piece

## Vue3优势
**性能提升：**
* 打包大小减少41%
* 初次渲染快55%，更新渲染快133%
* 内存减少54%

**源码升级：**
* 使用`Proxy`代替`defineProperty`实现响应式。
* 重写虚拟`DOM`的实现和`Tree-Shaking`
* Vue3可以更好的支持`TypeScript`

**新的特性：**<br/>
**① Composition API（组合API）**
* `setup`配置
* `ref`与`reactive`
* `watch`与`watchEffect`
* `provide`与`inject`
**② 新的内置组件**
* `Fragment`
* `Teleport`
* `Suspense`
**③ 其他改变**
* 新的生命周期钩子
* data选项应始终被声明为一个**函数**
* 移除`keyCode`支持作为`v-on`的修饰符

## 创建Vue3工程
### vue-cli创建工程
```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```
### vite创建工程
* vite---新一代前端构建工具
* **优势：** ① 开发环境中，无需打包，可快速冷启动。② 轻量快速的热重载（HMR）③ 真正的按需编译，无需等待整个应用编译完成。
```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

## Vue3入口文件
**旧版：**
```js
import Vue from 'vue'
import App from './App.vue'

new Vue({
    render: h => h(App)
}).$mount('#app')
```

**新版：**
* 引入的不再是Vue构造函数，而是`createApp`工厂函数。
* 创建实例对象app相当于Vue2中的vm实例对象，但app相比vm更加轻量。
```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## 常用Composition API
### setup核心
**① 理解：Vue3中新的配置项，值为一个函数。**<br/>
**② setup是所有Composition API的基础。**<br/>
**③ 组件中所用到的：数据、方法等等，均需配置在setup中。**<br/>
**④ setup的两种返回值：**
* 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
```vue
<script>
    export default {
        name: 'App',
        setup() {
            let data = '',

            function showData() {
                ...
            },

            return {
                data,
                showData(),
            }
        }
    }
</script>
```
* 若返回一个渲染函数：则可以自定义渲染内容。
```vue
<script>
    import { h } from 'vue',
    export default {
        name: 'App',
        setup() {
            return () => {
                return h('渲染标签值', '渲染内容')
            }
        }
    }   
</script>
```
:::tip
**注意：** <br/>
<strong style="color:#DD5145">尽量不要将Vue2与Vue3语法混用:</strong>
* Vue2.x配置（data、methods、computed）中可以访问搭配setup中的属性和方法。
* 在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置
* 如果有重名情况，则setup优先
<strong style="color:#DD5145">setup不能是一个async函数</strong>，因为返回值不再是return的对象，而是promise，二模板无法查看return对象中的属性。若需要返回Promise实例，则需要Suspense和一部组件的配合使用。
:::

### setup的两个注意点
**`setup`执行的时机**
* 在`beforeCreate`前执行一次，`this`为`undefined`。
**`setup`的参数**
**`props`：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。**<br/>
**`context`：上下文对象。**
* `attrs`：值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性，相当于`this.$attrs`
* `slots`：收到的插槽内容，相当于`this.$slots`
* `emit`：分发自定义事件的函数，相当于`this.$emit`

### ref函数
**作用：定义一个<strong style="color:#DD5145">响应式</strong>的数据**<br/>
**语法：`const xxx = ref(initValue)`**
* 创建了一个包含响应式数据
* <strong style="color:#DD5145">JS中操作数据：`xxx.value`</strong>
* 模板中读取数据：不需要`.value`，直接：`<div>{{ xxx }}</div>`
:::tip
**备注：**
* **接收的数据可以是：基本类型、对象类型。**
* <strong style="color:#DD5145">基本类型数据：响应式依然依靠`Obejct.defineProperty()`的`get`和`set`完成。</strong>
* <strong style="color:#DD5145">对象类型数据：内部使用了Vue3的新函数:----`reactive`函数。即Proxy的实现</strong>
:::

### reactive函数
* **作用：定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据。**
* **语法：`const xxx = reactive(源对象)`接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy的实例对象，简称proxy对象）</strong>**
* **reactive定义的响应式是深层次的。**
* **内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据进行操作。**

### reactive对比ref
:::tip
**从定义数据角度对比：**
* `ref`用来定义：<strong style="color:#DD5145">基本类型数据</strong>
* `reactive`用来定义：<strong style="color:#DD5145">对象或者数组类型数据</strong>
* 备注：`ref`也可以用来定义<strong style="color:#DD5145">对象或者数组类型</strong>数据，内部会自动通过`reactive`转化为<strong style="color:#DD5145">代理对象。</strong>
**从原理角度对比：**
* `ref`通过<strong style="color:#DD5145">`Object.defineProperty()`</strong>的<strong style="color:orange">`get`</strong>和<strong style="color:#DD5145">`set`</strong>来实现响应式（数据劫持）
* `reactive`通过使用<strong style="color:#DD5145">`Proxy`</strong>来实现响应式（数据劫持），并通过<strong style="color:#DD5145">`Reflect`</strong>操作<strong style="color:#DD5145">源对象内部</strong>的数据。
**从使用角度对比：**
* `ref`定义的数据：JS中操作数据<strong style="color:#DD5145">需要通过`.value`</strong>，模板template中读取数据不需要。
* `reactive`定义的数据，操作与读取均不需要使用`.value`。
:::

## Vue3响应式原理
### Vue2.x的响应式
**实现原理：**
* 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。
* 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）
```js
Object.defineProperty(data, 'count', {
    get(){}
    set(){}
})
```
**存在问题：**
* 新增属性、删除属性，界面不会更新。（需要使用`$set`和`$delete`方法）
* 直接通过下标修改数组，界面不会自动更新。(推荐使用`splice`方法)
```js
let person = {
    name: 'lwh',
    age: 18
}
// 模拟Vue2响应式
let p = {}
Object.keys(person).forEach(e => {
    Object.defineProperty(p, e.toString(), {
        configurable: true,
        get() {
            return e
        },
        set(value) {
            console.log(`${e}发生修改`);
            e = value
        }
    })
})
// Vue2的模拟，难以捕获到新增和删除属性的操作。
```

### Vue3.0的响应式
**实现原理：**
* 通过[`Proxy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)（代理）：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等。
* 通过[`Reflect`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)（反射）：对源对象的属性进行操作。
```js
new Proxy(data, {
    get(target, prop) {
        // 拦截读取属性值
        return Reflect.get(target, prop)
    },
    set(target, prop, value) {
        // 拦截设置属性值/新增属性值
        return Reflect.set(target, prop, value)
    },
    deleteProperty(target, prop) {
        // 拦截删除属性值
        return Reflect.deleteProperty(target, prop)
    }
})
```

## 计算属性与监视
### computed函数
* 与Vue2.x中computed配置功能一致
* **写法：分为简写（函数式）和完整（对象式）**
```js
import {computed} from 'vue'
export default {
    setup(){
        // 简写形式：不考虑修改
        let datas = computed(()=>{
            return ...
        })
        // 完整形式：考虑修改
        let datas = computed({
            get(){
                return ...
            }
            set(value) {
                ...
            }
        })
        return {datas}
    }
}
```

### watch函数
* 与Vue2.x中watch配置功能一致
**缺点：**
* 监视`reactive`定义的<strong style="color:orange">响应式数据</strong>时：<strong style="color:#DD5145">oldValue无法正确获取，强制开启`deep`深度监视（`deep`配置项失效）</strong>
* 监视`reactive`定义的<strong style="color:orange">响应式数据中某个属性</strong>时：<strong style="color:#DD5145">`deep`配置有效</strong>
```vue
<script>
import {ref, reactive, watch} from 'vue'
export default {
    setup() {
        let sum = ref(0);
        let msg = ref('hello')
        let person = reactive({
            name:'lwh',
            age: 18,
            job: {
                j1: {
                    salary:20
                }
            }
        })

        // 情况一：监视ref定义的响应式数据
        watch(sum, (newValue, oldValue) => {
            console.log('sum变化')
        }, {immediate: true})

        // 情况二：监视ref定义的多个响应式数据
        watch([sum, msg], (newValue, oldValue) => {
            console.log('sum或msg变化')
        }, {immediate: true})

        // 情况三：监视reactive定义的响应式数据
        // 无法获取正确的oldValue值,且deep默认开启,无法配置.
        watch(person, (newValue, oldValue) => {
            console.log('person属性发生变化')
        })

        // 情况四：监视reactive定义的响应式数据的某个属性
        watch(() => person.job, (newValue, oldValue) => {
            console.log('person的job属性发生变化,此时deep属性可以使用.')
        }, {deep: true})

        // 情况五：监视reactive定义的响应式数据的某些属性
        watch([() => person.job, () => person.name], (newValue, oldValue) => {
            consloe.log('person属性发生变化!')
        })
    }
}
</script>
```

### watchEffect函数
* `watch`的思想是：**既要指明监视的属性，也要指明监视的回调。**
* `watchEffect`的思想是：**不用指名监视哪个属性，监视的回调中用到哪个属性，就去监视哪个属性。**
* `watchEffect`与`computed`类似：
  * 但`computed`注重的是计算出的结果值（回调函数的返回值），故必须写返回值。
  * 而`watchEffect`更注重的是过程（回调函数的函数体），所以不用写返回值。

```js
// watchEffect所指定的回调中用到的数据只要发生变化，则重新执行回调。
watchEffect(() => {
    const x1 = data1.value
    const x2 = data2.data
    console.log('监听成功，watchEffect执行！')
})
```

## 生命周期

### vue2.x生命周期
![vue2生命周期](/blog/img_vue/zq.png)
### vue3生命周期
![vue3生命周期](/blog/img_vue/smzq3.png)

**Vue3中可以继续使用Vue2中的生命周期钩子，但有改名的情况：**
* `beforeDestory`改为`beforeUnmount`
* `destory`改为`unmounted`

**Vue3中也提供了Composition API形式的生命周期钩子，与Vue2中的对应情况如下：**
* - `beforeCreate`===>`setup()`
* - `created`=======>`setup()`
* - `beforeMount` ===>`onBeforeMount`
* - `mounted`=======>`onMounted`
* - `beforeUpdate`===>`onBeforeUpdate`
* - `updated` =======>`onUpdated`
* - `beforeUnmount` ==>`onBeforeUnmount`
* - `unmounted` =====>`onUnmounted`

## 自定义hook函数
* 本质上是一个函数，用于将setup函数中使用的Composition API封装。
* 类似于Vue2中的mixin
* 自定义hook的优势：复用代码，令setup中的逻辑更加清晰易懂。

```js
// 新建hooks文件夹用于创建复用的hook文件
export default function() {
    ....
    return "数据"
}

// 在组件中调用
import useXXX from '../hooks/useXXX.js'
export default {
    setup() {
        let datas = useXXX()
        return { datas }
    }
}
```