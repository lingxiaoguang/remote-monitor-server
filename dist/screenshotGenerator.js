"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const screenshot = require('screenshot-desktop');
const configuration = require('./Configuration').getInstance();
const SCREENSHOT_INTERVAL = configuration.getConfig('monitor.screenshotInterval');
exports.createScreenshot = () => {
    return screenshot({ format: 'png' }).then((img) => {
        return [img.toString('base64'), img];
    }).catch((err) => {
        console.log('截图失败', err);
        return err;
    });
};
exports.startScreenshotTimer = (callback) => {
    return setInterval(() => {
        exports.createScreenshot().then(([imgStr, img]) => {
            callback(['data:image/png;base64,' + imgStr, img]);
        });
    }, SCREENSHOT_INTERVAL);
};
//# sourceMappingURL=screenshotGenerator.js.map