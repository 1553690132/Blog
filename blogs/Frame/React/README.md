---
title: React
date: 2023-05-10
tags:
- React
categories:
- Frame
sidebar: auto
---

:::tip
React--- 一个专注于构建用户界面的 JavaScript 库，和vue和angular并称前端三大框架，不夸张的说，react引领了很多新思想，世界范围内是最流行的js前端框架，最新版本已经到了18，加入了许多很棒的新特性
:::

# React
## React的基本知识
#### React的特点
* **声明式UI（JSX）**
  > 使用JS进行页面、逻辑编写
  ```html
  <!-- Vue -->
  <ul>
    <li v-for="item in list">react</li>
  </ul>
  ```
  ```html
  <!-- React -->
  <ul>
    { list.map(item => <li>react</li>) }
  </ul>
  ```
* **组件化**
  > 组件是react最重要的内容，通过一个个组件进行搭建整个页面，通过组件抽象增加复用能力和提高维护性。
* **跨平台**
  > react既可以开发web应用也可以使用同样的语法开发原生应用（react-native），比如安卓和ios应用，甚至可以使用react开发VR应用，想象力空间十足，react更像是一个 元框架  为各种领域赋能.

## 环境初始化
### 脚手架创建项目
* 使用命令行进行项目创建
  ```bash
  $ npx create-react-app react-basic
  ```
* 说明：
  * `npx create-react-app`是固定命令，`create-react-app`是React脚手架名称。
  * npx 命令会帮助我们临时安装create-react-app包，然后初始化项目完成之后会自自动删掉，所以不需要全局安装create-react-app
* 启动项目
  ```bash
  yarn start
  npm start
  ```
### 项目目录说明调整
* 目录说明 
  * `src`目录是项目开发目录
  * `package.json`中的两个核心库：react、react-dom
* 入口文件说明
  ```jsx
  import React from 'react'
  import ReactDOM from 'react-dom'
  import './index.css'
  import App from './App'
  ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  )
  document.getElememtById('root')
  ```
## JSX基础
### 1.JSX介绍
> JSX是 JavaScript XML（HTML）的缩写，表示在 JS 代码中书写 HTML 结构。用于在React中创建HTML结构（页面UI结构）
JSX 并不是标准的 JS 语法，是 JS 的语法扩展，浏览器默认是不识别的，脚手架中内置的 `@babel/plugin-transform-react-jsx` 包，用来解析该语法

### 2.JSX中使用JS表达式
**语法：** `{ JS表达式 }`
```JSX
const name = 'admin'
<h1>Hello! I am {name}.</h1>
```
**表达式类型：**
  * 字符串，数值，布尔值，null，undefined，object
  * 函数方法
**注意：**
> if 语句/ switch-case 语句/ 变量声明语句，这些叫做语句，不是表达式，不能出现在 {} 中！！

### 3.JSX列表渲染
**vue中实现列表渲染使用`v-for`实现。react中使用数组方法`map`实现。**
```JSX
const people = [
  {id: 1, name: 'Admin'},
  {id: 2, name: 'Root'}
]

function App() {
  return (
    <div>
      <ul>
        {people.map(p => <li key={p.id}>{p}</li>)}
      </ul>
    </div>
  )
}
```
**注意：** 遍历列表同样和vue一样需要key值进行diff算法的提升。

### 4.JSX条件渲染
**可以使用三元运算符或逻辑与(&&)运算符实现。**
```JSX
// 来个布尔值
const flag = true
function App() {
  return (
    <div className="App">
      {/* 条件渲染字符串 */}
      {flag ? 'react真有趣' : 'vue真有趣'}
      {/* 条件渲染标签/组件 */}
      {flag && <span>this is span</span>}
    </div>
  )
}
export default App
```
**原则：** 模板中的逻辑尽量精简。
负责的多分支逻辑，收敛为一个函数。模板中只负责调用这个定义分支逻辑的函数。
```JSX
fucntion getHtag(type) {
  if(type === 1) {
    return <h1>h1</h1>
  }
  else if(type === 2) {
    return <h2>h2</h2>
  }
  else {
    return <h3>h3</h3>
  }
}

function App() {
  return (
    <div className="App">
      {getHtag(1)}
      {getHtag(2)}
      {getHtag(3)}
    </div>
  )
}
```

