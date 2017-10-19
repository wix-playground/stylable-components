import {action, computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {StylableProps} from '../../types/props';
import {RadioButton} from './radio-button';
import styles from './radio-group.st.css';

export interface RadioGroupDataSchemaProps {
    disabled?: boolean;
    readOnly?: boolean;
    value: string;
    labelText?: string;
}

export interface RadioGroupProps extends FormInputProps<string>, StylableProps {
    children?: React.ReactNode;
    dataSource?: RadioGroupDataSchemaProps[];
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    tabIndex?: number;
    className?: string;
}

let counter = 0;

export interface RadioState {
    checked: boolean;
}

@stylable(styles)
@properties
@observer
export class RadioGroup extends React.Component<RadioGroupProps> {
    public static defaultProps: Partial<RadioGroupProps> = {
        dataSource: [],
        tabIndex: 0
    };

    private name: string;
    private checkedArray: RadioState[];

    constructor(props: RadioGroupProps) {
        super(props);
        this.checkedArray = [];
        if (this.props.children) {
            this.initCheckedArray(this.props.children, true);
        } else if (this.props.dataSource) {
            this.initCheckedArray(this.props.dataSource, false);
        }
        this.name = this.props.name ? this.props.name : 'radio_group_' + counter++;
    }

    public render() {
        let childArray: React.ReactNode[] = [];

        if (this.props.children) {
            if (React.isValidElement(this.props.children)) {
                childArray.push(this.props.children);
            } else {
                childArray = this.createChildren(this.props.children);
            }
        } else if (this.props.dataSource!.length > 0) {
            childArray = this.createChildrenFromDataSource();
        }

        return (
            <div data-automation-id="RADIO_GROUP" role="radiogroup">
                {childArray}
            </div>
        );
    }

    private initCheckedArray(dataArray: React.ReactNode | RadioGroupDataSchemaProps[], isChildren: boolean = false) {
        let noCheckedRadioButton = true;

        const handleChecked = (value: string | null) => {
            const isChecked: boolean = !!this.props.value && this.props.value === value;
            this.checkedArray.push(
                observable({checked: noCheckedRadioButton && isChecked})
            );
            if (isChecked) {
                noCheckedRadioButton = false;
            }
        };

        if (isReactNode(dataArray)) {
            React.Children.map(dataArray, child => {
                handleChecked(typeof child === 'object' ? child.props.value : null);
            });
        } else {
            (dataArray as RadioGroupDataSchemaProps[]).forEach(obj => { handleChecked(obj.value); });
        }

        function isReactNode(arr: React.ReactNode | RadioGroupDataSchemaProps[]): arr is React.ReactNode {
            return isChildren;
        }
    }

    private childrenOnClick(index: number) {
        return (e: ChangeEvent<string>) => {
            this.checkedArray.forEach(data => {
                data.checked = false;
            });
            this.checkedArray[index].checked = true;
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        };
    }

    private createChildrenFromDataSource(): Array<React.ReactElement<RadioButton>> {
        return this.props.dataSource!.map((props, index) => (
            <RadioButton
                key={index}
                value={props.value}
                data-automation-id={'RADIO_BUTTON_' + index}
                checked={this.checkedArray[index].checked}
                onChange={this.childrenOnClick(index)}
                disabled={this.props.disabled || props.disabled}
                readOnly={this.props.readOnly || props.readOnly}
                name={this.name}
                className="option"
                tabIndex={this.getChildTabIndex(index, this.isGroupChecked)}
            >
                {props.labelText ? <label className="label">{props.labelText}</label> : null}
            </RadioButton>
        ));
    }

    private createChildren(dataArray: React.ReactNode): React.ReactNode[] {
        return React.Children.map(dataArray, (child, index) => {
            if (child && typeof child === 'object') {

                const extraProps = child.type === RadioButton ?
                    {
                        ['data-automation-id']: 'RADIO_BUTTON_' + index,
                        name: this.name,
                        checked: this.checkedArray[index].checked,
                        onChange: action(this.childrenOnClick(index)),
                        disabled: this.props.disabled || child.props.disabled,
                        readOnly: this.props.readOnly || child.props.readOnly,
                        className: child.props.className + ' ' + styles.option,
                        tabIndex: this.getChildTabIndex(index, this.isGroupChecked)
                    } : {};

                const childProps = {
                    ...child.props,
                    key: index,
                    ...extraProps
                };

                return React.cloneElement(child, childProps, child.props.children);

            } else {
                return child;
            }
        });
    }

    @computed
    get isGroupChecked(): boolean {
        return !!this.checkedArray.find(elm => elm.checked);
    }

    private getChildTabIndex = (index: number, isGroupChecked: boolean): number | undefined => {
        if (isGroupChecked) {
            return this.checkedArray[index].checked ? this.props.tabIndex : -1;
        } else {
            return index === 0 ? this.props.tabIndex : -1;
        }
    }
}
