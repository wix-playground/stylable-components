import * as React from 'react';
import styles from './stepper.st.css';
import buttonStyles from '../../style/default-theme/controls/button.st.css';
import {SBStateless} from 'stylable-react-component';
import {ChevronDownIcon, ChevronUpIcon} from '../../icons';

function noop() {}

export interface StepperProps extends React.HTMLProps<HTMLElement> {
    onUp?: Function
    onDown?: Function
    disableUp?: boolean
    disableDown?: boolean
}

export const Stepper: React.StatelessComponent<StepperProps> = SBStateless(
    ({
        onUp = noop,
        onDown = noop,
        disableUp = false,
        disableDown = false,
        ...props
    }) => (
        <div {...props}>
            <button
                tabIndex={-1}
                data-automation-id="STEPPER_INCREMENT"
                className={`${buttonStyles.root} control increment`}
                onClick={() => onUp()}
                disabled={disableUp}
            >
                <ChevronUpIcon className={styles['control-icon']} />
            </button>
            <button
                tabIndex={-1}
                data-automation-id="STEPPER_DECREMENT"
                className={`${buttonStyles.root} control decrement`}
                onClick={() => onDown()}
                disabled={disableDown}
            >
                <ChevronDownIcon className="control-icon"/>
            </button>
        </div>
    ),
styles);
