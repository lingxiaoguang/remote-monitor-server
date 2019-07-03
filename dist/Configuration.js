"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cosmiconfig = require('cosmiconfig');
const configFinder = cosmiconfig('remoteMonitorServer');
const lodash_1 = require("lodash");
const defaultConfig = {
    monitor: {
        screenshotInterval: 500,
    },
    control: {
        enable: true,
        log: true // 是否打印日志
    },
    server: {
        port: 3000 // 服务器端口号
    }
};
let instance;
class Configuration {
    constructor() {
        if (instance) {
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
        return name ? lodash_1.get(this.config, name) : this.config;
    }
    setConfig(name, val) {
        lodash_1.set(this.config, name, val);
    }
}
module.exports = Configuration;
//# sourceMappingURL=Configuration.js.map