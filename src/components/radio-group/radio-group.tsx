import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {root} from 'wix-react-tools';
import {RadioButton, RadioButtonProps} from './radio-button';

export interface RadioGroupProps {
    children?: any;
    dataSource?: RadioButtonProps[];
    onChange?: (e: string) => void;
    disabled?: boolean;
    location?: 'right' | 'left';
    name?: string;
}

let counter = 0;

export interface RadioState {
    checked: boolean;
}

@observer
export class RadioGroup extends React.Component<RadioGroupProps, {}> {
    public static defaultProps = {
        dataSource: [],
        location: 'right'
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

        const rootProps = root(this.props, {
            'className': 'root',
            'data-automation-id': 'RADIO_GROUP'
        });

        return (
            <div {...rootProps}>
                {childArray}
            </div>
        );
    }

    private initCheckedArray(dataArray: any[], isChildren: boolean = false) {
        let noCheckedRadioButton = true;
        for (let button of dataArray) {
            if (isChildren) {
                button = button.props;
            }
            this.checkedArray.push(
                observable({checked: noCheckedRadioButton ? button.checked : false})
            );
            if (button.checked) {
                noCheckedRadioButton = false;
            }
        }
    }

    private childrenOnClick(index: number) {
        return (value: string) => {
            this.checkedArray.forEach(data => {
                data.checked = false;
            });
            this.checkedArray[index].checked = true;
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        };
    }

    private createChildrenFromDataSource(): React.ReactNode[] {
        const childArray: React.ReactNode[] = [];
        if (Array.isArray(this.props.dataSource)) {
            this.props.dataSource!.forEach((data, index) => {
                const props: RadioButtonProps = {
                    key: index,
                    value: data.value,
                    ['data-automation-id']: 'RADIO_BUTTON_' + index,
                    checked: this.checkedArray[index].checked,
                    onClick: this.childrenOnClick(index),
                    disabled: this.props.disabled || data.disabled,
                    location: this.props.location,
                    name: this.name
                };
                childArray.push(React.createElement(RadioButton, props));
            });
        }
        return childArray;
    }

    private createChildren(dataArray: any): React.ReactNode[] {
        const childArray: React.ReactNode[] = [];
        for (let index = 0; index < dataArray.length; index++) {
            const data = dataArray[index];

            if (data.type === RadioButton) {
                const props: RadioButtonProps = {
                    key: index,
                    value: data.props.value,
                    ['data-automation-id']: 'RADIO_BUTTON_' + index,
                    checked: this.checkedArray[index].checked,
                    onClick: this.childrenOnClick(index),
                    disabled: this.props.disabled || data.props.disabled,
                    location: this.props.location,
                    name: this.name};

                childArray.push(React.cloneElement(data as React.ReactElement<any>, props));
            } else {
                childArray.push(
                    React.cloneElement(
                        data as React.ReactElement<any>,
                        {
                            key: index,
                            checked: this.checkedArray[index].checked,
                            onClick: action(this.childrenOnClick(index))
                        }
                    )
                );
            }
        }
        return childArray;
    }
}
