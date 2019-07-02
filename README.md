# Remote Desktop Monitor Server

Language: [中文](README_zh.md) / [English](README.md)

Remote Desktop Monitor Server

First, start the server.Then, input the ip and port in [client](https://github.com/lingxiaoguang/remote-monitor-client)
and now you can monitor and operate the desktop of server.

![remote-monitor](./remote-monitor.gif)

# Installation

```
yarn global add remote-monitor-server

```

Tip:
[robot-js](https://github.com/robot/robot-js) depends on some c++ module,so it require node version under 9.x.
If your installation failed, try install robot-js alone.

# Run

```
remote-monitor-server start 
```
start server

选项：
 - --version                      show version                         
 - --help                         show help info
 - ----port                       port
 - ----monitorScreenshotInterval  screenshot interval
 - ----controlEnable              is enable remote control
 - ----controlLog                 is enable event log

# Implemention

[Node.js实现远程桌面监控](https://juejin.im/post/5d18d4c36fb9a07ecb0bbe7b)
