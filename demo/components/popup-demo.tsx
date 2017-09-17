import React = require('react');
import {stylable} from 'wix-react-tools';
import {Popup, PopupHorizontalPosition, PopupPositionPoint, PopupVerticalPosition, RadioGroup} from '../../src/';
import {ChangeEvent} from '../../src/types/events';
import styles from './popup-demo.st.css';

export interface DemoState {
    div: HTMLElement | null;
    isOpen: boolean;
    pVertical: PopupVerticalPosition;
    pHorizontal: PopupHorizontalPosition;
    aVertical: PopupVerticalPosition;
    aHorizontal: PopupHorizontalPosition;
}

@stylable(styles)
export class PopupDemo extends React.Component<{}, DemoState> {
    public state = {
        div: null,
        isOpen: false,
        pVertical: 'top' as PopupVerticalPosition,
        pHorizontal: 'left' as PopupHorizontalPosition,
        aVertical: 'bottom' as PopupVerticalPosition,
        aHorizontal: 'left' as PopupHorizontalPosition
    };

    private popup: Popup | null;

    public render() {
        const popupPos: PopupPositionPoint = {
            vertical: this.state.pVertical, horizontal: this.state.pHorizontal
        };
        const anchorPos: PopupPositionPoint = {
            vertical: this.state.aVertical, horizontal: this.state.aHorizontal
        };

        const vPos = [{value: 'top'}, {value: 'center'}, {value: 'bottom'}];
        const hPos = [{value: 'left'}, {value: 'center'}, {value: 'right'}];
        return (
            <div>
                <button
                    ref={this.updateState}
                    onClick={this.onClick}
                    className="anchor"
                    data-automation-id="POPUP_DEMO_BTN"
                >
                    {this.state.isOpen ? 'Hide Popup' : 'Show Popup'}
                </button>
                <Popup
                    anchor={this.state.div}
                    popupPosition={popupPos}
                    anchorPosition={anchorPos}
                    open={this.state.isOpen}
                    ref={popup => this.popup = popup}
                >
                    <div style={{color: 'white', backgroundColor: 'black'}}>Hello!</div>
                </Popup>
                <div className="position">
                    <div className="category">
                        <h3>Popup position - vertical</h3>
                        <RadioGroup dataSource={vPos} className="radio" value="top" onChange={this.changePVertical}/>
                    </div>
                    <div className="category">
                        <h3>Popup position - horizontal</h3>
                        <RadioGroup className="radio" value="left" onChange={this.changePHorizontal} dataSource={hPos}/>
                    </div>
                    <div className="category">
                        <h3>Anchor position - vertical</h3>
                        <RadioGroup className="radio" value="bottom" onChange={this.changeAVertical} dataSource={vPos}/>
                    </div>
                    <div>
                        <h3>Anchor position - horizontal</h3>
                        <RadioGroup className="radio" value="left" onChange={this.changeAHorizontal} dataSource={hPos}/>
                    </div>
                </div>
            </div>
        );
    }

    public getPopup() {
        return this.popup;
    }

    private onClick = () => {
        this.setState({div: this.state.div, isOpen: !this.state.isOpen});
    }

    private updateState = (ref: HTMLElement | null) => {
        this.setState({div: ref, isOpen: this.state.isOpen});
    }

    private changePVertical = (e: ChangeEvent<PopupVerticalPosition>) => {
        this.setState({pVertical: e.value});
    }

    private changePHorizontal = (e: ChangeEvent<PopupHorizontalPosition>) => {
        this.setState({pHorizontal: e.value});
    }

    private changeAVertical = (e: ChangeEvent<PopupVerticalPosition>) => {
        this.setState({aVertical: e.value});
    }

    private changeAHorizontal = (e: ChangeEvent<PopupHorizontalPosition>) => {
        this.setState({aHorizontal: e.value});
    }

}
