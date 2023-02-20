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
* 通常情况下，实际开发中需要使用构建工具对代码进行打包。
* 步骤：
  * **1.初始化项目：**
    * 进入项目根目录，执行命令`npm init -y`。
    * 自动创建`package.json`
  * **2.下载构建工具：**
    * ```bash
        npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin html-webpack-plugin
      ```
    * 安装包功能：
      * **webpack：** 构建工具webpack
      * **webpack-cli：** webpack的命令行工具
      * **webpack-dev-server：** webpack的开发服务器
      * **typescript：** ts编译器
      * **ts-loader：** ts加载器，用于在webpack中编译ts文件
      * **html-webpack-plugin：** webpack中的html插件，同于自动创建html文件。
      * **clean-webpack-plugin：** webpack中的清除插件，每次构建都会先清除目录。  
  * **3.根目录下创建`webpack.config.js`配置文件**
    * ```js
        const path = require('path')
        const HTMLWebpackPlugin = require('html-webpack-plugin')
        const { CleanWebpackPlugin } = require('clean-webpack-plugin')

        module.exports = {
          // 指定入口文件
          entry: "./src/index.ts",

          // 指定打包文件所在目录
          output: {
            // 指定目录
            path: path.resolve(__dirname, 'dist'),
            // 指定文件名
            filename: 'bundle.js'
          }

          // 指定webpack打包时使用的模块
          modules: {
            // 指定加载规则
            rules: [
              {
                // 指定规则生效的文件
                test: /\.ts$/,
                // 指定使用的loader
                use: 'ts-loader',
                // 指定要排除的文件
                exclude: /node-modules/
              }
            ]
          },

          // 指定webpack使用的插件
          plugins: {
            // 自动清除dist目录下的文件
            new CleanWebpackPlugin(),
            // 自动生成HTML文件
            new HTMLWebpackPlugin({
              title:'自定义名称',
              // 指定生成html文件的模板
              template: './src/index.html'
            })
          },

          // 设置引用的模块
          resolve: {
            extensions: [".ts", ".js"]
          }
        }
      ``` 
  * **4.根目录下创建`tsconfig.json`**
    * ```json
        {
          "compilerOptions": {
            "target": "ES2015",
            "module": "ES2015",
            "strict": true
          }
        }
      ```
  * **5.增加`package.json`下的配置**
    * ```json
        "strict": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "build": "webpack --mode development",
          "start": "webpack serve --open --mode development"
        }
      ``` 
  * **6.在src下创建ts文件，命令行执行`npm run build`对代码编译，或执行`npm start`启动开发服务器**（类似vscode插件live-server）

## Babel
**开发中需要使用`Babel`来对代码进行转换，使其可以兼容到更多的浏览器。**
* 1.安装依赖包
  * `npm i -D @babel/core @babel/preset-env babel-loader core-js`
  * 共安装了四个包，分别是：
    * **@babel/core**
      * babel的核心工具
    * **@babel/preset-env**
      * babel的预定义环境
    * **babel-loader**
      * babel在webpack中的加载器
    * **core-js**
      * core-js用来使老版本的浏览器支持新版ES语法。       
* 2.修改`webpack.config.js`配置文件
  * ```js
      module.exports =  {
        //上述省略
        modules: {
          rules: [
            test: /\.ts$/,
            use: [
              {
                // 指定加载器
                loader: "babel-loader",
                // 设置babel
                options: {
                  // 设置babel的预定义环境
                  preset: [
                    // 指定环境的插件
                    "@babel/preset-env",
                    { 
                      // 要兼容的目标浏览器版本
                      "targets": {
                        "chrome": "88",
                        "ie": "11"
                      },
                      // 指定corejs版本
                      "corejs": "3",
                      // 指定使用corejs为按需引入
                      "useBuiltIns": "usage",
                    }
                  ]
                }
              }
            ]
          ]
        }
    ```
* 配置完成后，使用ts编译的文件则会再次被Babel进行处理，使代码可以在大部分浏览器中直接使用。`targets`配置项用于指定兼容的浏览器版本。

# 面向对象

## 类（class）
类即为对象的模型，要创建对象，必须先要创建类。
* **定义类：**
  * ```ts
      class 类名 {
        属性名: 类型; 

        constructor(参数:类型) {
          this.属性名 = 参数;
        }

        方法名() {
          ...
        }
      }
    ``` 
* **属性前加`readonly`代表只读属性，加`static`代表静态属性，什么都不加则为实例属性。**
* **示例：**
  * ```ts
      class Person {
        name: string;
        age: number;
        static sex: string = 'male'

        constructor(name:string, age: number) {
          this.name = name;
          this.age = age;
        }

        sayHello() {
          console.log(`Hello, I am ${this.name}!`);
        }
      }
    ``` 
* **使用类：**
  * ```ts
      const p = new Person('lwh', 18);
      p.sayHello();
    ``` 

