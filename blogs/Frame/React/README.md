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
组件是独立且封闭的单元，默认情况下组件只能使用自己的数据（state）<br/>
组件化开发的过程中，完整的功能会拆分多个组件，在这个过程中不可避免的需要互相传递一些数据 <br/>
为了能让各组件之间可以进行互相沟通，数据传递，这个过程就是组件通信 <br/>
  1. 父子关系
  2. 兄弟关系 - 自定义事件模式产生技术方法 eventBus / 通过共同的父组件通信
  3. 其他关系 - **mobx / redux / zustand**

### 父传子
**实现步骤：**
  1. 父组件提供需要传输的数据 - **state**
  2. 给子组件标签添加属性值为state中的数据
  3. 子组件通过 **props** 接收父组件传递过来的数据
    * 类组件使用 **this.props** 获取props对象。
    * 函数式组件直接通过 **props** 参数获取props对象。

![](/blog/img_react/props-1.png)

**代码实现：**
```JSX
import React from 'react'

function Son(props) {
  // 函数组件通过props参数获取数据
  return (
    <>
      <h1>函数组件 - {props.msg}</h1>
    </>
  )
}

class Son2 extends React.Component {
  // 类组件通过this.props获取数据
  render() {
    return (
      <>
        <h1>类组件 - {this.props.msg}</h1>
      </>
    )
  }
}

class App extends React.Component {
  state = {
    msg: 'this is a message.'
  }

  render() {
    return (
      <div className='App'>
        <Son msg={this.state.msg} />
        <Son2 msg={this.state.msg} />
      </div>
    )
  }
}

export default App
```

### props说明
1. **props是只读对象（readonly）**
根据单向数据流的要求，子组件只能读取props中的数据，不能进行修改。<br/>
`this.props.msg = 'new msg'`是非法修改。
2. **props可以传递任意数据**
数字、字符串、布尔值、数组、对象、JSX、函数。
```JSX
class App extends React.Component {
  state = {
    message: 'this is message'
  }
  render() {
    return (
      <div>
        <div>父组件</div>
        <FSon 
          msg={this.state.message} 
          age={20} 
          isMan={true} 
          cb={() => { console.log(1) }} 
          child={<span>this is child</span>}
        />
        <CSon msg={this.state.message} />
      </div>
    )
  }
}
```

### 子传父
> **父组件给子组件传递回调函数，子组件进行调用。**
**实现步骤：**
  1. 父组件提供一个回调函数，用于接收数据。
  2. 将函数作为属性的值，传递给子组件。
  3. 子组件通过props调用回调函数。
  4. 将子组件中的数据作为参数传递给回调函数。

**代码实现：**
```JSX
import React from 'react'

// 子组件
function Son(props) {
  function handleClick() {
    // 调用父组件传递过来的回调函数 并注入参数
    props.changeMsg('this is newMessage')
  }
  return (
    <div>
      {props.msg}
      <button onClick={handleClick}>change</button>
    </div>
  )
}


class App extends React.Component {
  state = {
    message: 'this is message'
  }
  // 提供回调函数
  changeMessage = (newMsg) => {
    console.log('子组件传过来的数据:',newMsg)
    this.setState({
      message: newMsg
    })
  }
  render() {
    return (
      <div>
        <div>父组件</div>
        <Son
          msg={this.state.message}
          // 传递给子组件
          changeMsg={this.changeMessage}
        />
      </div>
    )
  }
}

export default App
```

### 兄弟传值
> **通过状态提升机制，利用共同的父组件实现兄弟通信。**
**实现步骤：**
  1. 将共享状态提升到最近的公共父组件中，由公共父组件管理这个状态。
    * 提供共享状态
    * 提供操作共享状态的方法
  2. 要接收数据状态的子组件通过props接收数据。
  3. 要传递数据状态的子组件通过props接收方法，调用方法传递数据。

