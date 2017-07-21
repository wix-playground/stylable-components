import * as React from 'react';
import {SBStateless} from 'stylable-react-component';
import style from './toggle.st.css';

export interface Props {
	checked?: boolean,
	disabled?: boolean,
	onChange?: (selected: boolean) => void,
	checkedIcon?: JSX.Element,
	uncheckedIcon?: JSX.Element,
	label?: string,
	displayIcons?: boolean
}

const defaultCheckedIcon = <svg width='10' height='10' viewBox='0 0 41 32'><path fill='currentColor' d='M0.169 17.815c0.169 1.098 0.76 2.111 1.689 2.871l14.269 10.385c1.942 1.435 4.644 1.013 6.079-0.844l18.069-23.303c1.435-1.858 1.098-4.559-0.844-5.995s-4.644-1.098-6.164 0.844l-15.367 19.842-10.723-7.852c-1.942-1.435-4.644-1.013-6.164 0.844-0.76 0.929-1.013 2.111-0.844 3.208z'></path></svg>
const defaultUncheckedIcon = <svg width='10' height='10'viewBox='0 0 143 32'><path fill='currentColor' d='M0 0h142.545v32h-142.545v-32z'/></svg>

function Toogle(props: Props) {
	const {
		checked = false,
		disabled = false,
		displayIcons = true,
		checkedIcon = defaultCheckedIcon,
		uncheckedIcon = defaultUncheckedIcon,
		label,
		onChange
	} = props;
	const toggle = () => {
		if (onChange && !disabled) {
			onChange(!checked)
		}
	}

	return <div
		onClick={toggle}
		cssStates={{checked, disabled}}
	>
		{!disabled &&
			<input
				className='input'
				type='checkbox'
				aria-label={label}
				checked={checked}
			/>
		}
		<div className='background'>
			<div
				className='switch'
				children={displayIcons ? (checked ? checkedIcon : uncheckedIcon) : null}
			/>
		</div>
	</div>
}

export default SBStateless(Toogle, style)
