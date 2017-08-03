// Karma configuration
// Generated on Sun Jun 18 2017 16:28:13 GMT+0300 (Jerusalem Daylight Time)

const webpack = require('./webpack.config');
const testEntrypoint = './test/webpack.ts';

const sauceLabsLaunchers = { // Check out https://saucelabs.com/platforms for all browser/platform combos
    slChrome: {
        base: 'SauceLabs',
        browserName: 'chrome'
    },
    slFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox'
    },
    slEdge15: {
        base: 'SauceLabs',
        platform: 'Windows 10',
        browserName: 'MicrosoftEdge',
        version: '15.15063'
    },
    slIE11: {
        base: 'SauceLabs',
        platform: 'Windows 7',
        browserName: 'internet explorer',
        version: '11.0'
    },
    // slIE10: {
    //     base: 'SauceLabs',
    //     platform: 'Windows 7',
    //     browserName: 'internet explorer',
    //     version: '10.0'
    // },
    slSafari10: {
        base: 'SauceLabs',
        platform: 'macOS 10.12',
        browserName: 'safari',
        version: '10.0'
    },
    slSafari9: {
        base: 'SauceLabs',
        platform: 'OS X 10.11',
        browserName: 'safari',
        version: '9.0'
    },
    slAndroid5: {
        base: 'SauceLabs',
        browserName: 'Android',
        version: '5.1'
    },
    slAndroid4: {
        base: 'SauceLabs',
        browserName: 'Android',
        version: '4.4'
    },
    sliOS: {
        base: 'SauceLabs',
        deviceName: 'iPhone 7 Plus Simulator',
        platform: 'iOS',
        platformVersion: '10.3',
        browserName: 'Safari'
    }
};

module.exports = function (config) {
    config.set({
        // this key is used by karma-webpack, see preprocessors below
        webpack,

        // the default mime type for ts files is video/mp2t, which Chrome won't execute, so force correct mime type
        mime: {
            "text/x-typescript": ["ts", "tsx"],
        },

        customLaunchers: sauceLabsLaunchers,

        sauceLabs: {
            startConnect: false,
            build: 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
            tags: [process.env.TRAVIS_BRANCH,"taggable"],
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        },
        captureTimeout: 120000,
        browserNoActivityTimeout: 25000,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files: [
            './node_modules/core-js/client/shim.min.js',
            testEntrypoint
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            [testEntrypoint]: ['webpack']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: process.env.TRAVIS ? ['dots', 'saucelabs'] : ['dots'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: process.env.TRAVIS ?
            Object.keys(sauceLabsLaunchers) :
            ['ChromeHeadless'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
