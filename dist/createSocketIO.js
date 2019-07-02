"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = require('socket.io');
const screenshotGenerator_1 = require("./screenshotGenerator");
const EventExecuter_1 = require("./EventExecuter");
const fs = require('fs');
const path = require('path');
const getPixels = require('get-pixels');
const configuration = require('./Configuration').getInstance();
const controlEnable = configuration.getConfig('control.enable');
function getScreenSize(img) {
    const imgPath = path.resolve(process.cwd(), './tmp.png');
    fs.writeFileSync(imgPath, img);
    return new Promise((resolve) => {
        getPixels(imgPath, function (err, pixels) {
            if (err) {
                console.log("Bad image path");
                return;
            }
            resolve({
                width: pixels.shape[0],
                height: pixels.shape[1]
            });
        });
    });
}
module.exports = function (server) {
    const eventExecuter = new EventExecuter_1.default();
    const io = socketIO(server, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });
    let screenshotTimerStarted = false;
    let sizeAdjusted = false;
    io.on('connect', (socket) => {
        socket.emit('msg', 'connected');
        if (controlEnable) {
            socket.on('userevent', (eventInfo) => {
                eventExecuter.exectue(eventInfo);
            });
        }
        let screenWidth;
        let screenHeight;
        if (!screenshotTimerStarted) { // 定时器全局只启动一次
            screenshotGenerator_1.startScreenshotTimer(([imgStr, img]) => {
                io.sockets.emit('screenshot', imgStr);
                if (!sizeAdjusted) { // 只获取一次屏幕尺寸然后缓存下来
                    getScreenSize(img).then(({ width, height }) => {
                        io.sockets.emit('screensize', {
                            width,
                            height
                        });
                        screenWidth = width;
                        screenHeight = height;
                        sizeAdjusted = true;
                    });
                }
            });
            screenshotTimerStarted = true;
        }
        else {
            io.sockets.emit('screensize', {
                width: screenWidth,
                height: screenHeight
            });
        }
    });
};
//# sourceMappingURL=createSocketIO.js.map