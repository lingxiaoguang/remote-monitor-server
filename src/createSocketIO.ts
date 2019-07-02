const socketIO = require('socket.io');
import { startScreenshotTimer } from './screenshotGenerator';
import EventExecuter from './EventExecuter';
const fs = require('fs');
const path = require('path');
const getPixels = require('get-pixels');
const configuration = require('./Configuration').getInstance();

interface ScreenSize {
    width: number;
    height: number;
}

const controlEnable = configuration.getConfig('control.enable')

function getScreenSize(img): Promise<ScreenSize> {
    const imgPath = path.resolve(process.cwd(), './tmp.png');
    fs.writeFileSync(imgPath, img);
    return new Promise((resolve): void => {
        getPixels(imgPath, function(err, pixels): void {
            if(err) {
                console.log("Bad image path")
                return
            }
            resolve({
                width: pixels.shape[0],
                height: pixels.shape[1]
            });
        });
    })
}

module.exports = function(server): void {

    const eventExecuter = new EventExecuter();
    const io = socketIO(server, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });

    let screenshotTimerStarted = false;
    let sizeAdjusted = false;
    io.on('connect', (socket): void => {
        socket.emit('msg', 'connected');

        if (controlEnable) {
            socket.on('userevent', (eventInfo): void => {
                eventExecuter.exectue(eventInfo);
            });
        }

        let screenWidth;
        let screenHeight;
        if (!screenshotTimerStarted) { // 定时器全局只启动一次
            startScreenshotTimer(([imgStr, img]): void => {
                io.sockets.emit('screenshot', imgStr);
                if (!sizeAdjusted) { // 只获取一次屏幕尺寸然后缓存下来
                    getScreenSize(img).then(({ width, height}) => {
                        io.sockets.emit('screensize', {
                            width,
                            height
                        })
                        screenWidth = width;
                        screenHeight = height;
                        sizeAdjusted = true;
                    });
                }
            });
            screenshotTimerStarted = true;
        } else {
            io.sockets.emit('screensize', {
                width: screenWidth,
                height: screenHeight
            });
        }
    })
}