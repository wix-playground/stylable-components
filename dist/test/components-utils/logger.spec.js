"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_drive_react_1 = require("test-drive-react");
var wix_react_tools_1 = require("wix-react-tools");
var logger_1 = require("../../src/utils/logger");
function assertError(fn, err) {
    test_drive_react_1.expect(fn).to.calledOnce;
    test_drive_react_1.expect(fn.firstCall.args[0]).instanceof(Error);
    test_drive_react_1.expect(fn.firstCall.args[0]).property('message', err.message);
}
var methods = ['warn', 'error'];
describe('logger', function () {
    var spies = {};
    var logger;
    beforeEach(function () {
        methods.forEach(function (method) {
            var fn = test_drive_react_1.sinon.spy();
            spies[method] = fn;
            test_drive_react_1.sinon.stub(console, method).callsFake(fn);
            logger = logger_1.createLogger();
        });
    });
    afterEach(function () {
        methods.forEach(function (method) {
            console[method].restore();
        });
        spies = {};
    });
    describe('check exported functions', function () {
        it('warn() should be a function', function () {
            test_drive_react_1.expect(logger_1.warn).to.instanceof(Function);
        });
        it('warnOnce() should be a function', function () {
            test_drive_react_1.expect(logger_1.warnOnce).to.instanceof(Function);
        });
        it('error() should be a function', function () {
            test_drive_react_1.expect(logger_1.error).to.instanceof(Function);
        });
        it('errorOnce() should be a function', function () {
            test_drive_react_1.expect(logger_1.errorOnce).to.instanceof(Function);
        });
    });
    describe('setGlobalConfig({devMode: true})', function () {
        beforeEach(function () {
            wix_react_tools_1.setGlobalConfig({ devMode: true });
        });
        afterEach(function () {
            wix_react_tools_1.overrideGlobalConfig({});
        });
        methods.forEach(function (method) {
            describe(method, function () {
                it('no formating', function () {
                    logger[method]('Warning message');
                    assertError(spies[method], new Error('Warning message'));
                });
                it('formaring', function () {
                    logger[method]('Warning message, a=%s, b=%s', 11, 12);
                    assertError(spies[method], new Error('Warning message, a=11, b=12'));
                });
                it('call x 2', function () {
                    logger[method]('Warning message');
                    logger[method]('Warning message');
                    test_drive_react_1.expect(spies[method]).to.calledTwice;
                });
                it('call once x 2', function () {
                    logger[method + "Once"]('Warning message');
                    logger[method + "Once"]('Warning message');
                    test_drive_react_1.expect(spies[method]).to.calledOnce;
                });
            });
        });
    });
    describe('setGlobalConfig({devMode: false})', function () {
        beforeEach(function () {
            wix_react_tools_1.setGlobalConfig({ devMode: false });
        });
        afterEach(function () {
            wix_react_tools_1.overrideGlobalConfig({});
        });
        methods.forEach(function (method) {
            describe(method, function () {
                it('trully condition', function () {
                    logger[method]('Warning message');
                    test_drive_react_1.expect(spies[method]).to.not.be.called;
                });
                it('no formating', function () {
                    logger[method]('Warning message');
                    test_drive_react_1.expect(spies[method]).to.not.be.called;
                });
                it('formaring', function () {
                    logger[method]('Warning message, a=%s, b=%s', 11, 12);
                    test_drive_react_1.expect(spies[method]).to.not.be.called;
                });
            });
        });
    });
    describe('no setGlobalConfig', function () {
        methods.forEach(function (method) {
            describe(method, function () {
                it('trully condition', function () {
                    logger[method]('Warning message');
                    test_drive_react_1.expect(spies[method]).to.not.be.called;
                });
                it('no formating', function () {
                    logger[method]('Warning message');
                    test_drive_react_1.expect(spies[method]).to.not.be.called;
                });
                it('formaring', function () {
                    logger[method]('Warning message, a=%s, b=%s', 11, 12);
                    test_drive_react_1.expect(spies[method]).to.not.be.called;
                });
            });
        });
    });
});
//# sourceMappingURL=logger.spec.js.map