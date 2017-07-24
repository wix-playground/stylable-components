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
	displayIcon?: boolean
}

const defaultIconChecked = (
	<svg width='10' height='10' viewBox='0 0 41 32' data-automation-id='TOGGLE_CHECKED_ICON'>
		<path fill='currentColor' d='M0.169 17.815c0.169 1.098 0.76 2.111 1.689 2.871l14.269 10.385c1.942 1.435 4.644 1.013 6.079-0.844l18.069-23.303c1.435-1.858 1.098-4.559-0.844-5.995s-4.644-1.098-6.164 0.844l-15.367 19.842-10.723-7.852c-1.942-1.435-4.644-1.013-6.164 0.844-0.76 0.929-1.013 2.111-0.844 3.208z'/>
	</svg>
);
const defaultIconUnchecked = (
	<svg width='10' height='10'viewBox='0 0 143 32' data-automation-id='TOGGLE_UNCHECKED_ICON'>
		<path fill='currentColor' d='M0 0h142.545v32h-142.545v-32z'/>
	</svg>
)

function Toogle(props: Props) {
	const {
		checked = false,
		disabled = false,
		displayIcon = true,
		iconChecked = defaultIconChecked,
		iconUnchecked = defaultIconUnchecked,
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
				checked={checked}
			/>
		}
		<div className='background'>
			<div
				className='switch'
				children={displayIcon ? (checked ? iconChecked : iconUnchecked) : null}
			/>
		</div>
	</div>
}

export default SBStateless(Toogle, style)
