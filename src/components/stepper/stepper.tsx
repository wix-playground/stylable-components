import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import GlobalEvent from '../../common/global-event';
import {ChevronDownIcon, ChevronUpIcon} from '../../icons';
import buttonStyles from '../../style/default-theme/controls/button.st.css';
import {noop} from '../../utils';
import styles from './stepper.st.css';

export interface StepperProps extends React.HTMLProps<HTMLElement> {
    disableUp?: boolean;
    disableDown?: boolean;
    dragStep?: number;
    onUp(): void;
    onDown(): void;
}

export interface State {
    dragged: boolean;
}

interface DragPoint {
    clientX: number;
    clientY: number;
}

const DEFAULTS = {
    dragStep: 10
};

@SBComponent(styles)
export class Stepper extends React.Component<StepperProps, State> {

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
            disableUp = false,
            disableDown = false,
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
                    <ChevronDownIcon className="control-icon"/>
                </button>
                <GlobalEvent
                    mousemove={dragged ? this.handleDrag : undefined}
                    mouseup={this.handleDragStop}
                />
            </div>
        );
    }

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

    private handleDrag = ({clientX, clientY}: MouseEvent) => {
        const {dragged} = this.state;
        const {onUp, onDown, disableUp, disableDown, dragStep = DEFAULTS.dragStep} = this.props;
        const refPoint = this.dragRefPoint;

        if (dragged) {
            if (!disableUp && clientY <= this.dragRefPoint.clientY - dragStep) {
                this.updateDragRefPoint({clientX, clientY});
                onUp();
            }

            if (!disableDown && clientY >= this.dragRefPoint.clientY + dragStep) {
                this.updateDragRefPoint({clientX, clientY});
                onDown();
            }
        }
    }
}
