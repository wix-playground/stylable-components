import {expect, sinon} from 'test-drive-react';
import {overrideGlobalConfig, setGlobalConfig} from 'wix-react-tools';
import {createLogger} from '../../src/utils/logger';

function assetError(fn: sinon.SinonSpy, err: Error) {
    expect(fn).to.calledOnce;
    expect(fn.firstCall.args[0]).instanceof(Error);
    expect(fn.firstCall.args[0]).property('message', err.message);
}

type Method = 'log' | 'warn' | 'error';
const methods: Method[] = ['log', 'warn', 'error'];

describe('logger', () => {
    let spies: {
        [key: string]: sinon.SinonSpy
    } = {};
    let logger: any;
    beforeEach(() => {
        methods.forEach(method => {
            const fn = sinon.spy();
            spies[method] = fn;
            sinon.stub(console, method).callsFake(fn);
            logger = createLogger();
        });
    });

    afterEach(() => {
        methods.forEach(method => {
            (console[method] as sinon.SinonExpectation).restore();
        });
        spies = {};
    });

    describe('setGlobalConfig({devMode: true})', () => {
        beforeEach(() => {
            setGlobalConfig({devMode: true});
        });
        afterEach(() => {
            overrideGlobalConfig({});
        });
        methods.forEach(method => {
            describe(method, () => {
                it('no formating', () => {
                    logger[method]('Warning message');
                    assetError(spies[method], new Error('Warning message'));
                });
                it('formaring', () => {
                    logger[method]('Warning message, a=%s, b=%s', 11, 12);
                    assetError(spies[method], new Error('Warning message, a=11, b=12'));
                });
                it('call x 2', () => {
                    logger[method]('Warning message');
                    logger[method]('Warning message');
                    expect(spies[method]).to.calledTwice;
                });
                it('call once x 2', () => {
                    logger[method + 'Once']('Warning message');
                    logger[method + 'Once']('Warning message');
                    expect(spies[method]).to.calledOnce;
                });
            });
        });
    });

    describe('setGlobalConfig({devMode: false})', () => {
        beforeEach(() => {
            setGlobalConfig({devMode: false});
        });
        afterEach(() => {
            overrideGlobalConfig({});
        });
        methods.forEach(method => {
            describe(method, () => {
                it('trully condition', () => {
                    logger[method]('Warning message');
                    expect(spies[method]).to.not.be.called;
                });
                it('no formating', () => {
                    logger[method]('Warning message');
                    expect(spies[method]).to.not.be.called;
                });
                it('formaring', () => {
                    logger[method]('Warning message, a=%s, b=%s', 11, 12);
                    expect(spies[method]).to.not.be.called;
                });
            });
        });
    });

    describe('no setGlobalConfig', () => {
        methods.forEach(method => {
            describe(method, () => {
                it('trully condition', () => {
                    logger[method]('Warning message');
                    expect(spies[method]).to.not.be.called;
                });
                it('no formating', () => {
                    logger[method]('Warning message');
                    expect(spies[method]).to.not.be.called;
                });
                it('formaring', () => {
                    logger[method]('Warning message, a=%s, b=%s', 11, 12);
                    expect(spies[method]).to.not.be.called;
                });
            });
        });
    });

});