### 5.JSX样式处理
* **内联样式（行内样式）**
  * 即在元素身上绑定style属性。
  ```JSX
  function App() {
    return (
      <div className="App">
        <div style={{color:'red'}}>
          <span>Hello</span>
        </div>
      </div> 
    )
  }

  //精简版
  const styleObj = {
    color: 'red'
  }
  function App() {
    return (
      <div className="App">
        <div style={styleObj}>
          <span>Hello</span>
        </div>
      </div> 
    )
  }
  ```
* **类名样式**
  * 在元素身上绑定一个classname控制样式
  ```JSX
  function App() {
    return (
      <div className="App">
        <span className="active"> Hello </span>
      </div>
    )
  }
  ```
* **动态控制类名**
  * 在Vue中动态控制样式采用`:class={active:isActive}`形式操作。
  * 在React中动态控制样式采用三元运算符进行操作。
  ```JSX
  function App() {
    return (
      <div className="App">
        <span className={isActive ? 'active' : ''}></span>
      </div>
    )
  }
  ```

### 6.JSX注意事项
* **JSX中必须有一个根节点，若没有根节点，则使用 `<></>` 幽灵节点代替。**
* **所有标签必须闭合，成对闭合或自闭合均可。**
* **JSX中属性名使用驼峰命名法：`class -> className`、`for -> htmlFor`**
* **JSX支持多行、换行，若需要换行，则用（）进行包裹。**

## React组件
### 组件概念
> React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数

### 函数组件
> 使用JS的函数创建的组件。
```JSX
// 定义函数组件
function HelloFn () {
  return <div>这是我的第一个函数组件!</div>
}

function App () {
  return (
    <div className="App">
      {/* 渲染函数组件 */}
      <HelloFn />
      <HelloFn></HelloFn>
    </div>
  )
}
export default App
```
**注意：**
  * 组件名称必须首字母大写，React内部会根据这个来判断是组件还是普通的HTML标签。
  * 函数组件必须有返回值，表示该组件的UI结构；若不需要渲染任何内容，则返回null。
  * 对于函数组件来说，渲染的内容就是函数的返回值。
  * 使用函数名称作为组件标签名称，可成对出现也可自闭和。

### 类组件
> 使用ES6的class创建的组件。
```JSX
// 引入React
import React from 'react'

// 定义类组件
class HelloC extends React.Component {
  render () {
    return <div>这是我的第一个类组件!</div>
  }
}

function App () {
  return (
    <div className="App">
      {/* 渲染类组件 */}
      <HelloC />
      <HelloC></HelloC>
    </div>
  )
}
export default App
```
**注意：**
  1. 类名称也必须以大写字母开头。
  2. 类组件应该继承`React.Component`父类，从而使用父类中提供的方法或属性。
  3. 类组件必须提供`render`方法`render`方法必须有返回值，表示该组件的`UI`结构。
  4. 组件可以渲染其他组件，但不能嵌套他们的定义！

## 事件绑定
### 绑定方法
* **语法：**
  * on + 事件名称 = {事件处理程序}，eg：`<div onClick={onClikc}></div>`
* **注意点：**
  * react事件采用驼峰命名法，例如：`onMouseEnter`、`onFocus`
* **样例**
  ```JSX
  function Fn() {
    const clickFn = () => console.log('函数组件事件')
    return (
      <>
        <button onClick={clickFn}>Click</button>
      </>
    )
  }

  class Obj extends React.Component {
    clickFn = () => console.log('类组件事件')
    render() {
      return (
        <>
          <button onClick={this.clickFn}>Click</button>
        </>
      )
    }
  }
  ```

### 获取事件对象
> 获取事件对象e只需要在事件的回调函数中补充一个形参e即可
```JSX
function Fn() {
  const clickFn = (e) => console.log(e)
  return (
    <div>
      <button onClick={clickFn}></button>
    </div>
  )
}
```

### 事件传值
> 改造事件绑定为箭头函数，在箭头函数中完成参数的传递。
**语法：** `onClick={() => clickFn(msg)}`
``` JSX
import react from "react"
const TestComponent = () => {
  const list = [
    {id: 1001, name: 'Admin'},
    {id: 1002, name: 'Root'}
  ]
}
```


