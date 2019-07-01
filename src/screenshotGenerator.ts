const screenshot = require('screenshot-desktop')

const SCREENSHOT_INTERVAL = 250;

export const createScreenshot = (): Promise<[string, Buffer]> => {
    return screenshot({format: 'png'}).then((img): [string, Buffer] => {
        return [ img.toString('base64'), img];
    }).catch((err): {} => {
        console.log('截图失败', err);
        return err;
    })
}

export const startScreenshotTimer = (callback): {} => {
    return setInterval((): void => {
        createScreenshot().then(([imgStr, img]): void => {
            callback(['data:image/png;base64,' + imgStr, img]);
        })
    }, SCREENSHOT_INTERVAL)
}
