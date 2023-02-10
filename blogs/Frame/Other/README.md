---
title: Vue项目中的一些问题
date: 2023-02-10
tags:
- Vue
categories:
- Frame
---

:::tip
本文总结一些Vue项目开发中出现的奇葩错误。
:::

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