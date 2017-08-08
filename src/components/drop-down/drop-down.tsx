import * as React from 'react';

export interface DropDownLabelProps {
    label: string;
    onClick?: React.EventHandler<any>;
}

export const DropDownLabel: React.SFC<DropDownLabelProps> = props => {
  return (
      <div data-automation-id="DROP_DOWN_LABEL" onClick={props.onClick}>{props.label}</div>
  );
};

export interface DropDownItem {
    label: string;
}

export interface DropDownProps {
    selectedItem: DropDownItem;
    onLabelClick?: React.EventHandler<any>;
}

export class DropDown extends React.Component<DropDownProps, {}> {
    public render() {
        return (
            <div data-automation-id="DROP_DOWN">
                <DropDownLabel label={this.props.selectedItem.label} onClick={this.props.onLabelClick} />
            </div>
        );
    }
}
