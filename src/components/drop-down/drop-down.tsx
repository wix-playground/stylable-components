import * as React from 'react';
import { SBComponent, SBStateless } from 'stylable-react-component/dist/stylable-react';
import { CaretDown } from './drop-down-icons';
import { root } from 'wix-react-tools';
import style from './drop-down.st.css';

export const dropDownDefaultText = 'Default Text';

export interface DropDownLabelProps {
    selectedItem: DropDownItem | undefined;
    onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

export const DropDownInput: React.SFC<DropDownLabelProps> = SBStateless(props => {
  return (
      <div data-automation-id="DROP_DOWN_INPUT" onClick={props.onClick} className="drop-down-input">
          <span className="label">{props.selectedItem ? props.selectedItem.label : dropDownDefaultText}</span>
          <CaretDown className="caret" />
      </div>
  );
}, style);

export interface DropDownItem {
    label: string;
}

export interface DropDownProps extends Partial<HTMLDivElement> {
    selectedItem: DropDownItem | undefined;
    onLabelClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

@SBComponent(style)
export class DropDown extends React.Component<DropDownProps, {}> {
    public render() {
        const rootProps = root(this.props, { className: 'drop-down' });

        return (
            <div data-automation-id="DROP_DOWN" className={rootProps.className}>
                <DropDownInput selectedItem={this.props.selectedItem} onClick={this.props.onLabelClick} />
            </div>
        );
    }
}
