import {setGlobalConfig, overrideGlobalConfig} from 'wix-react-tools';
import {expect, sinon} from 'test-drive-react';
import * as logger from '../../src/utils/logger';

function assetError(fn: sinon.SinonSpy, err: Error) {
	expect(fn).to.calledOnce;
	expect(fn.firstCall.args[0]).instanceof(Error);
	expect(fn.firstCall.args[0]).property('message', err.message);
}

type Method = 'log' | 'warn' | 'error';
const methods: Method[] = ['log', 'warn', 'error'];

describe.only('logger', () => {
	let spies: {
		[key: string]: sinon.SinonSpy
	} = {};
	beforeEach(() => {
		methods.forEach(method => {
			const fn = sinon.spy();
			spies[method] = fn;
			sinon.stub(console, method).callsFake(fn);
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
				it('trully condition', () => {
					logger[method](true, 'Warning message')
					expect(spies[method]).to.not.be.called;
				});
				it('no formating', () => {
					logger[method](false, 'Warning message')
					assetError(spies[method], new Error('Warning message'));
				});
				it('formaring', () => {
					logger[method](false, 'Warning message, a=%s, b=%s', 11, 12)
					assetError(spies[method], new Error('Warning message, a=11, b=12'));
				});
			})
		})
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
					logger[method](true, 'Warning message')
					expect(spies[method]).to.not.be.called;
				});
				it('no formating', () => {
					logger[method](false, 'Warning message')
					expect(spies[method]).to.not.be.called;
				});
				it('formaring', () => {
					logger[method](false, 'Warning message, a=%s, b=%s', 11, 12)
					expect(spies[method]).to.not.be.called;
				});
			})
		})
	});

	describe('no setGlobalConfig', () => {
		methods.forEach(method => {
			describe(method, () => {
				it('trully condition', () => {
					logger[method](true, 'Warning message')
					expect(spies[method]).to.not.be.called;
				});
				it('no formating', () => {
					logger[method](false, 'Warning message')
					expect(spies[method]).to.not.be.called;
				});
				it('formaring', () => {
					logger[method](false, 'Warning message, a=%s, b=%s', 11, 12)
					expect(spies[method]).to.not.be.called;
				});
			})
		})
	});

});
