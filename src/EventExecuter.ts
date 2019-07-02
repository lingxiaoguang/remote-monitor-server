
const { Mouse, Point, Keyboard } = require('robot-js');
const configuration = require('./Configuration').getInstance();

const enableLog = configuration.getConfig('control.log');

interface MouseEvent {
    type: string;
    buttonType: string;
    x: number;
    y: number;
}

interface KeyboardEvent {
    type: string;
    keyCode: number;
    keyName: string;
}

export default class EventExecuter {
    public mouse;
    public keyboard;
    public constructor(){
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
    }

    public executeKeyboardEvent(event: KeyboardEvent): void {
        switch(event.type) {
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

    public executeMouseEvent(event): void {
        Mouse.setPos(new Point(event.x, event.y));
        const button = event.buttonType === 'left' ? 0 : 2
        switch(event.type) {
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

    public exectue(eventInfo): void {
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
