# Piggytail 猪尾巴游戏

<a href="https://github.com/WangYezhen">
  <img src="https://badgen.net/badge/Author/WangYeZhen/blue?icon=telegram"/>
</a>
<a href="https://github.com/WangYezhen/Piggytail">
  <img src="https://badgen.net/badge/Piggytail/public/black?icon=github"/>
</a>
<a>
  <img src="https://badgen.net/badge/Language/Java Script/pink?icon=eclipse"/>
</a>

## 导读

- [背景](#背景)
- [安装](#安装)
- [使用说明](#使用说明)
- [维护者](#维护者)
- [如何贡献](#如何贡献)
- [使用许可](#使用许可)

## 背景

本项目是FZU2019级软件工程K班结对编程作业.</br>
由 WYZ 与 ZJ 进行组队, ZJ 负责产品原型的设定, WYZ 负责将其进行实现.</br>
项目选择使用Web作为游戏的表现形式, 完全使用`Java Script`作为开发语言.</br>

## 安装

本项目由`Cocos Creator v2.4.5`开发，虽然已经部署在云服务器，但由于联机对战需要使用校园网，网速受限，易产生无法登录或某些异常，请测评组下载`Cocos Creator`运行测试</br>
下载完成后，直接将文件用Cocos Creator打开即可，运行请使用浏览器而不是服务器</br>
<a href="https://www.cocos.com/products#CocosCreator">Cocos Creator</a></br>
通过域名访问（不建议）</br>
<a href="https://github.com/Bngel/PigGame/releases/tag/1.1.0-RELEASE">Piggytail</a></br>


## 使用说明

### 1. 联机对战

- 需要连接校园网才能够访问`API`, 因此联机对战全程都必须连接校园网使用
- `1.0.0-SNAPSHOT`版本的托管仅支持自动翻牌, 无任何策略属性
- 在新增的`1.0.0-GA`的稳定版本中, 新增了关于机器人AI的逻辑, 能够进行出牌与翻牌的处理

### 2. 双人对战

- 双人对战的形式为同一台手机进行双方视角的切换, 即当前玩家执行操作后切换到对方回合时作为对手出现.
- 最后的结算结果以当前玩家视角作为参照. 即 当前/对立 玩家胜利.

### 3. 人机对战
- 与联机对战相同, `1.0.0-SNAPSHOT`版本的人机只支持翻牌操作. 因此, 很笨.
- `1.0.0-GA`版本的人机新增了AI逻辑, 使得更加难以战胜. (弱欸

## 维护者

> bngel

## 如何贡献

- 可以通过提`issue`的方式来帮助改进
- 也可以直接`pull request`直接成为一名`contributor`
- 直接QQ私信我 (划掉

## 使用许可

-------

    Copyright 2013 Jake Wharton

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