**代码实现：**
```JSX
import React from 'react'

// 子组件A
function SonA(props) {
  return (
    <div>
      SonA
      {props.msg}
    </div>
  )
}
// 子组件B
function SonB(props) {
  return (
    <div>
      SonB
      <button onClick={() => props.changeMsg('new message')}>changeMsg</button>
    </div>
  )
}

// 父组件
class App extends React.Component {
  // 父组件提供状态数据
  state = {
    message: 'this is message'
  }
  // 父组件提供修改数据的方法
  changeMsg = (newMsg) => {
    this.setState({
      message: newMsg
    })
  }

  render() {
    return (
      <>
        {/* 接收数据的组件 */}
        <SonA msg={this.state.message} />
        {/* 修改数据的组件 */}
        <SonB changeMsg={this.changeMsg} />
      </>
    )
  }
}

export default App
```

### 跨组件通信Context
> **利用Context来实现跨层级组件传值，无需为每层组件手动添加props，即可机械能传递。**
**实现步骤：**
  1. 创建Context对象，导出Provider和Consumer对象。
  ```JSX
      const { Provider, Consumer } = createContext()
  ```
  2. 使用Provider包裹上层组件提供数据。
  ```JSX
    <Provider value={this.state.message}>
      {/** 根组件 */}
    </Provider>
  ```
  3. 需要用到数据的组件使用Consumer包裹获取数据。
  ```JSX
    <Consumer>
      {value => /* 基于context进行渲染 */}
    </Consumer>
  ```

**注意：**
   * 上层组件和下层组件的关系是相对的，只要存在就可以使用。
   * 语法一般为固定的。提供位置必须为`value`提供数据。获取位置必须是`{value => ...}`形式。

**代码实现：**
```JSX
import React, { createContext } from 'react'

const { Provider, Consumer } = createContext()

function A() {
  return (
    <>
      <h4>this is A</h4>
      <C />
    </>
  )
}

function C() {
  return (
    <>
      <h4>this is C</h4>
      <Consumer>
        {value => <span>{value}</span>}
      </Consumer>
    </>
  )
}


class App extends React.Component {
  state = {
    msg: 'this is a message'
  }

  render() {
    return (
      <Provider value={this.state.msg}>
        <div className='App'>
          <A />
        </div>
      </Provider>
    )
  }
}

export default App
```

## React组件进阶
### children属性
> **children表示该组件的子节点，只要组件内部有子节点，则props就具有children属性。**

children使用方式类似于Vue中的插槽。若并列传递，则接收时children为数组。

**类型：** 
  1. 普通文本
  2. 普通标签元素
  3. 函数 / 对象
  4. JSX

```JSX
import React from 'react'

function A({ children }) {
  return (
    <>
      {children}<br />
      <span>hello</span>
    </>
  )
}

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <A>
          this is a A
        </A>
      </div>
    )
  }
}

export default App
```

### props检验
> **利用prop-types包对传入props值进行类型校验。**
类似于vue中的defineProps中进行类型的校验。

**实现步骤：**
  1. 安装属性校验包：`npm i prop-types`。
  2. 导入`prop-types`包。
  3. 使用`组件名.propTypes = {}`给组件添加校验规则。

**核心代码：**
```JSX
import PropTypes from 'prop-types'

const List = props => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item.name}</li>)
  return <ul>{lis}</ul>
}

List.propTypes = {
  colors: PropTypes.array
}
```

### props检验-规则说明
**四种常见结构**
  1. 常见类型：array、bool、func、number、object、string
  2. React元素类型：element
  3. 必填项：isRequired
  4. 特定的结构对象：shape({})

**核心代码**
```JS
// 常见类型
optionalFunc: PropTypes.func,
// 必填 只需要在类型后面串联一个isRequired
requiredFunc: PropTypes.func.isRequired,
// 特定结构的对象
optionalObjectWithShape: PropTypes.shape({
	color: PropTypes.string,
	fontSize: PropTypes.number
})
```

