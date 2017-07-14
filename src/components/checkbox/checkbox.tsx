import React = require('react');

export interface CheckBoxProps {
    text?: string;
    value?: boolean;
    boxIcon?: string;
    tickIcon?: string;
    onChange?: (value: boolean) => any;
}

export const CheckBox: React.SFC<CheckBoxProps> = (props) => (
    <div data-automation-id="CHECKBOX_ROOT"
         onClick={(event) => executeClickHandler(props.onChange!, !props.value)}
         style={{display:'inline'}}>
        <img data-automation-id="CHECKBOX_BOX"
             src={props.boxIcon}
             style={{width: '1em', height: '1em'}}/>
        <img data-automation-id="CHECKBOX_TICKMARK"
             src={props.tickIcon}
             style={{
                 width: '1em',
                 height: '1em',
                 display: props.value ? '' : 'none',
                 position: 'relative',
                 marginLeft: '-1em'
             }}/>
        <span data-automation-id="CHECKBOX_LABEL" style={{marginLeft: '5px', verticalAlign:'top'}}>{props.text || ''}</span>
    </div>
);

function executeClickHandler(handler: (value: boolean) => any, value: boolean) {
    handler(value);
}

CheckBox.defaultProps = {
    text: '',
    value: false,
    boxIcon: '/src/components/checkbox/uncheckedCheckbox.svg',
    tickIcon: '/src/components/checkbox/tickMark.svg',
    onChange: (value: boolean) => {}
};
