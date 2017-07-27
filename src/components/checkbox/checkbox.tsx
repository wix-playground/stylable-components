import React = require('react');

const style = require('./checkbox.st.css').default;

export interface CheckBoxProps {
    value: boolean;
    boxIcon: React.SFC<CheckBoxIconProps>;
    tickIcon: React.SFC<CheckBoxIconProps>;
    indeterminateIcon: React.SFC<CheckBoxIconProps>;
    onChange: (value: boolean) => any;
    children: any;
    disabled: boolean;
    readonly: boolean;
    indeterminate: boolean;
}

export interface CheckBoxIconProps {
    value?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}

export const CheckBox: React.SFC<Partial<CheckBoxProps>> = (props) => (
    <div data-automation-id="CHECKBOX_ROOT"
         onClick={(event) => executeClickHandler(props.onChange!, !props.value, props.disabled!, props.readonly!, props.indeterminate!)}
         className={style.root}>

        { props.boxIcon!({value: props.value , indeterminate: props.indeterminate, disabled: props.disabled})}
        { props.indeterminate ?
            props.indeterminateIcon!({value: props.value, disabled: props.disabled }) :
            props.value && props.tickIcon!({value: props.value, disabled: props.disabled})
        }

        {props.children}

        <input data-automation-id="NATIVE_CHECKBOX"
               type="checkbox"
               className={style.nativeCheckbox}
               checked={props.value}
               onChange={()=>{}}
               disabled={props.disabled}/>
    </div>
);

function executeClickHandler(handler: (value: boolean) => any, value: boolean, isDisabled: boolean, isReadOnly: boolean, isIndeterminate: boolean): void {
    !isDisabled && !isReadOnly && ( isIndeterminate ? handler(true) : handler(value) );
}

const DefaultCheckBoxSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={
                style.boxIconDefault
                + ' ' + (props.disabled ? style.boxIconDisabled : (props.value || props.indeterminate) && style.boxIconChecked)
            }
             data-automation-id="CHECKBOX_BOX"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M.5.5h15v15H.5z"/>
        </svg>
    )
};

const DefaultTickMarkSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.tickIcon  + ' ' + (props.disabled && style.tickIconDisabled)}
             data-automation-id="CHECKBOX_TICKMARK"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M5 8.685l2.496 1.664M8 10.685L11.748 6"/>
        </svg>
    )
};

const DefaultIndeterminateSVG: React.SFC<CheckBoxIconProps> = (props) => {
    return (
        <svg className={style.indeterminateIcon + ' ' + (props.disabled && style.indeterminateIconDisabled)}
             data-automation-id="CHECKBOX_INDETERMINATE"
             xmlns="http://www.w3.org/2000/svg" width="15" height="15">
            <line x1="4" y1="8"  x2="12" y2="8" />
        </svg>
    )
};

CheckBox.defaultProps = {
    value: false,
    boxIcon: DefaultCheckBoxSVG,
    tickIcon: DefaultTickMarkSVG,
    indeterminateIcon: DefaultIndeterminateSVG,
    onChange: (value: boolean) => {},
    disabled: false,
    readonly: false,
    indeterminate: false
};
