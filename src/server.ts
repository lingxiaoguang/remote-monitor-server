const Koa = require('koa');
const http = require('http');
const createSocketIO = require('./createSocketIO');

module.exports = {
    start: function(port): void {
        const app = new Koa();
        const server = http.createServer(app.callback());
        createSocketIO(server);

        app.use((ctx): void => {
            ctx.body = 'please connect use socket';
        });

        server.listen(port, (): void => {
            console.log('server started at http://localhost:' + port);
        });
    }
}