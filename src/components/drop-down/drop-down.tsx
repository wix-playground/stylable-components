import * as React from 'react';
import { SBComponent, SBStateless } from 'stylable-react-component/dist/stylable-react';
import { CaretDown } from './drop-down-icons';
import { root } from 'wix-react-tools';
import style from './drop-down.st.css';

export interface DropDownInputProps {
    selectedItem?: DropDownItem;
    onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

export const DropDownInput: React.SFC<DropDownInputProps> = SBStateless(props => {
  return (
      <div data-automation-id="DROP_DOWN_INPUT" onClick={props.onClick} className="drop-down-input">
          <span className="label">{props.selectedItem ? props.selectedItem.label : 'Default Text'}</span>
          <CaretDown className="caret" />
      </div>
  );
}, style);

export interface DropDownItem {
    label: string;
}

export interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
    selectedItem?: DropDownItem;
    onInputClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

@SBComponent(style)
export class DropDown extends React.Component<DropDownProps, {}> {
    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'DROP_DOWN',
            'className': 'drop-down'
        }, ['onLabelClick']);

        return (
            <div {...rootProps}>
                <DropDownInput selectedItem={this.props.selectedItem} onClick={this.props.onInputClick} />
            </div>
        );
    }
}
