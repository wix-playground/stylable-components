import React = require('react');

const style = require('./checkbox.st.css').default;

export interface CheckBoxProps {
    text: string;
    value: boolean;
    boxIcon: React.SFC<CheckBoxIconProps>;
    tickIcon: React.SFC<CheckBoxIconProps>;
    onChange: (value: boolean) => any;
}

export interface CheckBoxIconProps {
    value?: boolean;
}

export const CheckBox: React.SFC<Partial<CheckBoxProps>> = (props) => (
    <div data-automation-id="CHECKBOX_ROOT"
         onClick={(event) => executeClickHandler(props.onChange!, !props.value)}
         className={style.root}>

        {props.boxIcon!({value: props.value})}
        {props.value && props.tickIcon!({value: props.value})}

        <span data-automation-id="CHECKBOX_LABEL"
              className={style.label}>{props.text || ''}</span>

        <input data-automation-id="NATIVE_CHECKBOX"
               type="checkbox"
               className={style.nativeCheckbox}
               id={props.text}
               checked={props.value}/>
    </div>
);

function executeClickHandler(handler: (value: boolean) => any, value: boolean) {
    handler(value);
}

const DefaultCheckBoxSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.boxIconDefault + ' ' + (props.value && style.boxIconChecked)}
             viewBox="0 0 16 16"
             data-automation-id="CHECKBOX_BOX"
             xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#D1D1D1" d="M.5.5h15v15H.5z"/>
        </svg>
    )
};

const DefaultTickMarkSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.tickIcon}
             data-automation-id="CHECKBOX_TICKMARK"
             xmlns="http://www.w3.org/2000/svg">
            <path stroke="#FFF" strokeLinecap="square" strokeWidth="1.5" d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
        </svg>
    )
};

CheckBox.defaultProps = {
    text: '',
    value: false,
    boxIcon: DefaultCheckBoxSVG,
    tickIcon: DefaultTickMarkSVG,
    onChange: (value: boolean) => {
    }
};