## 组件状态
> 在React hook出现之前，函数式组件是没有自己的状态的，所以显示域类组件进行了解。
> 步骤：初始化状态 -> 读取状态 -> 修改状态 -> 影响视图
### 初始化状态
* 通过`class`的实例属性`state`来初始化。
* `state`的值是一个对象结构，表示一个组件可以有多种数据状态。
* 通过`this.state`来获取状态。
```JSX
class Counter extends React.Component {
  state = {
    count: 0
  }
  render() {
    return <div>{this.state.count}</div>
  }
}
```

### 修改状态
* 通过 **`this.setState({要修改的变量})`**
* setState方法作用
  * 修改state中的数据状态
  * 更新UI
* 思想
  * 数据驱动视图，只要修改数据状态，页面就会自动刷新，无需手动操作DOM。
* 注意事项
  * **不能直接修改`state`中的值，必须通过`setState`方法进行修改。**
```JSX
class Counter extends React.Component {
  state = {
    count: 0
  }
  changeCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <button onClick={this.changeCount}>{this.state.count}</button>
    )
  }
}
```
* **注意：**
  * 如果类组件中函数不去使用箭头函数定义，则this指向会变为undefined。
  * 解决方案：
    * 使用constructor进行this的绑定修改。
    ```JSX
    class Counter extends React.Component {
      constructor() {
        super()
        this.changeCount = this.changeCount.bind(this)
      }
      
      state = {
        count: 0
      }

      changeCount() {
        this.setState({
          count: this.state.count + 1
        })
      }
    }
    ```
    * onClick内部使用箭头函数修改
    ```JSX
    class Counter extends React.Component {
      state = {
        count: 0
      }

      changeCount() {
        this.setState({
          count: this.state.count + 1
        })
      }

      render() {
        return (
          <button onClick={()=>this.setState()}>{this.state.count}</button>
        )
      }
    }
    ```

### React状态不可变
> **不要直接去修改状态的值，而是基于当前状态创建新的状态值。**

* 错误的直接修改：
```JSX
state = {
  count : 0,
  list: [1,2,3],
  person: {
     name:'jack',
     age:18
  }
}
// 直接修改简单类型Number
this.state.count++
++this.state.count
this.state.count += 1
this.state.count = 1

// 直接修改数组
this.state.list.push(123)
this.state.list.spice(1,1)

// 直接修改对象
this.state.person.name = 'rose'
```

* 基于当前状态创建新值：
```JSX
this.setState({
  count: this.state.count + 1,
  list: [...this.state.list, 4],
  person: {
    ...this.state.person,
    name: 'Rose'
  }
})
```

## 表单处理
### 受控表单组件
:::tip
受控组件即 **可以被react状态控制的组件** <br/>
React组件状态存放处在state中，input表单元素自身状态在value中，React将state与表单元素的值（value）绑定在一起，由state的值来控制表单元素的值，从而保证数据单一性。
:::
* 实现步骤
  1. 在组件的state中声明组件的状态和数据。
  2. 将状态数据设置为input标签元素的value属性的值。
  3. 为input添加change事件，事件处理程序中，通过e.target获取到当前文本框值。
  4. 调用setState方法，将文本框值设置为state状态的值。
* 即Vue中v-model实现的逻辑。
```JSX
import React from 'react'
class Counter extends React.Component {
  state = {
    count: 'loading...'
  }

  changeCount = (e) => {
    this.setState({
      count: e.target.value
    })
  }

  render() {
    return (
      <>
        <input type="text" onChange={this.changeCount} value={this.state.count} />
        {this.state.count}
      </>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  )
}

export default App
```

### 非受控表单组件
> 非受控组件即通过手动操作DOM方式获取文本框的值，文本框的状态不受react组件的state中的状态控制，直接通过原生DOM获取输入的值。

* 实现步骤
  1. 导入`createRef`函数。
  2. 调用createRef函数，创建一个ref对象，存储到名为msgRef的实例属性中。
  3. 为input添加ref属性，值为msgRef。
  4. 在按钮的事件处理程序中，通过`msgRef.current`即可拿到input对应的DOM元素，而其中`msgRef.current.value`拿到的是文本框的值。
  
```JSX
import React, { createRef } from "react";

class Counter extends React.Component {
  msgRef = createRef()
  
  logMsg = () => {
    console.log(this.msgRef.current.value);
  }

  render() {
    return (
      <>
        <input type="text" ref={this.msgRef} />
        <button onClick={this.logMsg}>click</button>
      </>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Counter/>
    </div>
  )
}

export default App
```


## React组件间通信
