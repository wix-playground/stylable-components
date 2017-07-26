import * as React from 'react';
import {SBStateless} from 'stylable-react-component';
import style from './toggle.st.css';

export interface Props {
    checked?: boolean,
    disabled?: boolean,
    onChange?: (selected: boolean) => void,
    iconUnchecked?: JSX.Element,
    iconChecked?: JSX.Element,
    label?: string,
    displayIcons?: boolean
}

const defaultIconChecked = (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" data-automation-id='TOGGLE_CHECKED_ICON'>
        <path fill="#FFF" fill-rule="nonzero" d="M1.696 2.464A1 1 0 1 0 .304 3.9l1.875 1.818a1 1 0 0 0 1.392 0l4.125-4A1 1 0 1 0 6.304.282L2.875 3.607 1.696 2.464z"/>
    </svg>
);

const defaultIconUnchecked = (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="2" viewBox="0 0 8 2" data-automation-id='TOGGLE_UNCHECKED_ICON'>
        <path fill="#FFF" fill-rule="nonzero" d="M1 2h6a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2z"/>
    </svg>
);

function Toogle(props: Props) {
    const {
        checked = false,
        disabled = false,
        iconChecked = defaultIconChecked,
        iconUnchecked = defaultIconUnchecked,
        displayIcons = true,
        label,
        onChange
    } = props;
    const toggle = () => {
        if (onChange && !disabled) {
            onChange(!checked)
        }
    }

    return <div
        data-automation-id='TOGGLE'
        onClick={toggle}
        cssStates={{checked, disabled}}
    >
        {!disabled &&
            <input
                data-automation-id='TOGGLE_INPUT'
                className='input'
                type='checkbox'
                aria-label={label}
                defaultChecked={checked}
            />
        }
        <div className='background'>
            <div
                className='switch'
                children={displayIcons ? (checked ? iconChecked : iconUnchecked) : null}
            />
        </div>
    </div>
}

export default SBStateless(Toogle, style) as any
