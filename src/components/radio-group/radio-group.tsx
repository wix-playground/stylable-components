import {action, computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {RadioButton} from './radio-button';
import styles from './radio-group.st.css';

export interface RadioGroupDataSchemaProps {
    disabled?: boolean;
    readOnly?: boolean;
    value: string;
    labelText?: string;
}

export interface RadioGroupProps extends FormInputProps<string>, properties.Props {
    children?: any;
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

    private initCheckedArray(dataArray: any[], isChildren: boolean = false) {
        let noCheckedRadioButton = true;
        for (let button of dataArray) {
            if (typeof button === 'object' && isChildren) {
                button = button.props;
            }

            const isChecked: boolean = !!this.props.value && this.props.value === button.value;
            this.checkedArray.push(
                observable({checked: noCheckedRadioButton && isChecked})
            );
            if (isChecked) {
                noCheckedRadioButton = false;
            }
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
                className="radioGroupChild"
                tabIndex={this.getChildTabIndex(index, this.isGroupChecked)}
            >
                {props.labelText ? <label className="label">{props.labelText}</label> : null}
            </RadioButton>
        ));
    }

    private createChildren(dataArray: React.ReactNode): React.ReactNode[] {
        return React.Children.map(dataArray, (child, index) => {
            if (child && typeof child === 'object') {
                if (child.type === RadioButton) {
                    return (
                        <RadioButton
                            key={index}
                            value={child.props.value}
                            data-automation-id={'RADIO_BUTTON_' + index}
                            checked={this.checkedArray[index].checked}
                            onChange={this.childrenOnClick(index)}
                            disabled={this.props.disabled || child.props.disabled}
                            readOnly={this.props.readOnly || child.props.readOnly}
                            name={this.name}
                            className="radioGroupChild"
                            tabIndex={this.getChildTabIndex(index, this.isGroupChecked)}
                            children={child.props.children}
                        />
                    );
                } else {
                    return (
                        React.cloneElement(child,
                            {
                                key: index,
                                checked: this.checkedArray[index].checked,
                                onChange: action(this.childrenOnClick(index)),
                                className: 'radioGroupChild',
                                tabIndex: this.getChildTabIndex(index, this.isGroupChecked)
                            },
                            child.props.children
                        )
                    );
                }
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