### 构造函数
**`constructor`** 方法定义，每次创建对象实例时调用，其内部`this`代表当前对象实例。
```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

:::tip
**定义类的简便写法：**
```ts
class Obj {
  constructor(public name: string, public: number) {
    this.name = name;
    this.age = age;
  }
  // 此时不需要在外部定义属性
}
```
:::

## 面向对象的特点
### 封装
* 对象实质上是属性和方法的容器，用于存储属性和方法。
* 默认情况下，对象的属性和方法可以任意修改，为保证数据安全性，可以对属性和方法添加修饰符。
* **只读属性readonly**
  * 若在声明属性时添加readonly，则属性变为只读属性后续无法修改。

* TS中具有三种修饰符：
  * **public：** 默认情况下的修饰符，可以在任意位置对属性或方法进行访问或修改。
  * **private：** 私有修饰符，只能在当前类中对属性或方法进行访问或修改。
  * **protected：** 修饰受保护的属性，只能在当前类或子类中对属性或方法进行访问或修改。
  * 实例：
    * public：
      * ```ts
          class Person {
            public name: string; // 写或什么都不写都是public
            public age: number;

            constructor(name: string, age: number){
              this.name = name; // 可以在类中修改
              this.age = age;
            }

            sayHello(){
              console.log(`大家好，我是${this.name}`);
            }
          }

          class Employee extends Person{
          constructor(name: string, age: number){
              super(name, age);
              this.name = name; //子类中可以修改
            }
          }

          const p = new Person('孙悟空', 18);
          p.name = '猪八戒';// 可以通过对象修改
        ``` 
    * protected:
      * ```ts
          class Person{
              protected name: string;
              protected age: number;

              constructor(name: string, age: number){
                this.name = name; // 可以修改
                this.age = age;
              }

              sayHello(){
                  console.log(`大家好，我是${this.name}`);
              }
            }

          class Employee extends Person{

              constructor(name: string, age: number){
                  super(name, age);
                  this.name = name; //子类中可以修改
              }
          }

          const p = new Person('孙悟空', 18);
          p.name = '猪八戒';// 不能修改         
        ``` 
    * private:
      * ```ts
          class Person {
            private name: string;
            private age: number;

            constructor(name: string, age: number) {
              this.name = name;
              this.age = age;
            }

            sayHello() {
              console.log(`大家好我是${this.name}`)
            }
          }

          class Employee extends Person {
            constructor(name: string, age: number) {
              super(name, age);
              this.name = name; // 子类中不能修改
            }
          }

          const p = new Person('孙悟空', 18);
          p.name = '猪八戒'; // 不能修改
        ``` 

* **属性存取器**
  * 在类中定义一组用于读取、设置属性的方法，称之为属性的存取器。
  * 读取属性的叫做getter方法，修改属性的方法叫做setter方法。
  * 示例：
    * ```ts
        class Person {
          private _name: string;
          
          constructor(name: string) {
            this._name = name;
          }

          get name() {
            return this._name;
          }

          set name(value) {
            this._name = value;
          }
        }

        const p = new Person('lwh')l
        console.log(p.name); // 通过getter方法读取name属性
        p.name = 'zzz'; // 通过setter方法设置name属性
      ``` 

* **静态属性**
  * 静态属性（方法），又称为类属性。使用静态属性无需创建实例，可通过类直接使用。
  * 使用`static`关键字定义开头。
  * 示例：
    * ```ts
        class Tools {
          static PI = 3.1415926;

          static sum(num1: number, num2: number) {
            return num1 + num2;
          }
        }

        console.log(Tools.PI);
        console.log(Tools.sum(123, 456));
      ``` 


### 继承 
* 通过继承`extends`可以将其它类中的属性和方法引入到当前类中，可以在不修改类的情况下实现对类的扩展。
* 示例：
  * ```ts
      class Animal {
        constructor(public name: string, public age: number) {
          this.name = name;
          this.age = age;
        }
      }

      class Dog extends Animal {
        constructor(name: string, age:number, public sex: string) {
          super(name, age);
          this.sex = sex;
        }
      }

      const dog1 = new Dog('旺财', 4, 'male');
    ``` 

* **重写：**
  * 发生继承时，子类中与父类同名的方法会发生替换。
  * 示例：
    * ```ts
        class Animal {
          constructor(public name: string) {
            this.name = name;
          }
          sayHello() {
            console.log('Hello!')
          }
        }

        class Dog extends Animal {
          sayHello() {
            console.log(`Hello, ${this.name}`)
          }
        }
      ``` 

* **抽象类**
  * 抽象类是专门用来被其它类所继承的类，只能被其他类继承，不能创建自身实例对象。
  * 使用`abstract`开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现
  * ```ts
      abstruct class Animal {
        // 抽象类中的抽象方法只能定义方法名而无方法体！
        abstruct run(): void;
        bark() {
          console.log('动物在叫!')
        }
      }

      class Dog extends Animal {
        // 子类必须实现抽象类中的抽象方法！
        run() {
          console.log('狗在跑!')
        }
      }
    ```

## 接口（interface）
**接口类类似于抽象类，但<strong style="color:orange">接口中所有方法和属性都不具有实值</strong>，即接口中所有方法都为抽象方法。**
* 接口主要负责定一个类的结构，用于去限制一个对象的结构。
* 对象只有包含接口中所有的属性和方法时才能匹配接口。
* 实现类去实现接口时，要保护接口中的所有属性和方法。
* 示例（检查对象类型）：
  * ```ts
      interface Person {
        name: string;
        age: number;
        sayHello() :void;
      }

      function fn(per: Person) {
        per.sayHello();
      }

      fn({'lwh', 18, sayHello() {console.log(`Hello! I am ${this.name}~`)}});

      // 类似于描述对象类型
      type myType = {
        name: string;
        age: number;
      }

      const obj: myType = {
        name: 'lwh',
        age: 18
      }
    ``` 
* 示例（实现）
  * ```ts
      interface Person {
        name: string;
        sayHello(): void;
      }

      class Student implements Person {
        constructor(public name: string) {
          this.name = name;
        }
        sayHello() {
          console.log('Hello Vue!');
        }
      }
    ``` 