import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {ChevronDownIcon, ChevronUpIcon} from '../../icons';
import buttonStyles from '../../style/default-theme/controls/button.st.css';
import {GlobalEvent} from '../global-event';
import styles from './stepper.st.css';

export interface StepperProps extends properties.Props {
    disableUp?: boolean;
    disableDown?: boolean;
    dragStep?: number;
    onUp(modifiers: Modifiers): void;
    onDown(modifiers: Modifiers): void;
}

export interface State {
    dragged: boolean;
}

export interface Modifiers {
    altKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
}

interface DragPoint {
    clientX: number;
    clientY: number;
}

const DEFAULTS = {
    dragStep: 10,
    disableUp: false,
    disableDown: false
};

@stylable(styles)
@properties
export class Stepper extends React.Component<StepperProps, State> {
    public static defaultProps: Partial<StepperProps> = {
        disableUp: DEFAULTS.disableUp,
        disableDown: DEFAULTS.disableDown
    };

    public state: State = {dragged: false};

    private dragRefPoint: DragPoint = {
        clientX: 0,
        clientY: 0
    };

    public render() {
        const {dragged} = this.state;
        const {
            onUp,
            onDown,
            disableUp,
            disableDown,
            dragStep,
            ...props
        } = this.props;

        return (
            <div
                {...props}
                onMouseDown={this.handleDragStart}
            >
                <button
                    type="button"
                    tabIndex={-1}
                    data-automation-id="STEPPER_INCREMENT"
                    className={`${buttonStyles.root} control up`}
                    onClick={this.handlerClickUp}
                    disabled={disableUp}
                >
                    <ChevronUpIcon className="control-icon" />
                </button>
                <button
                    type="button"
                    tabIndex={-1}
                    data-automation-id="STEPPER_DECREMENT"
                    className={`${buttonStyles.root} control down`}
                    onClick={this.handlerClickDown}
                    disabled={disableDown}
                >
                    <ChevronDownIcon className="control-icon"/>
                </button>
                <GlobalEvent
                    mousemove={dragged ? this.handleDrag : undefined}
                    mouseup={this.handleDragStop}
                />
            </div>
        );
    }

    private handlerClickUp: React.MouseEventHandler<HTMLButtonElement> =
        ({altKey, ctrlKey, shiftKey}) => this.props.onUp({altKey, ctrlKey, shiftKey})

    private handlerClickDown: React.MouseEventHandler<HTMLButtonElement> =
        ({altKey, ctrlKey, shiftKey}) => this.props.onDown({altKey, ctrlKey, shiftKey})

    private handleDragStart: React.MouseEventHandler<HTMLDivElement> =
        ({clientX, clientY}) => {
            this.setState({dragged: true});
            this.updateDragRefPoint({clientX, clientY});
        }

    private handleDragStop = () => {
            this.setState({dragged: false});
            this.resetDragRefPoint();
        }

    private updateDragRefPoint({clientX, clientY}: DragPoint) {
        this.dragRefPoint.clientX = clientX;
        this.dragRefPoint.clientY = clientY;
    }

    private resetDragRefPoint() {
        this.dragRefPoint.clientX = 0;
        this.dragRefPoint.clientY = 0;
    }

    private handleDrag = ({clientX, clientY, shiftKey, altKey, ctrlKey}: MouseEvent) => {
        const {dragged} = this.state;
        const {onUp, onDown, disableUp, disableDown, dragStep = DEFAULTS.dragStep} = this.props;
        const refPoint = this.dragRefPoint;

        if (dragged) {
            if (!disableUp && clientY <= refPoint.clientY - dragStep) {
                this.updateDragRefPoint({clientX, clientY});
                onUp({altKey, ctrlKey, shiftKey});
            }

            if (!disableDown && clientY >= refPoint.clientY + dragStep) {
                this.updateDragRefPoint({clientX, clientY});
                onDown({altKey, ctrlKey, shiftKey});
            }
        }
    }
}
