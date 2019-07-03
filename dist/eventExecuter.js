"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const robot = require('robot-js');
const configuration = require('./Configuration').getInstance();
const enableLog = configuration.getConfig('control.log');
class EventExecuter {
    constructor() {
        this.mouse = new robot.Mouse();
        this.keyboard = new robot.Keyboard();
    }
    executeKeyboardEvent(event) {
        let keyCode = robot['KEY_' + event.keyName.toUpperCase()];
        if (!keyCode) {
            console.log('robot-js暂不支持' + event.keyName + '键');
            return;
        }
        switch (event.type) {
            case 'keydown':
                this.keyboard.press(keyCode);
                break;
            case 'keyup':
                this.keyboard.release(keyCode);
                break;
            case 'keypress':
                this.keyboard.click(keyCode);
                break;
            default: break;
        }
    }
    executeMouseEvent(event) {
        robot.Mouse.setPos(new robot.Point(event.x, event.y));
        const button = event.buttonType === 'left' ? 0 : 2;
        switch (event.type) {
            case 'mousedown':
                this.mouse.press(button);
                break;
            case 'mousemove':
                break;
            case 'mouseup':
                this.mouse.release(button);
                break;
            case 'click':
                this.mouse.click(button);
                break;
            case 'dblclick':
                this.mouse.click(button);
                this.mouse.click(button);
                break;
            default: break;
        }
    }
    exectue(eventInfo) {
        if (enableLog) {
            console.log(eventInfo);
        }
        try {
            switch (eventInfo.type) {
                case 'keyboard':
                    this.executeKeyboardEvent(eventInfo.event);
                    break;
                case 'mouse':
                    this.executeMouseEvent(eventInfo.event);
                    break;
                default: break;
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = EventExecuter;
//# sourceMappingURL=EventExecuter.js.map