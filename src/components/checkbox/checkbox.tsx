import React = require('react');

interface CheckBoxProps {
    text?: string;
    value?: boolean;
    boxIcon?: string;
    tickIcon?: string;
    onChange?: (value: boolean) => any;

}

export const CheckBox: React.SFC<CheckBoxProps> = (props) => {

    const handleClick = (event: React.SyntheticEvent<HTMLElement>): void => {
        props.onChange && props.onChange(!props.value)
    };

    return (
        <div data-automation-id="CHECKBOX_ROOT"
             onClick={(event) => handleClick(event)}>
            <img data-automation-id="CHECKBOX_BOX"
                 src={props.boxIcon}
                 style={{width: '1em', height: '1em'}}/>
            <img data-automation-id="CHECKBOX_TICKMARK"
                 src={props.tickIcon}
                 style={{
                     width: '1em',
                     height: '1em',
                     visibility: props.value ? 'visible' : 'hidden',
                     position: 'relative',
                     marginLeft: '-1em'
                 }}/>
            <span data-automation-id="CHECKBOX_LABEL">{props.text || ''}</span>
        </div>
    )
};


CheckBox.defaultProps = {
    text: '',
    value: false,
    boxIcon: '/src/components/checkbox/uncheckedCheckbox.svg',
    tickIcon: '/src/components/checkbox/tickMark.svg',
    onChange: ((_: boolean) => {
    })
};
