import * as React from 'react';
import { SBComponent, SBStateless } from 'stylable-react-component/dist/stylable-react';
import { CaretDown } from './drop-down-icons';
import style from './drop-down.st.css';

export interface DropDownLabelProps {
    selectedItem: DropDownItem | undefined;
    onClick?: React.EventHandler<any>;
}

export const DropDownLabel: React.SFC<DropDownLabelProps> = SBStateless(props => {
  return (
      <div data-automation-id="DROP_DOWN_LABEL" onClick={props.onClick} className="drop-down-label">
          <span className="label">{props.selectedItem ? props.selectedItem.label : 'Default text'}</span>
          <CaretDown className="caret" />
      </div>
  );
}, style);

export interface DropDownItem {
    label: string;
}

export interface DropDownProps {
    selectedItem: DropDownItem | undefined;
    onLabelClick?: React.EventHandler<any>;
}

@SBComponent(style)
export class DropDown extends React.Component<DropDownProps, {}> {
    public render() {
        return (
            <div data-automation-id="DROP_DOWN" className="drop-down">
                <DropDownLabel selectedItem={this.props.selectedItem} onClick={this.props.onLabelClick} />
            </div>
        );
    }
}
