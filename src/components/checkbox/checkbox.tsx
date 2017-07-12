import React = require('react');

interface CheckBoxProps {
    text?: string;
    value?: boolean;
    boxIcon?: string;
    tickIcon?: string;
    onChange?: (value: boolean) => any;
}

export const CheckBox: React.SFC<CheckBoxProps> = (props) => (
    <div data-automation-id="CHECKBOX_ROOT"
         onClick={(event) => executeClickHandler(props.onChange!, !props.value)}>
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
);

function executeClickHandler(handler: (value: boolean) => any, value: boolean) {
    handler && handler(value);
}

CheckBox.defaultProps = {
    text: '',
    value: false,
    boxIcon: '/src/components/checkbox/uncheckedCheckbox.svg',
    tickIcon: '/src/components/checkbox/tickMark.svg',
};
