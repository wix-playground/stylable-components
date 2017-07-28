import * as React from 'react';
import * as PropTypes from 'prop-types'

export default function rtl<T extends React.ComponentClass<any>>(Base: T): T {
    class Component extends React.Component {
        static displayName = Base.displayName
        static contextTypes = {
            rtl: PropTypes.bool.isRequired
        }
        static childContextTypes = {
            rtl: PropTypes.bool.isRequired
        }
        render() {
            return React.createElement(Base, {
                rtl: this.context.rtl || false,
                ...this.props
            });
        }
    }
    return Component as T
}
