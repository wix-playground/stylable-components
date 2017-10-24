import * as React from 'react';
import {Tooltip, TooltipPosition, Button} from '../../src';
import {stylable} from 'wix-react-tools';

import styles from './tooltip-demo.st.css';

const positions = ['top', 'left', 'right', 'bottom'];

@stylable(styles)
export class TooltipDemo extends React.Component {
    render() {
        return <div>
            {positions.map((position: any, index) =>
                <div className='positionButton' key={index}>
                    <Button data-id={position} children={position}/>
                    <Tooltip id={position} children={position} position={position}/>
                </div>
            )}
        </div>
    }
}
