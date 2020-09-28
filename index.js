const config = require('./config/config');
const MongoDB = require('./utils/mongoUtil')
const app = require('./config/express');
const logger = require('./config/winston');

logger.log({ level: 'info', message: `[Server] Bootstraping server` });
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    logger.log({ level: 'info', message: `[Server] server started on port ${config.port} (${config.env})` });
    MongoDB.connectDB();
  });
}
module.exports = app;
