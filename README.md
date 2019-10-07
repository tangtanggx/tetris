# Tetris
俄罗斯方块

使用技术：webpack + jquery + typescript + 面向对象开发

1. 初始化
yarn init -y

2. 安装webpack
yarn add -D webpack webpack-cli

3. 安装插件html-webpack-plugin：用于打包html  www.npmjs.com
yarn add -D html-webpack-plugin

4. 安装clean-webpack-plugin
打包前清空dist

5. 安装webpack-dev-server
用于启动一个开发服务器

6. 安装tpescript：用tsc --init 生成tsconfig.json文件

7. yarn add jquery

8. 安装类型库：yarn add -D @types/jquery

# 游戏开发

单一职能原则：每个类只做跟它相关的一件事
开闭原则：系统中的类，应该对扩展开放，对修改关闭

基于以上两个原则，系统中使用如下模式：
数据-界面分离模式

传统面向对象语言，书写类的属性时，往往会进行如下操作：

1. 所有的属性去不私有化
2. 使用公开的方法提供对属性的访问

# 注意点
webpack-dev-server 和 ts-loader 联用时，如果添加了一个新类型并导出，然后在其他模块导入使用，之后热更新时会报错。
解决办法：在配置ts-loader时加上 transpileOnly: true
