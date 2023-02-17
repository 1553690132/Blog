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
  * 类型[]声明：
    * ```ts
      let list: number[] = [1, 2, 3];
      ``` 
  * Array<类型>声明：
    * ```ts
      let list: Array<string> = ['a', 'b', 'c'];
      ``` 
* **tuple**
  * **元组**：为固定长度的数组，语法：[类型，类型]。
  * ```ts
      let list: [string, number];
      list = ['hello', 666];
    ```
* **enum**
* **枚举**：用于给变量设置范围值。
  * ```ts
      enum Gender {
        Male,
        Famale
      };

      let person: {name: string, gender: Gender};

      person = {'lwh', Gender.Male}

      enum Color {
        Red,
        Yellow,
        Blue
      };

      let c: Color = Color.Red;
    ```
* `|`可以声明不同类型，`&`也可以进行声明，代表同时符合，一般仅在声明对象时使用。
  * ```ts
      let obj: {name: string} & {age: number};
      // 与直接声明功能相同
      let obj2: {name: string, age: number}
    ``` 
* **类型的别名**
  * 对于冗长的类型，使用**别名**进行代替。
  * ```ts
      type myType = 1 | 2 | 3;
      let a: 1 | 2 | 3;
      let b: myType;
      // b的类型与a一致，均为 1 | 2 | 3。
    ``` 

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

## 编译选项
### 自动编译文件
* 编译文件时，使用`-w`指令后，TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。相当于`nodemon`
* 示例：`ts xxx.ts -w`
  
### 自动编译整个项目
* 若直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件。
* 直接使用tsc指令全局编译的前提是配置`tsconfig.json`文件。
* `tsconfig.json`是一个JSON文件，添加配置文件后，只需只需 tsc 命令即可完成对整个项目的编译
* 配置选项：
  * <strong style="color:red">include</strong> 
    * 定义希望被编译的文件所在目录。
    * 默认值：`["**/*"]`，`**`为任意文件夹，`*`为任意文件名。
    * 示例：
      * ```json 
          "include":["src/**/*", "tests/**/*"]
        ```   
    * src 和 tests目录下的文件都会被编译。
  * <strong style="color:red">exclude</strong>
    * 定义需要被排除在外的目录。
    * 默认值：`["**/*"]`
    * 示例：
      * ```json 
          "exclude":["src/**/*", "tests/**/*"]
        ``` 
    * src和 tests目录下的文件都不会被编译。
  * <strong style="color:red">extends</strong>
    * 定义被继承的配置文件。
    * 默认值：`["node_modules","bower_components"]`
    * 示例：
      * ```json
          "extends": "./configs/base"
        ```  
    * 当前配置文件会自动包含config目录下base.json中的所有配置文件。
  * <strong style="color:red">files</strong>
    * **指定被编译文件的列表**，只有需要编译的文件少时才会用到。
    * 示例：
      * ```json
          "files:" [
            "core.ts",
            "sys.ts",
            "types.ts",
            "scanner.ts"
          ]
        ``` 
    * 列表中的文件都会被TS编译器所编译。
  * <strong style="color:red">compilerOptions</strong>
    * 编译选项是配置文件中的核心选项。
    * `compilerOptions`中包含多个子选项，用来配置编译。
    * 项目选项：
      * <strong style="color:red">target</strong>
        * 设置ts代码编译的目标版本。
        * 可选值： 
          * ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext
        * 示例：
          * ```json
              "compilerOptions": {
                "target": "ES6"
              }
            ```    
          * 如上配置，ts代码将会被编译为ES6版本的js代码。
      * <strong style="color:red">lib</strong>
        * 配置代码运行时所包含的库（宿主环境）
        * 可选值：
          * ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......
        * 示例：
          * ```json
              "compilerOptions": {
                "lib": ["DOM", "ES6"]
              }
            ``` 
      * <strong style="color:red">module</strong>
        * 设置编译后代码使用的模块化系统。
        * 可选值：
          * CommonJS、UMD、AMD、System、ES2020、ESNext、None
        * 示例：
          * ```json
              "compilerOptions": {
                "module": "CommonJS"
              }
            ```
      * <strong style="color:red">outDir</strong>
        * 设置编译后文件所在目录。
        * 默认情况下，ts文件和编译后js文件会处于相同的目录，设置outDir可以改变位置。
        * 示例：
          * ```json
              "compilerOptions": {
                "outDir": "dist"
              }
            ```  
          * 设置后编译的js文件将会处于dist文件夹内。
      * <strong style="color:red">outFile</strong>
        * 将所有的ts文件编译为一个js文件。
        * 默认会将所有编写在全局作用域中的代码合并为一个js文件，如果`module`指定了`None`、`System`、`AMD`则会将模块一起合并到文件中。
        * 示例：
          * ```json
              "compilerOptions": {
                "outFile": "dist/app.js"
              }
            ```   
      * <strong style="color:red">rootDir</strong>
        * 指定代码的根目录，默认情况下编译后的文件的目录结构会以最长的公共目录为根目录，通过rootDir手动指定根目录。
        * 示例：
          * ```json
              "compilerOptions": {
                "rootDir": "./src"
              }
            ```    
      * <strong style="color:red">allowJs</strong>
        * 是否对js文件进行编译（默认为false）
      * <strong style="color:red">checkJs</strong>
        * 是否对js文件进行检查（默认为false）
          * 示例：
          * ```json
              "compilerOptions": {
                "allowJs": true,
                "checkJs": true
              }
            ```     
      * <strong style="color:red">removeComments</strong>
        * 是否删除注释。
        * 默认值：false
      * <strong style="color:red">noEmit</strong>
        * 不生成编译后文件
        * 默认值：false
      * <strong style="color:red">noEmitOnError</strong>
        * 当有错误时不生成编译后js文件。   
        * 默认值：false
      * <strong style="color:red">sourceMap</strong>
        * 是否生成sourceMap
        * 默认值：false
    * 严格检查
      * <strong style="color:red">strict</strong>
        * 启用所有的严格检查，默认为`true`，设置后相当于开启了所有的严格检查。
      * <strong style="color:red">alwaysStrict</strong>
        * 总是以严格模式对代码编译。
      * <strong style="color:red">noImplicitAny</strong>
        * 禁止隐式的any类型。
      * <strong style="color:red">noImplicitThis</strong>
        * 禁止类型不明确的this。
      * <strong style="color:red">strictBindCallApply</strong>
        * 严格检查`apply`、`bind`、`call`的参数列表。  
      * <strong style="color:red">strictFunctionTypes</strong>
        * 严格检查函数的类型。
      * <strong style="color:red">strictNullChecks</strong> 
        * 严格检查空值。     
      * <strong style="color:red">strictPropertyInitialization</strong>
        * 严格检查属性是否初始化。    
    * 额外检查
      * <strong style="color:red">noFallthroughCasesInSwitch</strong>
        * 检查switch语句是否包含正确的break。
      * <strong style="color:red">noImplicitReturns</strong>
        * 检查函数是否有隐式的返回值。
      * <strong style="color:red">noUnusedLocals</strong>
        * 检查未使用的局部变量。
      * <strong style="color:red">noUnusedParameters</strong>
        * 检查未使用的参数。
    * 高级选项
      * <strong style="color:red">allowUnreachableCode</strong>
        * 检查不可达代码。
        * 可选值：
          * true：忽略不可达代码。
          * false：不可达代码将引起错误。
      * <strong style="color:red">noEmitOnError</strong>  
        * 有错误的情况下不进行编译。
        * 默认值：false



## WebPack

## Babel
