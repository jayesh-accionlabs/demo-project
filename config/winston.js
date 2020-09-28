const winston = require('winston');
const { format, transports, createLogger } = require('winston')
require('winston-daily-rotate-file');
const config = require('../config/config');
const logsFolder = config.logsFolder;

const fileLogger = new (winston.transports.DailyRotateFile)({
  filename: 'demo-project-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: logsFolder
});

const consoleLogger = new (transports.Console)({
  json: true,
  colorize: true
})

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `[${info.timestamp}] [${info.level}] ${(info.level === 'info' ? info.message :JSON.stringify(info))}` + (info.splat !== undefined ? `${info.splat}` : " "))
  ),
  transports: [
    consoleLogger,
    fileLogger
  ]
});

module.exports = logger;
