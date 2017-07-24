import React = require('react');
const style = require('./popup.st.css').default;

export interface PopupProps {
    anchor: any;
    open?: boolean;
}

export class Popup extends React.Component<Partial<PopupProps>,{}> {

    render() {
        return (
            <div data-automation-id="POPUP" className={!this.props.open ? style.closed : ''}>
                {this.props.children}
            </div>
        );
    }
}
