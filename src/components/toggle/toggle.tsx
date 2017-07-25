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
}

function Toogle(props: Props) {
	const {
		checked = false,
		disabled = false,
		displayIcon = true,
		iconChecked,
		iconUnchecked,
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
				children={checked ? iconChecked : iconUnchecked}
			/>
		</div>
	</div>
}

export default SBStateless(Toogle, style)
