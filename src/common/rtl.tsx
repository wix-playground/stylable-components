import * as React from 'react';
import * as PropTypes from 'prop-types'

const contextTypes = {
    rtl: PropTypes.bool.isRequired
};

export function rtl<T extends React.ComponentClass<any>>(Base: T): T
export function rtl<T extends React.SFC>(Base: T): React.SFC

export default function rtl(Base: any): any {
    if (Base.prototype.render) {
        return class Component extends React.Component {
            static displayName = Base.name
            static contextTypes = contextTypes
            render() {
                return React.createElement(Base, {
                    rtl: this.context.rtl || false,
                    ...this.props
                })
            }
        }
    }

    let warnShown = false

    const SLComponent: React.SFC = (props: any, context: any) => {
        if (context) {
            context = {}
            if (!warnShown) {
                console.error(`Warning: Stateless component \`${Base.name}\` being used as function, which make \`context\` unreachable`)
                warnShown = true
            }
        }
        return Base({
            rtl: context.rtl || false,
            ...props
        });
    }
    SLComponent.contextTypes = contextTypes;
    return SLComponent
}
