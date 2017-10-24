import * as React from 'react';
import {Tooltip} from '../../src';
import {stylable} from 'wix-react-tools';

import styles from './tooltip-demo.st.css';

@stylable(styles)
export class TooltipDemo extends React.Component {
    render() {
        return <div>
            <Tooltip/>
            <Tooltip/>
        </div>
    }
}
