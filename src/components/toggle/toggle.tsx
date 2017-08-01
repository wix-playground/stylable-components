import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent} from 'stylable-react-component';
import style from './toggle.st.css';

export interface Props {
    checked?: boolean,
    error?: boolean,
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
    static defaultProps = {
        checked: false,
        disabled: false,
        error: false,
        rtl: false
    }
    state = {
        focus: false
    }
    shouldResetFocus: boolean = false
    toggle = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (!this.props.disabled && this.props.onChange) {
            this.props.onChange(!this.props.checked)
        }
        if (this.shouldResetFocus) {
            this.setState({focus: false});
            this.shouldResetFocus = false;
        }
    }
    onMouseDown = () => {
        this.shouldResetFocus = true;
    }
    render() {
        const {
            checked,
            disabled,
            error,
            rtl,
            label,
            tabIndex,
            onChange
        } = this.props;
        const {focus} = this.state;

        return <label
            data-automation-id='TOGGLE'
            onMouseDown={this.onMouseDown}
            cssStates={{
                checked: checked!,
                disabled: disabled!,
                focus: focus!,
                error: error!,
                rtl: rtl!
            }}
        >
            {!disabled &&
                <input
                    ref='input'
                    data-automation-id='TOGGLE_INPUT'
                    className='input'
                    type='checkbox'
                    aria-label={label}
                    checked={checked}
                    onChange={this.toggle}
                    tabIndex={tabIndex}
                    onFocus={() => this.setState({focus: true})}
                    onBlur={() => this.setState({focus: false})}
                />
            }
            <div className='switch'/>
        </label>
    }
}
