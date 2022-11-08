---
title: Github Actions的使用
date: 2022-11-08
tags:
- Github
categories:
- others
---

:::tip
每次向Github提交Vuepress代码时，总是需要进行push和shell文件的运行，以此来进行重新部署，十分麻烦。所以要使用Github Actions来进行项目自动化部署。
:::

## 初始化

**首先**在所在项目内创建`.github\workflows`文件路径，在该路径下创建**main.yml**文件，进行如下配置：
```yml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: "16"

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # 部署到 gh-pages 分支
          BRANCH: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          FOLDER: ./public
```
此处需要注意的是：需要对您的Github仓库进行个人密钥**Token**的配置。

## 个人Token配置

### Token生成
进入Github(科学上网)，选择个人的setting配置项。

![github 01](/img_git/github1.png)

选择 **Person access tokens** 下的 **Token(classic)** 新建Token:

![github 02](/img_git/github2.png)

**需要注意，此处的Note最好为ACCESS_Token，且选择repo选项。**

### 仓库Token配置
进入到仓库的 **setting** 选项，选择 **secret** 选项卡，进行密钥的配置。

![github 02](/img_git/github3.png)

## 开始部署

回到本地，进行git的日常提交。
```git
git add .
git commit -m "actions"
git push
```
随后打开github，查看Actions选项内是否正常进行了部署。

若为下图所示，则恭喜创建成功!
![github 02](/img_git/github4.png)


## 错误

当然情况总是不尽人意，报错也十有八九。
![github 02](/img_git/github5.png)

这样的报错，可能性有许多。
```git
Run actions/checkout@v3
Syncing repository: 1553690132/blog
Getting Git version info
Temporarily overriding HOME='/home/runner/work/_temp/674fd481-242d-40bc-9d02-284326485d82' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
/usr/bin/git config --global --add safe.directory /home/runner/work/blog/blog
Deleting the contents of '/home/runner/work/blog/blog'
Initializing the repository
Disabling automatic garbage collection
Setting up auth
Fetching the repository
Determining the checkout info
Checking out the ref
Setting up auth for fetching submodules
Fetching submodules
  /usr/bin/git submodule sync --recursive
  /usr/bin/git -c protocol.version=2 submodule update --init --force --depth=1 --recursive
  Error: fatal: No url found for submodule path 'public' in .gitmodules
  Error: The process '/usr/bin/git' failed with exit code 128
```
此处我的报错，就是因为在deploy.sh文件内，未对项目部署时进入的文件夹进行确切指定，需要进行如下修改：
```sh
# 进入生成的文件夹
cd ./public
```

**报错**总是莫名其妙，但自动化部署可以节省我们大巴的时间，所以还是值得一试的利器。