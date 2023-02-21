---
title: TypeScript项目
date: 2023-02-20
tags:
- Project
categories:
- Promote
---

# Typescript项目---贪吃蛇

## 项目搭建
* 创建`tsconfig.json`文件，配置typescript属性。
```json
{
    "compilerOptions": {
        "module": "ES2015",
        "target": "ES2015",
        "strict": true,
        "noEmitOnError": true
    }
}
```
* npm初始化项目 `npm init -y`并导入相关包
* 创建src文件夹、入口文件`index.ts`、style样式文件目录等。
* npm引入`postcss postcss-loader postcss-preset-env`等插件，用于样式文件的兼容性。
* 配置`webpack.config.js`文件
```js
    // 上述省略
    module.exports = {
        modules: {
            rules: [
                // 设置less文件的处理
                {
                    test: /\.less$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                    ]
                }
            ]
        }
    }
```

## 项目界面
* 绘制HTML结构
```html
<div id="main">
        <div id="stage">
            <div id="snake">
                <div></div>
                <div></div>
            </div>
            <div id="food">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div id="score-panel">
            <div>SCORE:<span id="score">0</span></div>
            <div>LEVEL:<span id="level">1</span> </div>
        </div>
    </div>
```
* 设置样式
```less
@bg-color: #b7d4a8;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font: bold 20px "Courier";
}

#main {
    width: 340px;
    height: 420px;
    background-color: @bg-color;
    margin: 100px auto;
    border: 10px solid #000;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

#stage {
    position: relative;
    width: 304px;
    height: 304px;
    border: 2px solid #000;

    #snake {
        &>div {
            width: 10px;
            height: 10px;
            background-color: #000;
            // 🐍身体间隙
            border: 1px solid @bg-color;
            // 开启绝对定位使🐍后续移动
            position: absolute;
        }
    }

    &>#food {
        width: 10px;
        height: 10px;
        position: absolute;
        display: flex;
        top: 40px;
        left: 100px;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;

        &>div {
            width: 4px;
            height: 4px;
            background-color: #000;
            transform: rotate(45deg);
        }
    }
}

#score-panel {
    display: flex;
    width: 300px;
    justify-content: space-between;
}
```

## Food类
* 定义food类时，需要使用food在页面中的元素对象，所以需要定义HTMLElement类型值。
* 使用`document.getElementById('food')`找出原生对象后，对其进行类型断言`as HTMLElement`。
* 食物的横纵坐标即为food元素的`offsetLeft`与`offsetTop`偏移量。
* 对于食物的坐标更新，其横纵坐标须随机生成且在stage范围内即0~290px。
```js
let top = Math.round(Math.random() * 29) * 10;
let left = Math.round(Math.random() * 29) * 10;
```
* 由于offsetLeft与offsetTop为只读属性，故修改需要使用style下的left和top属性操作。
```ts
class Food {
    element: HTMLElement;

    constructor() {
        // 获取页面food元素并将其赋值给element
        this.element = document.getElementById('food') as HTMLElement;
    }

    // 获取食物坐标
    get X() {
        return this.element.offsetLeft;
    }

    get Y() {
        return this.element.offsetTop;
    }

    // 修改食物位置
    change() {
        // 食物坐标必须是十的倍数且在stage的范围内
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}
```

## ScorePanel类
* 与Food类设计思路一致，先获取分数和关卡元素，再对其进行后续操作。
```ts
class ScorePanel {
    score: number = 0;
    level: number = 1;

    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    maxLevel: number;
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score') as HTMLElement;
        this.levelEle = document.getElementById('level') as HTMLElement;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 升级和过关方法
    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';
        if(this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    levelUp() {
        if(this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
}
```

## Snake类初始化
* 蛇类需要进行身体增加，坐标获取等信息，这里先初步定义。
```ts
class Snake {
    element: HTMLElement;
    headEle: HTMLElement;
    bodyEle: HTMLCollection;
    // 蛇身体为HTML集合类型

    constructor() {
        this.element = document.getElementById('snake') as HTMLElement;
        this.headEle = document.querySelector('#snake > div') as HTMLElement;
        this.bodyEle = this.element.document.getElementsByTagName('div') as HTMLElement;
    }

    get X() {
        return this.headEle.offsetLeft;
    }

    get Y() {
        return this.headEle.offsetTop;
    }

    set X(value: number) {
        this.headEle.style.left = value + 'px';
    }

    set Y(value: number) {
        this.headEle.style.top = value + 'px';
    }

    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }
}
```

