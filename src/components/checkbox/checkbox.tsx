import React = require('react');

interface CheckBoxProps {
    text?: string;
    value?: boolean;
    boxIcon?: string;
    tickIcon?: string;
    onChange?: (value: boolean ) => any;

}

export class CheckBox extends React.Component<CheckBoxProps, {}> {

    static defaultProps: CheckBoxProps;

    handleClick(event: React.SyntheticEvent<HTMLElement>): void {
        this.props.onChange && this.props.onChange(!this.props.value)
    }

    render() {
        return (
            <div data-automation-id="CHECKBOX_ROOT"
                 onClick={(event) => this.handleClick(event)}>
                <img data-automation-id="CHECKBOX_BOX"
                     src={this.props.boxIcon}
                     style={{width:'1em', height:'1em'}}/>
                <img data-automation-id="CHECKBOX_TICKMARK"
                     src={this.props.tickIcon}
                     style={{
                         width:'1em',
                         height:'1em',
                         visibility: this.props.value ? 'visible' : 'hidden',
                         position: 'relative',
                         marginLeft: '-1em'
                     }}/>
                <span data-automation-id="CHECKBOX_LABEL">{this.props.text || ''}</span>
            </div>
        )
    }
}

CheckBox.defaultProps = {
    text: '',
    value: false,
    boxIcon: '/src/components/checkbox/uncheckedCheckbox.svg',
    tickIcon: '/src/components/checkbox/tickMark.svg',
    onChange: ((_: boolean) => {})
};
