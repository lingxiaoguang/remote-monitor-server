
const cosmiconfig = require('cosmiconfig');
const configFinder = cosmiconfig('remoteMonitorServer');
import { get, set } from 'lodash';

const defaultConfig = {
    monitor: {
        screenshotInterval: 500,// 截图的间隔
    },
    control: {
        enable: true,// 是否允许客户端控制
        log: true// 是否打印日志
    },
    server: {
        port: 3000// 服务器端口号
    }
}

let instance;

class Configuration {
    config: Object;
    constructor() {
        if(instance) {
           return instance;
        }
        const configFile = configFinder.searchSync();
        this.config = Object.assign({}, defaultConfig, configFile && configFile.config);
        instance = this;
    }

    static getInstance() {
        if (!instance) {
            instance = new Configuration();
        }
        return instance;
    }

    getConfig(name) {
        return name ? get(this.config, name) : this.config;
    }
    
    setConfig(name, val) {
        set(this.config, name, val);
    }
}

module.exports = Configuration;
