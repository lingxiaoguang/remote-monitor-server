const Koa = require('koa');
const http = require('http');
const createSocketIO = require('./createSocketIO');
module.exports = {
    start: function (port) {
        const app = new Koa();
        const server = http.createServer(app.callback());
        createSocketIO(server);
        app.use((ctx) => {
            ctx.body = 'please connect use socket';
        });
        server.listen(port, () => {
            console.log('server started at http://localhost:' + port);
        });
    }
};
//# sourceMappingURL=server.js.map