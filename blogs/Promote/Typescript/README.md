---
title: TypeScript
date: 2023-02-16
tags:
- TS
categories:
- Promote
sidebar: auto
---

## TypeScript简述
* 以JavaScript为基础构建的语言。
* 是JavaScript的超集。
* 可以在任何支持JavaScript的平台中执行。
* TypeScript扩展了JavaScript，并添加了<strong style="color:red">类型</strong>
![TypeScript的增加](/blog/img_typescript/1.png)

## TypeScript开发环境搭建
* 下载Node.js。
* 使用npm全局安装typescript：`npm i -g typescript`
* 创建ts文件。
* 使用`tsc`对ts文件进行编译。
  * 使用命令行进入ts文件所在目录。
  * 执行命令：`tsc xxx.ts`

## 基本类型
### 类型声明
* 类型声明是TS最重要的特点之一。
* 通过类型声明可以指定TS中变量（参数、形参）的类型。
* 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值、否则报错。
* 语法：
```ts
let 变量: 类型;

let 变量: 类型 = 值;

function fn(参数: 类型, 参数: 类型): 类型 {
  ...
}
```

### 自动类型判断
* TS又有自动的类型判断机制
* 当对**变量的声明和赋值是同时进行**的，TS编译器会自动判断变量的类型。
* 故当变量的声明和赋值是同时进行时，可以省略类型声明。

### 类型
![类型](/blog/img_typescript/2.png)

* **number**
```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```
* **boolean**
```ts
let isDone: boolean = false;
```
* **string**
```ts
let color: string = "blue";

let fullName: string = `Bob`;
let age: number = 18;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month!`
```
* **字面量**
  * 可以使用字面量去指定变量的类型，通过字面量和`|`可指定变量的取值范围。 
  * ```ts
    let color: 'red' | 'blue' | 'black';
    let num: 1 | 2 | 3 | 4 | 5;
    ```
* **any**
  * `any`表示为任意类型，变量被设置为`any`类型，相当于关闭了TS对此变量的类型检测。
  * 若声明变量未指定类型且未赋值，则TS会自动设置为`any`类型。
  * ```ts
    let d: any = 4;
    d = 'hello';
    d = true;
    ```
* **unknown**
  * `unknown`表示为未知类型的值，实际上就是安全类型的any。
  * ```ts
    let notSure: unknown = 4;
    notSure = 'hello';
    ```
:::tip
TS中`any`类型的变量可以赋值给任意变量，而`unknown`则不行。
```ts
let a: any = 10;
let b: string;
let c: unknown;
b = a; // 可以赋值
b = c; // 报错！
```
:::
* **void**
  * ```ts
    let unusable: void = undefined;
    ```
* **never**
  * `never`代表永远不会有返回结果。
  * ```ts
    function fn(msg: string): never {
      // 直接抛出异常，不会返回具体结果
      throw new Error('error!')
    }
    ```
* **object**
  * object表示一个js对象，可以是`{}`，也可以是fuction。
  * `{}`可以用来指定对象中包含哪些属性，<strong style="color:red">属性后加`?`代表属性是可选的</strong>
    * ```ts
      let obj: {name: string, age?: number};
      // 这样在赋值对象时，age属性可有可无，但name属性必须有。
      obj = {name: 'lwh'};
      ``` 
  * 在对对象进行限制时，利用`[propName:string]:any`设置个数可变的参数。
    * ```ts
      let obj: {name: string, [propName: string]: any};
      // [prop: string]: any 代表参数名类型为string，参数类型为任意值。
      ```
  * 同样可以对函数变量设置限制
    * ```ts
      let fn: (data1: number, data2: number) => number;
      // 此时fn变量为函数，且参数必须有两个均为number变量，返回类型也为number变量。
    ```
* **array**
* **tuple**
* **enum**

### 类型断言
* 有些情况下，变量的类型对于程序员明确，但TS解析器不清楚。此时，需要通过`类型断言`来告诉编译器变量的类型，(使用类型断言就可以做到`unknown`类型数据给变量赋值)。断言有以下两种形式：
  * 第一种：**变量 as 类型**
    * ```ts
      let someValue: unknown = "this is a string";
      let strLength: number = (someValue as string).length;
      ``` 
  * 第二种：**<类型> 变量**
    * ```ts
      let someValue: unknown = "this is a string";
      let strLength: number = (<string>someValue).length;
      ```