### props校验-默认值
> **通过`defaultProps`可以对组建的props设置默认值，在未传入props时生效。**
> 
#### 函数组件
**直接使用函数参数默认值**
```JSX
function List({pageSize = 10}) {
  return (
    <div>
      此处展示props的默认值：{ pageSize }
    </div>
  )
}
```

**使用`组件.defineProps`属性**
```JSX
function List({pageSize}) {
  return (
    <div>
      此处展示props的默认值：{ pageSize }
    </div>
  )
}
List.defineProps = {
  pageSize: 10
}
```

#### 类组件
> **使用类静态属性声明默认值，`static defaultProps = {}`**
```JSX
class List extends Component {
  static defaultProps = {
    pageSize: 10
  }
  render() {
    return (
      <div>
        此处展示props的默认值：{this.props.pageSize}
      </div>
    )
  }
}
<List />
```

## 生命周期
:::tip
**组建的生命周期是指组件从被创建到挂载到页面中运行起来，再到组件不用时卸载的过程。**<br/>
**注意：只有类组件才有生命周期！**
:::
![生命周期](/blog/img_react/life.png)

### 生命周期 - 挂载阶段
![挂载阶段](/blog/img_react/life1.png)

#### constructor
**触发时机**
* 创建组件时最先执行，初始化的时候只执行一次。

**作用**
1. 初始化state
2. 创建Ref
3. 使用bind解决this指向等

#### render
**触发时机**
* 每次组件渲染时触发。

**作用**
* 渲染UI结构，此中不能调用`setState`会造成页面重新绘制而造成死循环。

#### componentDidMount
**触发时机**
* 组件挂载时（完成DOM渲染后）执行，初始化时执行一次。
* 类似于Vue中的`Mounted`

**作用**
1. 发送网络请求
2. DOM操作

### 生命周期 - 更新阶段
![更新阶段](/blog/img_react/life2.png)

#### render
**触发时机**
* 每次组件渲染时都会触发。

**作用**
* 渲染UI（与挂载阶段的render是同一个render）

#### componentDidUpdate
**触发时机**
*  组件更新后触发（DOM渲染完毕）

**作用**
* 进行DOM操作，可以直接获取到更新后的DOM。
* 不能在此调用`setState`函数，会一直更新下去。
* 类似于Vue的Updated。

### 生命周期 - 卸载阶段
#### componentWillUnmount
**触发时机**
* 组件卸载（从页面消失）

**作用**
* 执行清理工作（清除定时器）

**如果组件中的数据会影响视图，则定义在`state`中，若不影响即可直接定义。（例如定时器参数）**

## Hooks基础

### Hooks概念
#### 1. 什么是Hooks
> **Hooks的本质：一套能够使函数组件更加强大，更加灵活的钩子。**
React体系内组件分为 **类组件** 和 **函数组件。** <br/>
函数组件是一个更加匹配React的设计理念 `UI = f(data)`，也更有利于逻辑拆分与重用的组件表达形式，而先前的函数组件是不可以有自己的状态的，为了能让函数组件可以拥有自己的状态，所以从react v16.8开始，Hooks应运而生。

**注意点：**
1. 有了hooks之后，为了兼容老版本，class类组件并没有被移除，俩者都可以使用
2. 有了hooks之后，不能在把函数成为无状态组件了，因为 **hooks为函数组件提供了状态**
3. **hooks只能在函数组件中使用**

#### 2. Hooks解决的问题
> Hooks的出现解决了两个问题：**1. 组件的逻辑状态复用。 2. 类组件本身的问题。**
1. 组件的逻辑复用
   在hooks出现之前，react先后尝试了 mixins混入，HOC高阶组件，render-props等模式
   但是都有各自的问题，比如mixin的数据来源不清晰，高阶组件的嵌套问题等等。
2. 类组件自身的问题
   class组件就像一个厚重的‘战舰’ 一样，大而全，提供了很多东西，有不可忽视的学习成本，比如各种生命周期，this指向问题等等，而我们更多时候需要的是一个轻快灵活的'快艇' 


