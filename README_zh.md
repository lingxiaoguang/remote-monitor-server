# 远程桌面监控服务端

语言: [中文](README_zh.md) / [English](README.md)

远程桌面监控服务端

启动服务端后，[客户端](https://github.com/lingxiaoguang/remote-monitor-client)输入ip和端口号，就可以操纵服务端的桌面。

![remote-monitor](./remote-monitor.gif)

# 安装

```
yarn global add remote-monitor-server

```

注意： [robot-js](https://github.com/robot/robot-js) 因为依赖了一些c++模块，需要9.x以下版本的node。
      如果安装失败，可以试试单独安装一下robot-js

# 运行

```
remote-monitor-server start 
```
启动服务器

选项：
 - --version                      显示版本号                               [布尔]
 - --help                         显示帮助信息                             [布尔]
 - ----port                       端口号
 - ----monitorScreenshotInterval  截图间隔
 - ----controlEnable              是否允许远程控制
 - ----controlLog                 是否打印鼠标键盘事件的日志

# 原理

[Node.js实现远程桌面监控](https://juejin.im/post/5d18d4c36fb9a07ecb0bbe7b)





