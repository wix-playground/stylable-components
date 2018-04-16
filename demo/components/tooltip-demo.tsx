import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {Button, GlobalEvent, Modal, Position, Tooltip} from '../../src';

import styles from './tooltip-demo.st.css';

const longText = `
    Star Wars is an American epic space opera media franchise, centered on a film
    series created by George Lucas. It depicts the adventures of various characters
    "a long time ago in a galaxy far, far away".
`;

const samples = [
    {
        title: 'Hover to show, leave to hide',
        props: {
            children: 'I am tooltip!'
        },
        positions: ['top', 'left', 'right', 'bottom']
    },
    {
        title: 'Diagonal positions',
        props: {
            showTrigger: 'click',
            hideTrigger: 'click',
            children: 'I am tooltip!'
        },
        positions: [
            'topLeft', 'topRight', 'bottomLeft', 'bottomRight',
            'leftTop', 'leftBottom', 'rightTop', 'rightBottom'
        ]
    },
    {
        title: 'Click to show, click to hide',
        props: {
            showTrigger: 'click',
            hideTrigger: 'click',
            children: longText
        },
        positions: ['top', 'left', 'right', 'bottom']
    },
    {
        title: 'Show after 200ms and hide after 300ms',
        props: {
            showDelay: 200,
            hideDelay: 300,
            children: longText
        },
        positions: ['top', 'left', 'right', 'bottom']
    },
    {
        title: 'White tooltip',
        props: {
            children: 'I am tooltip',
            className: 'tooltipWhite'
        },
        positions: ['top', 'left', 'right', 'bottom']
    },
    {
        title: 'Small and white',
        props: {
            children: 'I am small and white tooltip',
            className: 'tooltipWhite tooltipSmall',
            showTrigger: 'click',
            hideTrigger: 'click'
        },
        positions: ['top', 'left', 'right', 'bottom']
    },
    {
        title: 'Small and black',
        props: {
            children: 'I am small and black tooltip',
            className: 'tooltipSmall',
            showTrigger: 'click',
            hideTrigger: 'click'
        },
        positions: ['top', 'left', 'right', 'bottom']
    },
    {
        title: 'Small and black 2',
        props: {
            children: '1',
            className: 'tooltipSmall',
            showTrigger: 'click',
            hideTrigger: 'click'
        },
        positions: ['top', 'left', 'right', 'bottom']
    }
];

@stylable(styles)
class DraggableTip extends React.Component<any, any> {
    public state = {
        moving: false,
        x: 0,
        y: 0
    };
    private elem: HTMLDivElement | null;
    public render() {
        const {x, y} = this.state;
        const {position} = this.props;
        const id = 'free-' + position;
        const style = (x || y) ? {left: x, top: y, position: 'fixed'} : {};
        return (
            <div>
                <div
                    className="anchor"
                    data-tooltip-for={id}
                    children={`drag me (${position})`}
                    ref={elem => this.elem = elem}
                    style={style}
                    onMouseDown={this.onMouseDown}
                />
                <GlobalEvent
                    mousemove={this.onMouseMove}
                    mouseup={this.onMouseUp}
                />
                <Tooltip
                    id={id}
                    position={position}
                    children="I am a tooltip!"
                    hideTrigger=""
                    disableGlobalEvents
                />
            </div>
        );
    }

    private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        this.setState({moving: true});
    }
    private onMouseUp = (e: MouseEvent) => {
        this.setState({moving: false});
    }

    private onMouseMove = (e: MouseEvent) => {
        if (!this.state.moving) {
            return;
        }
        this.setState({
            x: e.pageX - window.scrollX,
            y: e.pageY - window.scrollY
        });
    }
}

class ModalWrap extends React.Component {
    public state = {
        isOpen: false
    };
    public render() {
        return (
            <div>
                <Button onClick={this.toggle}>Open</Button>
                <Modal isOpen={this.state.isOpen}>
                    {this.props.children}
                </Modal>
            </div>
        );
    }
    private toggle = () => this.setState({isOpen: !this.state.isOpen});
}

@stylable(styles)
export class TooltipDemo extends React.Component {
    public render() {
        return (
            <div>
                {samples.map((sample, i) =>
                    <div key={i} className="sample">
                        <h4>{sample.title}</h4>
                        {sample.positions.map((position: Position, j) =>
                            <div className="anchorWrap" key={j}>
                                <div className="anchor" data-tooltip-for={'id' + i + j} children={position}/>
                                <Tooltip id={'id' + i + j} position={position} {...sample.props}/>
                            </div>
                        )}
                    </div>
                )}
                <div>
                    <h4>Auto position</h4>
                    {['top', 'bottom', 'left', 'right'].map(position =>
                        <div key={position} className="anchorWrap">
                            <DraggableTip position={position}/>
                        </div>
                    )}
                </div>
                <div>
                    <h4>Tooltip in Modal</h4>
                    <ModalWrap>
                        <div className="modalContent">
                            <Button data-tooltip-for="tooltip-in-modal">Show tip</Button>
                            <Tooltip
                                id="tooltip-in-modal"
                                showTrigger="click"
                                hideTrigger="click"
                                children="tooltip"
                            />
                        </div>
                    </ModalWrap>
                </div>
            </div>
        );
    }
}
