const server = require('./server');
const configuration = require('./Configuration').getInstance();

const PORT = configuration.getConfig('server.port');

server.start(PORT);
