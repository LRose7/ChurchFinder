const bunyan = require('bunyan');

// level is what it is going to be spitting out
const loggers = {
    development: () => bunyan.createLogger({ name: "development", level: "debug" }),
    production: () => bunyan.createLogger({ name: " production", level: "info" }),
    test: () => bunyan.createLogger({ name: "test", level: "fatal" }),
}

module.exports = {
    development: {
        sitename: 'Church Finder [Development',
        log: loggers.development
    },
    production: {
        sitename: 'Church Finder',
        log: loggers.production
    },
    test: {
        sitename: 'Church Finder [Test]',
        log: loggers.test
    }
};