## 键盘事件使蛇移动
* 创建整体控制类GameControl，用于对其他类的整合。
```ts
import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    direaction: string = '';

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    init() {    
        // bind函数保证回调函数的this指向仍然为GameControl类
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    run() {
        switch(direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }
    }


    keydownHandler(event: KeyBoardEvent) {
        this.direction = event.key;
    }
}
```

## 碰撞与吃食检测
* 对`GameControl.ts`文件进行完善，使当前蛇在按下键盘后开始自动移动。
* 碰撞检测在`Snake.ts`中进行，在蛇头的横纵坐标发生变化时判断抛出异常。
* 碰撞情况即下一步位置超过0或290像素，且发生碰撞后游戏结束。
* 吃到食物时，蛇身增加、分数增加、食物重新生成。
* `GameControl`类
```ts
import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    direaction: string = '';
    isAlive: boolean = true;
    speed: number = 330;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }

    init() {    
        // bind函数保证回调函数的this指向仍然为GameControl类
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch(direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }
        checkEat(X, Y);

        try {
            this.snake.X = X;
            this.sname.Y = Y;
        } catch(error) {
            alert('GAME OVER');
            isAlive = false;
        }

        // 蛇存活时继续进行移动，且direction为当前方向继续移动。
        isAlive && setTimeOut(this.run.bind(this), this.speed - this.scorePanel.level * 30);
    }

    keydownHandler(event: KeyBoardEvent) {
        this.direction = event.key;
    }

    checkEat(x: number, y:number) {
        if(x === this.food.X && y === this.food.Y) {
            this.snake.addBody();
            this.food.change();
            this.scorePanel.addScore();
        }
    }
}
```

* `Snake`类
```ts
class Snake {
    // 上述代码省略

    set X(value: number) {
        if(value < 0 || value > 290) {
            throw new Error('发生碰撞');
        }
        this.headEle.style.left = value + 'px';
    }

    set Y(value: number) {
        if(value < 0 || value > 290) {
            throw new Error('发生碰撞');
        }
        this.headEle.style.top = value + 'px';
    }

}
```

## 最后完善
* 蛇的移动，即蛇身需要跟随蛇头移动。采取从后往前改变位置的方式进行（链表思想，确保数据未丢失）。
* 蛇不能移动反方向，即蛇当有身体时不可能直接向反方向移动，需要另做判断。
```ts
class Snake {
    // 上述代码省略
    // 公共部分抽离为方法
    set X(value: number) {
        configLocation(this.X, value, 'x');
    }

    set Y(value: number) {
        configLoaction(this.Y, value, 'y');
    }

    configLoaction(coordinate: number, distance: number, direction: string) {
        // 若当前X或Y未改变直接返回，减少操作。
        if(coordinate === distance) return ;
        if(distance < 0 && distance > 290) {
            throw new Error('碰撞');
        }
        if(direction === 'x') {
            // 判断有身子时，不能直接逆向走。
            if(this.bodysEle[1] && (this.bodysEle as HTMLElement).offsetLeft === distance) {
                distance > this.X ? distance = this.X - 10 : distance = this.X + 10;
            }
            this.moveBody();
            this.headEle.style.left = distance + 'px'; 
        } else {
            if(this.bodysEle[1] && (this.bodysEle as HTMLElement).offsetTop === distance) {
                distance > this.Y ? distance = this.Y - 10 : distance = this.Y + 10;
            }
            this.moveBody();
            this.headEle.style.top = distance + 'px';
        }
        this.checkHeadBody();
    }

    // 身体移动方法
    moveBody() {
        for(let i = this.bodysEle.length - 1; i > 0; i--) {
            let preX = (this.bodysEle[i - 1] as HTMLElement).offsetLeft;
            let preY = (this.bodysEle[i - 1] as HTMLElement).offsetTop;
            (this.bodysELe[i] as HTMLElement).style.left = preX + 'px';
            (this.bodysELe[i] as HTMLElement).style.top = preY + 'px';
        }
    }

    // 检查头部碰撞
    checkHeadBody() {
        for(let i = 1; i < this.bodysELe.length; i++) {
            let x = (this.bodysEle[i] as HTMLElement).offsetLeft;
            let y = (this.bodysEle[i] as HTMLElement).offsetTop;
            if(this.X === x && this.Y === y) {
                throw new Error('头部和身体发生碰撞!');
            }
        }
    }
}
```


<a href="https://github.com/1553690132/WebStudy_promote/tree/main/Typescript/part5_snake" style="font-weight:700">项目地址</a>