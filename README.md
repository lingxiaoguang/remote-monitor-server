# 远程桌面监控服务端

远程桌面监控服务端，定时的截图通过socket发送到客户端，并且执行客户端传过来的事件

# 原理

 - 远程监控： 通过[screenshot-desktop](https://github.com/bencevans/screenshot-desktop)来实现截图，默认每秒2次，然后通过socketio发送到客户端来显示
 - 控制： 客户端把鼠标和键盘事件传递过来，服务端通过[robot-js](https://github.com/robot/robot-js)来执行这些鼠标和键盘事件

详细细节见[Node.js实现远程桌面监控](https://juejin.im/post/5d18d4c36fb9a07ecb0bbe7b)

 # 调试

 ```
 yarn watch:run
 yarn watch:lint
 ```

 # 运行
 
 ```
 yarn start
 ```