### useState
> **useState为函数组件提供状态。**
#### 1.基础使用
**使用步骤**
1. 导入`useState`函数。
2. 调用`useState`函数，并传入状态的初始值。
3. 从`useState`函数的返回值中，拿到状态和修改状态的方法。
4. 在JSX中展示状态。
5. 调用下修改状态的方法更新状态。

**代码实现**
```JSX
import { useState } from 'react'

function App() {
  // 参数：状态初始值比如,传入 0 表示该状态的初始值为 0
  // 返回值：数组,包含两个值：1 状态值（state） 2 修改该状态的函数（setState）
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => { setCount(count + 1) }}>{count}</button>
  )
}
export default App
```

#### 2.状态的的读取和修改
**读取状态**
> **该方式提供的状态，是函数内部的局部变量，故可在函数内部的任意位置使用。**

**修改状态**
1. setCount是一个函数，参数表示最新的 **状态值**
2. 调用该函数后，将使用新值替换旧值。
3. 修改状态后，由于状态发生了变化，会引起视图变化。

**注意事项**
* 修改状态时，一定要使用新的的状态替换旧的状态，不能直接去修改修的状态，**尤其是引用类型！**

#### 3.组件的更新过程
* 组件第一次渲染
  1. 从头开始执行代码逻辑,传入参数作为状态初始值.
  2. 调用`useState(0)`将传入的阐述作为状态初始值,即0.
  3. 渲染组件.此时获取到的状态count值为0.

* 组件第二次渲染
  1. 点击按钮,调用`setCount(count+1)`修改状态,由于状态改变,则组件会重新渲染.
  2. 重新渲染,会再次执行代码逻辑.
  3. 再次调用`useState(0)`,此时React内部会拿到最新的状态值而非初始值.
  4. 在此渲染组件,此时获取的状态count值为1.

**注意:**
* **useState 的初始值(参数)只会在组件第一次渲染时生效.** 也就是说，以后的每次渲染，useState 获取到都是最新的状态值，React 组件会记住每次最新的状态值

```JSX
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  // 在这里可以进行打印测试
  console.log(count)
  return (
    <button onClick={() => { setCount(count + 1) }}>{count}</button>
  )
}
export default App
```

#### 4.使用规则
1. `useState`函数可以执行多次,且每次执行互相独立,每调用一次为函数组件提供一个状态.
```JSX
function List(){
  // 以字符串为初始值
  const [name, setName] = useState('cp')
  // 以数组为初始值
  const [list,setList] = useState([])
}
```

2. `useState`注意事项
  * 只能在函数组件或其他hook函数中使用.
  * 不能嵌套在`if`/`for`其他函数中(react按照hooks的调用顺序识别每一个hook)
```JSX
let num = 1
function List(){
  num++
  if(num / 2 === 0){
     const [name, setName] = useState('cp') 
  }
  const [list,setList] = useState([])
}
// 俩个hook的顺序不是固定的，这是不可以的！！！
```

### useEffect
**什么是副作用** <br/>
> 副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，**主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用（比如，手动修改 DOM）**

**常见的副作用** <br/>
1. 数据请求ajax发送
2. 手动修改DOM
3. localStorage操作

**`useEffect`函数的作用就是为React函数组件提供副作用处理的.**

**`useEffect`总会在DOM更新后执行.**

#### 1.基础使用
**作用**
> 为React函数组件提供副作用处理.

**使用步骤**
  1. 导入`useEffect`函数
  2. 调用`useEffect`函数,并传入回调函数.
  3. 在回调函数中编写副作用处理(dom操作)
  4. 修改数据状态
  5. 检测副作用是否生效

**代码实现**
```JSX
import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
 
  useEffect(()=>{
    // dom操作
    document.title = `当前已点击了${count}次`
  })
  return (
    <button onClick={() => { setCount(count + 1) }}>{count}</button>
  )
}

export default App
```

#### 2.依赖项控制执行时机
1. 不添加依赖项
> **组件首次渲染执行一次，以及不管是哪个状态更改引起组件更新时都会重新执行**<br/>
> 1. 组件初始化渲染
> 2. 组件更新

