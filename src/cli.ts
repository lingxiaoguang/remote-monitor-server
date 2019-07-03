#!/usr/bin/env node
const yargs = require('yargs');
const conf = require('./Configuration').getInstance();

const script = yargs.scriptName("remote-monitor-server");

script.usage('$0 <cmd> [args]');

script.command('start', '启动服务器', (yargs) => {
  yargs.option('--port', {
    description: '端口号'
  })
  yargs.option('--monitorScreenshotInterval', {
    description: '截图间隔'
  })
  yargs.option('--controlEnable', {
    description: '是否允许远程控制'
  })
  yargs.option('--controlLog', {
    description: '是否打印鼠标键盘事件的日志'
  })
}, function (options) {
  if(options.port) {
    conf.setConfig('server.port', options.port)
  }
  if(options.monitorScreenshotInterval) {
    conf.setConfig('monitor.screenshotInterval', options.monitorScreenshotInterval)
  }
  if(options.controlEnable) {
    conf.setConfig('control.enable', options.controlEnable)
  }
  if(options.controlLog) {
    conf.setConfig('control.log', options.controlLog)
  }
  require('./index');// 启动服务器
})

script.help();
script.argv
