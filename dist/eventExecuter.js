"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Mouse, Point, Keyboard } = require('robot-js');
const configuration = require('./Configuration').getInstance();
const enableLog = configuration.getConfig('control.log');
class EventExecuter {
    constructor() {
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
    }
    executeKeyboardEvent(event) {
        switch (event.type) {
            case 'keydown':
                this.keyboard.press(event.keyCode);
                break;
            case 'keyup':
                this.keyboard.release(event.keyCode);
                break;
            case 'keypress':
                this.keyboard.click(event.keyCode);
                break;
            default: break;
        }
    }
    executeMouseEvent(event) {
        Mouse.setPos(new Point(event.x, event.y));
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
}
exports.default = EventExecuter;
//# sourceMappingURL=EventExecuter.js.map