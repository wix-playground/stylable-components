import * as React from 'react';
import * as PropTypes from 'prop-types'

export default function rtl<T extends React.ComponentClass<any>>(Base: T): T {
    class Component extends React.Component {
        static contextTypes = {
            rtl: PropTypes.bool
        }
        constructor(props) {
            super(props)
        }
        render() {
            return <Base
                rtl={this.context.rtl}
                {...this.props}
            />
        }
    }
    return Component as T
}
