import * as React from 'react';
import {SBStateless} from 'stylable-react-component';
import {ChevronDownIcon, ChevronUpIcon} from '../../icons';
import {noop} from '../../utils';
import styles from './stepper.st.css';

export interface StepperProps extends React.HTMLProps<HTMLElement> {
    disableUp?: boolean;
    disableDown?: boolean;
    onUp?(): void;
    onDown?(): void;
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
                type="button"
                tabIndex={-1}
                data-automation-id="STEPPER_INCREMENT"
                className="control up"
                onClick={onUp}
                disabled={disableUp}
            >
                <ChevronUpIcon className="control-icon" />
            </button>
            <button
                type="button"
                tabIndex={-1}
                data-automation-id="STEPPER_DECREMENT"
                className="control down"
                onClick={onDown}
                disabled={disableDown}
            >
                <ChevronDownIcon className="control-icon"/>
            </button>
        </div>
    ),
    styles
);
