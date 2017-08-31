import * as React from 'react';
import {stylable} from 'wix-react-tools';

import {ChevronDownIcon, ChevronUpIcon} from '../../icons';
import buttonStyles from '../../style/default-theme/controls/button.st.css';
import {noop} from '../../utils';
import styles from './stepper.st.css';

export interface StepperProps extends React.HTMLProps<HTMLElement> {
    disableUp?: boolean;
    disableDown?: boolean;
    onUp?: React.MouseEventHandler<HTMLButtonElement>;
    onDown?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Stepper = stylable(styles)<React.SFC<StepperProps>>(props => {
    const {
        onUp = noop,
        onDown = noop,
        disableUp = false,
        disableDown = false,
        ...rest
    } = props;
    return (
        <div {...rest}>
            <button
                type="button"
                tabIndex={-1}
                data-automation-id="STEPPER_INCREMENT"
                className={`${buttonStyles.root} control up`}
                onClick={onUp}
                disabled={disableUp}
            >
                <ChevronUpIcon className="control-icon" />
            </button>
            <button
                type="button"
                tabIndex={-1}
                data-automation-id="STEPPER_DECREMENT"
                className={`${buttonStyles.root} control down`}
                onClick={onDown}
                disabled={disableDown}
            >
                <ChevronDownIcon className="control-icon" />
            </button>
        </div>
    );
});
