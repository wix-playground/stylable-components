import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {SBComponent} from 'stylable-react-component';
import * as keycode from 'keycode';
import styles from './time-picker.st.css';

export type FormatPart = 'hh' | 'mm' | 'ss';
export enum Ampm {am, pm}

export interface Props {
	value?: string
	format?: string
	onChange?: (value: string) => void
	use12?: boolean
	placeholder?: string
}

export interface State {
	focus: boolean
	hh: string
	mm: string
	ss: string,
	ampm: Ampm | null
}

const isTouch =  'ontouchstart' in window || Boolean(navigator.msMaxTouchPoints);
const is12TimeFormat = /AM|PM/.test(new Date().toLocaleTimeString());
const inputNames: string[] = ['hh', 'mm', 'ss', 'ampm'];

const pad2 = (num: string | number): string => ('00' + num).slice(-2);
const isNumber = (value: string) => /^\d{0,2}$/.test(value);

const to24 = (hh: number, ampm: Ampm | null) => {
	if (ampm === null || ampm === Ampm.am) {
		return hh;
	}
	return hh === 12 ? 0 : (hh + 12);
}
const toAmpm = (hh: number) => {
	if (hh < 11) {
		return {
			hh,
			ampm: Ampm.am
		}
	} else if (hh === 12) {
		return {
			hh,
			ampm: Ampm.pm
		}
	} else {
		return {
			hh: hh % 12,
			ampm: Ampm.pm
		}
	}
}

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
		format: 'hh:mm',
		use12: is12TimeFormat
	}

	constructor(props: Props) {
		super();
		this.state = {
			focus: false,
			...this.getTimeParts(props.value!, props.use12)
		}
	}

	getTimeParts(value?: string, use12?: boolean) {
		if (!value) {
			return {
				hh: '',
				mm: '',
				ss: '',
				ampm: null
			}
		}
		const [hh24, mm, ss] = value.split(':').map(pad2);
		const {hh, ampm} = toAmpm(Number(hh24));
		return {
			hh: use12 ? pad2(hh) : hh24 as string,
			ampm: use12 ? ampm : null,
			mm,
			ss
		};
	}

	getValue() {
		const {hh, mm, ss, ampm} = this.state;
		return [
			to24(Number(hh), ampm),
			mm,
			ss
		].map(String).map(pad2).join(':');
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
		this.commit();
	}

	moveFocus(currentRefName: FormatPart, increment: number): boolean {
		let refIndex = inputNames.indexOf(currentRefName);
		let nextRef;

		while (!nextRef && inputNames[refIndex += increment]) {
			nextRef = this.refs[inputNames[refIndex]];
		}

		if (nextRef) {
			const next = findDOMNode(nextRef) as HTMLInputElement;
			next.focus();
			return true;
		}
		return false;
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
				const focusChanged = this.moveFocus(name, 1);
				if (!focusChanged) {
					this.commit();
				}
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
		this.setState(this.getTimeParts(value), this.commit);
	}

	onAmpmKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (['space', 'enter'].indexOf(keycode(e.keyCode)) === -1) {
			return;
		}
		const input = e.currentTarget;

		this.setState({
			ampm: 1 - this.state.ampm!
		}, this.commit);
	}

	componentWillReceiveProps(props: Props) {
		if (props.value && !this.state.focus) {
			this.setState(this.getTimeParts(props.value, props.use12));
		}
	}

	commit = () => {
		if (this.props.onChange) {
		  	this.props.onChange(this.getValue())
		}
	}

	render() {
		const {focus} = this.state;
		const {use12, format, value, placeholder} = this.props;
		const parts = format!.split(':');
		const showPlaceholder = Boolean(placeholder) && !this.state.hh;
		const numberOfInputs = showPlaceholder ? 1 : parts.length;

		return <div cssStates={{focus}}>
			<div className='inputs'>
				{parts.slice(0, numberOfInputs).map((key: FormatPart) =>
					<div className='input-wrap' key={key}>
						<input
							placeholder={showPlaceholder ? placeholder : '––'}
							cssStates={{wide: showPlaceholder}}
							className='input'
							ref={key}
							name={key}
							value={this.state[key]}
							onChange={this.onChange}
							onFocus={this.onFocus}
							onBlur={this.onBlur}
							onKeyDown={this.onKeyDown}
						/>
					</div>
				)}
			</div>
			{use12 &&
				<input
					className='input ampm'
					ref='ampm'
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					value={this.state.ampm === Ampm.am ? 'AM' : 'PM'}
					onKeyDown={this.onAmpmKeyDown}
				/>
			}
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
