const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const expressWinston = require('express-winston');
const helmet = require('helmet');
const winstonInstance = require('./winston');
const routes = require('../index.route');
const config = require('./config');
const {APIError,ERROR_CODES,ExtendableError} = require('../utils/errorProvider');
const initGraphql = require('../utils/graphqlUtil');
const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());
app.use(require('cors')({
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true
}));

// enable detailed API logging in dev env
if (config.env === 'local' ) {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on /api path
app.use('/api', routes);
// if error is not an instanceOf ExtendableError, convert it.
app.use((err, req, res, next) => {
  if (!(err instanceof ExtendableError)) {
    const apiError = new APIError(err.message);
    return next(apiError);
  }
  return next(err);
});
initGraphql(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('No Such API Exist', ERROR_CODES.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during local
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : "Something Went Wrong. Please Try Again.",
    errorCode: err.errorCode,
    stack: config.env === 'local' ? err.stack : {}
  })
);

module.exports = app;
