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
* **优势：**① 开发环境中，无需打包，可快速冷启动。② 轻量快速的热重载（HMR）③ 真正的按需编译，无需等待整个应用编译完成。
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