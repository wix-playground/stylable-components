import * as React from 'react';
import {stylable} from 'wix-react-tools';
import styles from './tooltip.st.css';

export interface TooltipProps {
}
export interface TooltipState {
}


@stylable(styles)
export class Tooltip extends React.Component<TooltipProps, TooltipState> {
	render() {
		return <div>yo</div>
	}
}
