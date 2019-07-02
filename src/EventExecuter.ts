
const robot = require('robot-js');
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
        this.mouse = new robot.Mouse();
        this.keyboard = new robot.Keyboard();
    }

    public executeKeyboardEvent(event: KeyboardEvent): void {
        let keyCode = robot['KEY_' + event.keyName.toUpperCase()];
        if (!keyCode) {
            console.log('robot-js暂不支持' + event.keyName + '键');
            return;
        }
        switch(event.type) {
            case 'keydown':
                this.keyboard.press(keyCode);
                break;
            case 'keyup':
                this.keyboard.release(keyCode);
                break;
            case 'keypress':
                this.keyboard.click(keyCode);
                break;
            default:break;
        }
    }

    public executeMouseEvent(event): void {
        robot.Mouse.setPos(new robot.Point(event.x, event.y));
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
        try{
            switch (eventInfo.type) {
                case 'keyboard':
                    this.executeKeyboardEvent(eventInfo.event);
                    break;
                case 'mouse':
                    this.executeMouseEvent(eventInfo.event);
                    break;
                default: break;
            }
        } catch(e) {
            console.log(e);
        }
    }
}
