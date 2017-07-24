import React = require('react');
const style = require('./popup.st.css').default;

export interface PopupProps {
    anchor: React.ReactInstance;
}

export class Popup extends React.Component<PopupProps,{}> {
    render() {
        return (
            <div data-automation-id="POPUP" className={style.closed}>
                {this.props.children}
            </div>
        );
    }
}
