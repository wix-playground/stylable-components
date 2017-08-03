import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent} from 'stylable-react-component';
import * as keycode from 'keycode';
import styles from './time-picker.st.css';

export type FormatPart = 'hh' | 'mm' | 'ss';

export interface Props {
	value?: string
	format?: string
	onChange?: (value: string) => void,
	use12?: boolean
}

export interface State {
	focus: boolean
	hh: string
	mm: string
	ss: string
}

const isTouch =  'ontouchstart' in window || Boolean(navigator.msMaxTouchPoints);
const formatParts: FormatPart[] = ['hh', 'mm', 'ss'];

const pad2 = (num: string) => ('00' + num).slice(-2);
const isNumber = (value: string) => /^\d{0,2}$/.test(value);

const isValidValue = (num: number, part: FormatPart, use12: boolean) => {
	switch(part) {
		case 'hh':
			return num >= 0 && num <= (use12 ? 12 : 23);
		case 'mm':
		case 'ss':
			return num >= 0 && num <= 59;
	}
}

@SBComponent(styles)
export default class TimePicker extends React.Component<Props, State> {

	static defaultProps = {
		value: '00:00:00',
		format: 'hh:mm:ss',
		use12: false
	}

	constructor(props: Props) {
		super();
		this.state = {
			focus: false,
			...this.getTimeParts(props.value!)
		}
	}

	getTimeParts(value: string) {
		const parts = value.split(':')
		return {
			hh: parts[0],
			mm: parts[1],
			ss: parts[2]
		}
	}

	getValue() {
		const {hh, mm, ss} = this.state;
		return [hh, mm, ss].map(pad2).join(':');
	}

	onFocus = (e: React.SyntheticEvent<HTMLInputElement>) => {
		e.currentTarget.select();
		this.setState({focus: true});
		if (isTouch) {
			const input = findDOMNode(this.refs.nativeInput) as HTMLInputElement;
			e.currentTarget.blur();
			input.focus();
			input.click();
		}
	}

	onBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
		const name = e.currentTarget.name;
		this.setState({
			focus: false,
			[name as any]: pad2(this.state[name as FormatPart])
		});
		if (this.props.onChange) {
			this.props.onChange(this.getValue());
		}
	}

	moveFocus(currentRefName: FormatPart, increment: number) {
		const refIndex = formatParts.indexOf(currentRefName);
		const nextRef = this.refs[formatParts[refIndex + increment]];
		if (nextRef) {
			const next = findDOMNode(nextRef) as HTMLInputElement;
			next.focus();
		}
	}

	onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
		const {use12} = this.props;
		const {value} = e.currentTarget;
		const name = e.currentTarget.name as FormatPart;
		if (!isNumber(value)) {
			return;
		}
		const numValue = Number(value);

		if (!isValidValue(numValue, name, use12!)) {
			return;
		}
		const shouldWaitForInput = isValidValue(numValue * 10, name, use12!);
		const nextState = {
			[name as any]: shouldWaitForInput ? value : pad2(value)
		};
		this.setState(nextState, () => {
			if (!shouldWaitForInput) {
				this.moveFocus(name, 1);
			}
		});
	}

	onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const name = e.currentTarget.name as FormatPart;
		if (keycode(e.keyCode) !== 'backspace' || this.state[name].length) {
			return;
		}
		e.preventDefault();
		this.moveFocus(name, -1);
	}

	onNativeChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value + ':00';
		this.setState(this.getTimeParts(value));
		if (this.props.onChange) {
			this.props.onChange(value)
		}
	}

	componentWillReceiveProps(props: Props) {
		if (props.value && !this.state.focus) {
			this.setState(this.getTimeParts(props.value));
		}
	}

	render() {
		const {focus} = this.state;
		const {format} = this.props;

		return <div cssStates={{focus}}>
			{format!.split(':').map((key: FormatPart) =>
				<input
					className='input'
					size={2}
					ref={key}
					key={key}
					name={key}
					value={this.state[key]}
					onChange={this.onChange}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onKeyDown={this.onKeyDown}
				/>
			)}
			<input
				className='native-input'
				ref='nativeInput'
				tabIndex={-1}
				type='time'
				value={this.getValue()}
				onChange={this.onNativeChange}
			/>
		</div>
	}
}
