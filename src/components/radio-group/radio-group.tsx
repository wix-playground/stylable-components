import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {RadioButton, RadioButtonProps, RadioChangeEvent} from './radio-button';
import styles from './radio-group.st.css';

export interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: any;
    dataSource?: RadioButtonProps[];
    onChange?: (e: RadioChangeEvent) => void;
    location?: 'right' | 'left';
}

let counter = 0;

export interface RadioState {
    checked: boolean;
}

@SBComponent(styles) @observer
export class RadioGroup extends React.Component<RadioGroupProps, {}> {
    public static defaultProps = {
        dataSource: [],
        location: 'right',
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

        const rootProps = root(this.props, {
            'className': 'root',
            'data-automation-id': 'RADIO_GROUP'
        });

        return (
            <div {...rootProps} role="radiogroup">
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
            this.checkedArray.push(
                observable({checked: noCheckedRadioButton ? button.checked : false})
            );
            if (button.checked) {
                noCheckedRadioButton = false;
            }
        }
    }

    private childrenOnClick(index: number) {
        return (e: RadioChangeEvent) => {
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
        const isGroupChecked: boolean = this.isGroupChecked();

        return this.props.dataSource!.map((props, index) => (
            <RadioButton
                key={index}
                value={props.value}
                data-automation-id={'RADIO_BUTTON_' + index}
                checked={this.checkedArray[index].checked}
                onChange={this.childrenOnClick(index)}
                disabled={this.props.disabled || props.disabled}
                location={this.props.location}
                name={this.name}
                className="radioGroupChild"
                tabIndex={this.getChildTabIndex(index, isGroupChecked)}
            />
        ));
    }

    private createChildren(dataArray: React.ReactNode[]): React.ReactNode[] {
        const isGroupChecked: boolean = this.isGroupChecked();

        return dataArray.map((data, index) => {
            if (data && typeof data === 'object') {
                const element = data as React.ReactElement<any>;
                if (element.type === RadioButton) {
                    return (
                        <RadioButton
                            key={index}
                            value={element.props.value}
                            data-automation-id={'RADIO_BUTTON_' + index}
                            checked={this.checkedArray[index].checked}
                            onChange={this.childrenOnClick(index)}
                            disabled={this.props.disabled || element.props.disabled}
                            location={this.props.location}
                            name={this.name}
                            className="radioGroupChild"
                            tabIndex={this.getChildTabIndex(index, isGroupChecked)}
                        />
                    );
                } else {
                    return (
                        React.cloneElement(element,
                            {
                                key: index,
                                checked: this.checkedArray[index].checked,
                                onChange: action(this.childrenOnClick(index)),
                                className: 'radioGroupChild',
                                tabIndex: this.getChildTabIndex(index, isGroupChecked)
                            }
                        )
                    );
                }
            } else {
                return data;
            }
        });
    }

    private isGroupChecked = (): boolean => {
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
