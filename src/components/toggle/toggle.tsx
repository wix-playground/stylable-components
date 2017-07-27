import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent, SBStateless} from 'stylable-react-component';
import style from './toggle.st.css';

export interface Props {
    checked?: boolean,
    errored?: boolean,
    disabled?: boolean,
    onChange?: (selected: boolean) => void,
    label?: string,
    tabIndex?: number,
    rtl?: boolean
}
export interface State {
    focus: boolean
}

@SBComponent(style)
export default class Toggle extends React.Component<Props, State> {
    state = {
        focus: false
    }
    toggle = () => {
        const input = findDOMNode(this.refs.input) as HTMLElement
        if (input) {
            input.focus();
        }
        if (!this.props.disabled && this.props.onChange) {
            this.props.onChange(!this.props.checked)
        }
    }
    render() {
        const {
            checked = false,
            disabled = false,
            errored = false,
            rtl = false,
            label,
            tabIndex,
            onChange
        } = this.props;
        const {focus} = this.state;

        return <div
            data-automation-id='TOGGLE'
            onClick={this.toggle}
            cssStates={{checked, disabled, focus, errored, rtl}}
        >
            {!disabled &&
                <input
                    ref='input'
                    data-automation-id='TOGGLE_INPUT'
                    className='input'
                    type='checkbox'
                    aria-label={label}
                    defaultChecked={checked}
                    tabIndex={tabIndex}
                    onFocus={() => this.setState({focus: true})}
                    onBlur={() => this.setState({focus: false})}
                />
            }
            <div className='switch'/>
        </div>
    }
}
