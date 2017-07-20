import * as React from 'react';
import {ChevronDownIcon, ChevronUpIcon} from '../../icons';

const styles = require('./number-input.css');

function noop() {}

export interface StepperProps extends React.HTMLProps<HTMLElement> {
    onIncrement?: Function
    onDecrement?: Function
    disableIncrement?: boolean
    disableDecrement?: boolean
}

export const Stepper: React.StatelessComponent<StepperProps> =
    ({
        onIncrement = noop,
        onDecrement = noop,
        disableIncrement = false,
        disableDecrement = false,
        ...props
    }) => (
        <div {...props}>
            <button
                tabIndex={-1}
                data-automation-id="STEPPER_INCREMENT"
                className={styles['stepper-increment']}
                onClick={() => onIncrement()}
                disabled={disableIncrement}
            >
                <ChevronUpIcon className={styles['stepper-control-icon']} />
            </button>
            <button
                tabIndex={-1}
                data-automation-id="STEPPER_DECREMENT"
                className={styles['stepper-decrement']}
                onClick={() => onDecrement()}
                disabled={disableDecrement}
            >
                <ChevronDownIcon className={styles['stepper-control-icon']}/>
            </button>
        </div>
    );
