import React = require('react');
const style = require('./checkbox.css');

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

        {
            props.boxIcon ||
            <DefaultCheckBoxSVG className={ style.boxIconDefault + ' ' + (props.value && style.boxIconChecked) }/>
        }

        {
            props.value &&
            (props.tickIcon || DefaultTickMarkSVG({className: style.tickIcon}))
        }

        <span data-automation-id="CHECKBOX_LABEL" style={{marginLeft: '5px', verticalAlign:'top'}}>{props.text || ''}</span>
        {/*<input type="checkbox"/>*/}
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


const DefaultCheckBoxSVG: React.SFC<any> = (props) => {
    return (
        <svg className={props.className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" >
            <path fill="none" stroke="#D1D1D1" d="M.5.5h15v15H.5z"/>
        </svg>
    )
};

const DefaultTickMarkSVG: React.SFC<any> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={props.className}>
            <path stroke="#FFF" strokeLinecap="square" strokeWidth="1.5" d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
        </svg>
    )
};
