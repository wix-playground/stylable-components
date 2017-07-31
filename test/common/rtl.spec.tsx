import * as React from 'react';
import * as PropTypes from 'prop-types';
import {expect, ClientRenderer, sinon} from 'test-drive-react';
import rtl from '../../src/common/rtl';

@rtl
class Inner extends React.Component<any, {}> {
	render () {
		return <div data-automation-id='RTL_TEST_INNER'>{this.props.rtl ? 'rtl' : 'ltr'}</div>
	}
}

const InnerSL = rtl((props: any) => <div data-automation-id='RTL_TEST_INNER_SL'>{props.rtl ? 'rtl' : 'ltr'}</div>)

class Nested extends React.Component<any, {}> {
	render () {
		const {children, ...props} = this.props;
		return <Inner {...props}/>;
	}
}

class ParentWithContext extends React.Component<any, {}> {
	static childContextTypes = {
        rtl: PropTypes.bool.isRequired
    }
    getChildContext() {
        return {rtl: this.props.rtl}
    }
    render() {
    	return <Nested/>
    }
}

class ParentWithoutContext extends React.Component<any, {}> {
	render() {
    	return <Nested/>
	}
}

class ContextAndProps extends React.Component<any, {}> {
	static childContextTypes = {
        rtl: PropTypes.bool.isRequired
    }
    getChildContext() {
        return {rtl: this.props.contextRTL}
    }
    render() {
    	return <Inner rtl={this.props.propsRTL}/>
    }
}

class ParentWithStatelessChild extends React.Component<any, {}> {
	static childContextTypes = {
        rtl: PropTypes.bool.isRequired
    }
    getChildContext() {
        return {rtl: this.props.rtl}
    }
	render() {
		return <InnerSL/>
	}
}

describe('@rtl', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('Render <Inner/> component directly', () => {
		it('with rtl={true}', () => {
        	const renderer = clientRenderer.render(<Inner rtl={true}/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('rtl');
		})
		it('with rtl={false}', () => {
        	const renderer = clientRenderer.render(<Inner rtl={false}/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('ltr');
		})
    })

    describe('Render <ParentWithContext/>', () => {
		it('with rtl={true}', () => {
        	const renderer = clientRenderer.render(<ParentWithContext rtl={true}/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('rtl');
		})
		it('with rtl={false}', () => {
        	const renderer = clientRenderer.render(<ParentWithContext rtl={false}/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('ltr');
		})
    })

    describe('Render <ParentWithoutContext>', () => {
		it('without any props', () => {
        	const renderer = clientRenderer.render(<ParentWithoutContext/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('ltr');
		})
    })

    describe('Control rtl with context and props', () => {
		it('contextRTL={true} propsRTL={true}', () => {
        	const renderer = clientRenderer.render(<ContextAndProps contextRTL={true} propsRTL={true}/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('rtl');
		})
		it('contextRTL={false} propsRTL={true}', () => {
        	const renderer = clientRenderer.render(<ContextAndProps contextRTL={false} propsRTL={true}/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('rtl');
		})
		it('contextRTL={true} propsRTL={false}', () => {
        	const renderer = clientRenderer.render(<ContextAndProps contextRTL={true} propsRTL={false}/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('ltr');
		})
		it('contextRTL={false} propsRTL={false}', () => {
        	const renderer = clientRenderer.render(<ContextAndProps contextRTL={false} propsRTL={false}/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('ltr');
		})
		it('contextRTL={true}', () => {
        	const renderer = clientRenderer.render(<ContextAndProps contextRTL={true}/>);
        	const inner = renderer.select('RTL_TEST_INNER');
        	expect(inner).text('ltr');
		})
    })

	describe('Render stateless component', () => {
		it('rtl={true}', () => {
        	const renderer = clientRenderer.render(<InnerSL rtl={true}/>);
        	const inner = renderer.select('RTL_TEST_INNER_SL');
        	expect(inner).text('rtl');
		})
		it('rtl={false}', () => {
        	const renderer = clientRenderer.render(<InnerSL rtl={false}/>);
        	const inner = renderer.select('RTL_TEST_INNER_SL');
        	expect(inner).text('ltr');
		})
	})

	describe('Render parent with context with stateless child', () => {
		it('rtl={true}', () => {
        	const renderer = clientRenderer.render(<ParentWithStatelessChild rtl={true}/>);
        	const inner = renderer.select('RTL_TEST_INNER_SL');
        	expect(inner).text('rtl');
		})
		it('rtl={false}', () => {
        	const renderer = clientRenderer.render(<ParentWithStatelessChild rtl={false}/>);
        	const inner = renderer.select('RTL_TEST_INNER_SL');
        	expect(inner).text('ltr');
		})
	})

	describe('Call stateless component as function', () => {
		before(() => {
			sinon.spy(console, 'error');
		})
		after(() => {
			(console.error as any).restore();
		})
		it('should show the warning', () => {
        	const renderer = clientRenderer.render(InnerSL());
        	const inner = renderer.select('RTL_TEST_INNER_SL');
        	expect(inner).text('ltr');
        	expect(console.error).to.be.called;
		})
	})

})
