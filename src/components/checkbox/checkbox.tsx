import React = require('react');

const style = require('./checkbox.st.css').default;

export interface CheckBoxProps {
    value: boolean;
    boxIcon: React.SFC<CheckBoxIconProps>;
    tickIcon: React.SFC<CheckBoxIconProps>;
    onChange: (value: boolean) => any;
    children: any;
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

        {props.children}

        <input data-automation-id="NATIVE_CHECKBOX"
               type="checkbox"
               className={style.nativeCheckbox}
               checked={props.value}
               onChange={()=>{}}/>
    </div>
);

function executeClickHandler(handler: (value: boolean) => any, value: boolean) {
    handler(value);
}

const DefaultCheckBoxSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.boxIconDefault + ' ' + (props.value && style.boxIconChecked)}
             data-automation-id="CHECKBOX_BOX"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M.5.5h15v15H.5z"/>
        </svg>
    )
};

const DefaultTickMarkSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.tickIcon}
             data-automation-id="CHECKBOX_TICKMARK"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
        </svg>
    )
};

CheckBox.defaultProps = {
    value: false,
    boxIcon: DefaultCheckBoxSVG,
    tickIcon: DefaultTickMarkSVG,
    onChange: (value: boolean) => {
    }
};