```JSX
useEffect(()=>{
    console.log('副作用执行了')
})
```

2. 添加空数组
> 组件只在首次渲染时执行一次.
```JSX
useEffect(()=>{
	 console.log('副作用执行了')
},[])
```

3. 添加依赖项
> **副作用函数在首次渲染时执行,在依赖项发送变化时重新执行.**
```JSX
function App() {  
    const [count, setCount] = useState(0)  
    const [name, setName] = useState('zs') 
    
    useEffect(() => {    
        console.log('副作用执行了')  
    }, [count])  
    
    return (    
        <>      
         <button onClick={() => { setCount(count + 1) }}>{count}</button>      
         <button onClick={() => { setName('cp') }}>{name}</button>    
        </>  
    )
}
```

**注意事项**
* useEffect 回调函数中用到的数据（比如，count）就是依赖数据，就应该出现在依赖项数组中，如果不添加依赖项就会有bug出现

#### 3.清理副作用
> 如果想要清理副作用 可以在副作用函数中的末尾return一个新的函数，在新的函数中编写清理副作用的逻辑<br/>
> 注意执行时机为：
> 1. 组件卸载时自动执行
> 2. 组件更新时,下一个useEffect副作用函数执行前自动执行.
```JSX
import { useEffect, useState } from "react"


const App = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timerId = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => {
      // 用来清理副作用的事情
      clearInterval(timerId)
    }
  }, [count])
  return (
    <div>
      {count}
    </div>
  )
}

export default App
```

## Hooks进阶
### useState - 回调函数的参数
**使用场景**
参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过计算才能获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用.
<br/>
类似于vue的computed.

**语法**
```JSX
const [data, setData] = useState(() => {
  // 编写计算逻辑, return计算之后的初始值
})
```

**语法规则**
1. 回调函数return出去的值将作为`data`的初始值.
2. 回调函数中的逻辑只会在组件初始化时执行一次.

**语法选择**
1. 如果就是初始化一个普通的数据 直接使用`useState(普通数据)`即可.
2. 如果要初始化的数据无法直接得到需要通过计算才能获取到，使用`useState(()=>{})`.

**代码示例**
```JSX
import { useState } from 'react'


function Names({ firstName, secondName }) {
  const [name, setName] = useState(() => {
    return firstName + secondName
  })
  return (
    <>
      <span>{name}</span>
      <button onClick={() => setName('error')}>click</button>
      <br />
    </>
  )
}

function App() {
  return (
    <div className="App" style={{ height: '1200px' }}>
      <Names firstName={'L'} secondName={'WH'} />
      <Names firstName={'Admin'} secondName={'Root'} />
    </div>
  )
}

export default App
```



### useEffect - 发送网络请求
**使用场景**
* 在`useEffect`中发送网络请求,封装同步`async await`操作.

**语法要求**
* 不可以直接在`useEffect`的回调函数外层直接包裹`await` ，因为**异步会导致清理函数无法立即返回**
```JSX
useEffect(async ()=>{    
    const res = await axios.get('http://geek.itheima.net/v1_0/channels')   
    console.log(res)
},[])
```

**正确写法**
```JSX
useEffect(()=>{   
    async function fetchData(){      
       const res = await axios.get('http://geek.itheima.net/v1_0/channels')                            console.log(res)   
    } 
},[])
```


### useRef
**使用场景**
* 在函数组件中获取真实的DOM元素对象或者是组件对象.

**使用步骤**
1. 导入`useRef`函数.
2. 执行`useRef`函数并传入null,返回值为一个对象,内部有`current`属性来存放拿到的DOM对象(组件实例).
3. 通过ref绑定要获取的元素或者组件.

**获取DOM**
```JSX
import { useEffect, useRef } from 'react'
function App() {  
    const h1Ref = useRef(null)  
    useEffect(() => {    
        console.log(h1Ref)  
    },[])  
    return (    
        <div>      
            <h1 ref={ h1Ref }>this is h1</h1>    
        </div>  
    )
}
export default App
```

