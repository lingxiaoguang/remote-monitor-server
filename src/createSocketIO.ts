const socketIO = require('socket.io');
import { startScreenshotTimer } from './screenshotGenerator';
import EventExecuter from './EventExecuter';
const fs = require('fs');
const path = require('path');
const getPixels = require('get-pixels');

interface ScreenSize {
    width: number;
    height: number;
}

module.exports = function(server): void {
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

        socket.on('userevent', (eventInfo): void => {
            eventExecuter.exectue(eventInfo);
        });

        let screenWidth;
        let screenHeight;
        if (!screenshotTimerStarted) {
            startScreenshotTimer(([imgStr, img]): void => {
                io.sockets.emit('screenshot', imgStr);
                if (!sizeAdjusted) {
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