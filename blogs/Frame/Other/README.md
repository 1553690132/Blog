---
title: Vue项目中的一些问题
date: 2023-02-28
tags:
- Vue
categories:
- Frame
---

:::tip
本文总结一些Vue项目开发中出现的奇葩错误。
:::

# Vue2
## 项目启动报错
通常Vue创建项目后，要在入口文件`main.js`中配置。此时使用template模板，项目启动时报错：`You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.`<br/>

**解决方法：**
* ① 使用`render`代替`template`进行模板渲染，因为`render`是`jsx`格式、`template`为**模板引擎**格式。
* ② 在`vue.config.js`在加入`runtimeCompiler:true`

*出现问题的原因是由于项目配置时，npm默认进行的是运行时构建，即为runtime版本且此版本不支持`template`。*

## ElementUI中tag共享数据问题
在ElementUI中进行tag的新增时，会造成多个tag共享统一的数据。<br/>

**解决方法：**
为每个数据源`$set`动态添加唯一属性，在通过elementUI中的`scope.row`来进行数据与tag的匹配获取。
```vue
<template v-slot="scope">
    <el-tag v-for="(item, index) in scope.row.attr_vals"
            :key="index"closable>{{ item }}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
</template>

<script>
    export default {
        methods: {
            demo() {
                res.data.forEach(item => {
                    item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
                    this.$set(item, "inputVisible", false);
                    this.$set(item, "inputValue", "");
                })
            }
        }
    }
</script>
```

# Vue3
## Vue3异步请求获取数据渲染时无法显示
对于数据的获取，通常采用异步方式进行，而对于Vue3，数据通常是reactive或ref定义的。如果使用`hook`节省复用代码。则需要注意数据的响应式不可丢失。

**解决方法：**
由于`reactive`和`ref`定义的数据在js中需要使用`.value`来防止丢失响应式从而进行赋值，故在hook函数中。对于列表类型数据进行赋值时，使用`push`方法。
```js
import { reactive, onMounted } from 'vue'
import { getChatFriend } from '@/api/getData'

export default function () {
    let chatFriendList = reactive([])
    onMounted(async () => {
        let res = await getChatFriend()
        chatFriendList.push(...res)
    })
    return chatFriendList
}
```

## Vue3中自定义hook中watch函数无法执行
在v3项目中，使用`watch`对`props`进行监听时，发现不起作用，无法进行下一步操作。

**解决方法：**
对watch函数的第一项参数改为箭头函数进行返回值。
```vue
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    testData: {
        type: Object,
    }
})

// 失效情况
watch(props.testData, (newValue, oldValue) => {
    // ...
})
// 生效情况
watch(() => props.testData, (newValue, oldValue) => {
    // ...
})
</script>
```

**缘由：**
ref定义对象类型数据时，会自动转化为reactive定义的数据，且reactive本质上是将传入的数据包装为`Proxy`代理对象。<hr />
而vue3源码中，watch函数会将Proxy对象转化为getter函数，而在子应用进行监听时。父应用内操作可以触发子应用的监听，因为直接修改的是Proxy对象内的值。而当父应用通过props传值给子应用时，收到的数据会自动解包，即父应用传入`testData`，子应用拿到的是`test.value`即proxy对象，watch函数对于proxy类型的数据自动会设置为深度监听。<hr />
我们想获取的是`test.value`的变化，即引用地址的变化，即`props.testData`这个变量。<hr />
从根本上讲：存储一个对象引用地址的变量是一个响应式的数据，数据发生变化，依赖内容也会随之改变。但单纯从存储引用地址的响应式变量来说，既不是ref对象也不是proxy对象。故我们只能通过`getter`函数的形式来对其进行监听。
```js
// ref包裹一个对象时，返回值是一个ref对象，这个ref对象的value存储的一个指向proxy对象的引用
const test = ({})

// 当子应用内watch函数如下时
// (isReactive(source)) {
//   getter = () => source
//    deep = true
//  }
// 在源码中, 监听的是一个proxy对象的时候，会直接把这个proxy对象转为getter函数
watch(props.testData, (newValue, oldValue) => {})
....
// 父应用内操作
const changeInfo = () => {
	// 可以触发子组件watch的监听，因为修改的时proxy对象内的值，
	// 当我们将ref对象传给子组件的时候，在模板中，ref对象会自动被解包，
	// 也就时testData拿到的是test.value这个对象，也就是proxy对象。
	// 子组件内监听到的就是这个proxy对象的变化，
	// 而且watch函数自动对proxy函数监听设置为深度监听
	test.value.name = '1'
}
// 父应用内操作
const changeInfo = () => {
	// 无法触发子组件内的监听，因为我们直接修改了test的value，
	// 相当于把test.value指向了另一个proxy对象。这里是value的指向发生了变化。
	// 而子组件内监听的是testData内属性的变化，而不是test.value内存储的引用指向的变化
	test.value = { ...item.value }
}

// 当父组件内操作如下时
const changeInfo = () => {
	test.value = { ...item.value }
}
// 我们在子组件内需要获取到 test.value 的变化， 
// 也就是 引用地址的变化，props.testData这个变量，
//从根本上说是存储一个对象的引用地址的变量，而且是一个响应式数据，
//当数据发生变化时，和它有依赖的所有内容会做出响应。
//单纯从存储引用地址的响应式变量来说，它既不是ref对象，也不是proxy对象，
// 所以我们只能通过getter函数的形式来监听它的值的变化
 watch(() => props.testData, (newValue, oldValue) => {})

```