**获取组件实例**
> **函数组件由于没有实例,故不能通过ref进行获取.**

```JSX
class Foo extends React.Component {  
    sayHi = () => {    
        console.log('say hi')  
    }  
    render(){    
        return <div>Foo</div>  
    }
}
    
export default Foo
```
```JSX
import { useEffect, useRef } from 'react'
import Foo from './Foo'
function App() {  
    const h1Foo = useRef(null)  
    useEffect(() => {    
        console.log(h1Foo)  
    }, [])  
    return (    
        <div> <Foo ref={ h1Foo } /></div>  
    )
}
export default App
```

### useContext
> 对于传统的Provider和Consumer的代替.
**实现步骤**
1. 使用`createContext`创建Context对象.
2. 在顶层组件中通过`Provider`提供数据.
3. 在底层组件中通过`useContext`函数获取数据.

**代码实现**
```JSX
import { createContext, useContext } from 'react'
// 创建Context对象
const Context = createContext()

function Foo() {  
    return <div>Foo <Bar/></div>
}

function Bar() {  
    // 底层组件通过useContext函数获取数据  
    const name = useContext(Context)  
    return <div>Bar {name}</div>
}

function App() {  
    return (    
        // 顶层组件通过Provider 提供数据    
        <Context.Provider value={'this is name'}>     
            <div><Foo/></div>    
        </Context.Provider>  
    )
}

export default App
```

# React Router
## 前置知识
### 1. 单页应用
> 只有一个html文件  主流的开发模式变成了通过路由进行页面切换 优势: 避免整体页面刷新  用户体验变好.

### 2. 路由本质
> 概念来源于后端 : 一个路径表示匹配一个服务器资源   /a.html   -> a对应的文件资源  /b.html -> b对应的文件资源<br/>
> 共同思想：一对一关系。<br/>
> 前端路由：一个路径path对应唯一一个组件component，当访问path时，自动将oath对应组件进行渲染。
```JS
const routes = [
  {
    path:'/home',
    component: Home
  },
   {
    path:'/about',
    component: About
  },
   {
    path:'/article',
    component: Article
  }
]
```

## 准备项目环境
> `create-react-app` -> `cra` -> `webpack`
```bash
# 创建react项目
$ yarn create vite react-router --template react

# 安装所有依赖包
$ yarn

# 启动项目
$ yarn dev

# 安装react-router包
$ yarn add react-router-dom@6
```

## 基础使用
```JSX
// 引入必要的内置组件
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// 准备俩个路由组件

const Home = () => <div>this is home</div>
const About = () => <div>this is about</div>

function App() {
  return (
    <div className="App">
      {/* 按照规则配置路由 */}
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
```

## 核心组件
### 1. BrowserRouter
> **作用：包裹整个应用，一个React应用只需要使用一次。**

| 模式 | 实现方式 | 路由url表现 |
| - | :-: | -: |
| HashRouter | 监听url hash值实现| http://localhost:3000/#/about |
| BrowerRouter | H5的 history.pushState实现 | http://localhost:3000/about |


* 类似与Vue中的路由模式
  ```js
  import { createRouter, createWebHashHistory } from 'vue-router'

  const router = createRouter({
    history: createWebHashHistory(), // hash模式
    history: createWebHistory(), // history模式
    routes: [
    //...
    ],
  })
  ```

### 2. Link
> **作用：用于指定导航链接。完成声明式路由跳转，类似于`router-link`**
![Link](/blog/img_react/router1.png)
**to属性用于指定路由地址，表示跳转位置，Link组件最终会被渲染成原生的a标签。**

### 3. Routes
> **作用：提供一个路由出口，组件内部会存在多个内置的Routes组件，满足条件的路由会被渲染到组件内部。类似于`router-view`**
![Routes](/blog/img_react/router2.png)

