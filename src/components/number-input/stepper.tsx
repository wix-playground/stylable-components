import * as React from 'react';
import {ChevronDownIcon, ChevronUpIcon} from '../../icons';

const styles = require('./stepper.st.css').default;

function noop() {}

export interface StepperProps extends React.HTMLProps<HTMLElement> {
    onUp?: Function
    onDown?: Function
    disableUp?: boolean
    disableDown?: boolean
}

export const Stepper: React.StatelessComponent<StepperProps> =
    ({
        onUp = noop,
        onDown = noop,
        disableUp = false,
        disableDown = false,
        ...props
    }) => (
        <div className={styles['root']} {...props}>
            <button
                tabIndex={-1}
                data-automation-id="STEPPER_INCREMENT"
                className={`${styles['control']} ${styles['increment']}`}
                onClick={() => onUp()}
                disabled={disableUp}
            >
                <ChevronUpIcon className={styles['control-icon']} />
            </button>
            <button
                tabIndex={-1}
                data-automation-id="STEPPER_DECREMENT"
                className={`${styles['control']} ${styles['decrement']}`}
                onClick={() => onDown()}
                disabled={disableDown}
            >
                <ChevronDownIcon className={styles['control-icon']}/>
            </button>
        </div>
    );