### 4. Route
> **作用：用于定义路由路径和渲染组件的对应关系。**
![Route](/blog/img_react/router3.png)
**其中path属性用来指定匹配的路径地址，element属性指定要渲染的组件。**

## 编程式导航
> **声明式 【Link to】  vs  编程式 【调用路由方法进行路由跳转】**<br/>
**概念：**
* 通过js编程的方式进行路由页面跳转。
* 核心：useNavigate函数。

**实现步骤**
1. 导入`useNavigate`钩子函数
2. 执行`useNavigate`函数得到跳转函数。
3. 在事件中执行跳转函数完成路由跳转。
```JSX
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      Home
      <button onClick={()=>navigate('/about')}>跳转至about页</button>
    </>
  )
}

export default Home
```

**如果在跳转时不想添加历史记录，则设置`replace`属性为true**
```JSX
<button onClick={()=>navigate("/about", {replace: true})}></button>
```


## 路由传参
### 1. searchParams传参
#### 路由传参
```JS
navigate('/about?id=1001')
```

#### 路由取参
```JS
let [params] = useSearchParams()
let id = params.get('id')
```

### 2. params传参
#### 路由传参
```JS
navigate('/about/1001')
```

#### 路由取参
```JS
let params = useParams()
let id = params.id
```

## 嵌套路由
* **直接在Route中继续嵌套Route即可。**
* **注意这里进行渲染出口，使用`Outlet`作为出口标识。** 类似于vue中的`router-view`

**示例代码**
```JSX
<Routes>
  <Route path="/"  element={<Layout/>}>
    <Route path="board" element={ <Board/> } />
    <Route path="article" element={ <Article/> } />
  </Route>
   { /* 省略部分  */ }
</Routes>
```
```JSX
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      layout
      { /* 二级路由的path等于 一级path + 二级path  */ }
      <Link to="/board">board</Link>
      <Link to="/article">article</Link>
      { /* 二级路由出口 */ }
      <Outlet/>
    </div>
  )
}
export default Layout
```

## 默认二级路由
> **即首次渲染时展示的二级路由，在vue中使用`redirect`进行操作。**
**react中使用`index`属性进行操作。**
```JSX
<Routes>
  <Route path="/"  element={<Layout/>}>
    <Route index element={ <Board/> } />
    <Route path="article" element={ <Article/> } />
  </Route>
</Routes>

import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      layout
      { /* 默认二级不再具有自己的路径  */ }
      <Link to="/">board</Link>
      <Link to="/article">article</Link>
      { /* 二级路由出口 */ }
      <Outlet/>
    </div>
  )
}
```
**默认进行渲染的二级路由在添加上index属性后，不需要写入自己的路径。to属性不再需要。**

## 404路由配置
> **即路由匹配规则到`*`时进行特殊处理。**
```JSX
const NotFound = () => {
  return <div>this is NotFound</div>
}

export default NotFound
```

```JSX
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Board />} />
      <Route path="article" element={<Article />} />
    </Route>
    <Route path="*" element={<NotFound />}></Route>
  </Routes>
</BrowserRouter>
```

## 集中式路由配置
> **整体配置路由的一些配置项，创建一个路由数组定义所有的路由对于关系。再使用`useRoutes`方法生成Routes组件，最后使用Routes组件代替之前的Routes组件。**
```JSX
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom'

import Layout from './pages/Layout'
import Board from './pages/Board'
import Article from './pages/Article'
import NotFound from './pages/NotFound'

// 1. 准备一个路由数组 数组中定义所有的路由对应关系
const routesList = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Board />,
        index: true, // index设置为true 变成默认的二级路由
      },
      {
        path: 'article',
        element: <Article />,
      },
    ],
  },
  // 增加n个路由对应关系
  {
    path: '*',
    element: <NotFound />,
  },
]

// 2. 使用useRoutes方法传入routesList生成Routes组件
function WrapperRoutes() {
  let element = useRoutes(routesList)
  return element
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* 3. 替换之前的Routes组件 */}
        <WrapperRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
```
